const express = require('express');
const axios = require('axios');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const API_BASE_URL = 'https://socialbu.com/api/v1';
const userCredentials = {
    email: 'balpreet.code@gmail.com',
    password: 'Password@12345'
};

async function login() {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/get_token`, userCredentials);
        return response.data.authToken;
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        return null;
    }
}

async function fetchConnectedAccounts(authToken) {
    try {
        const response = await axios.get(`${API_BASE_URL}/accounts`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching accounts:', error.response ? error.response.data : error.message);
        return null;
    }
}

async function uploadMedia(authToken, filePath, fileName, mimeType) {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload_media`, {
            name: fileName,
            mime_type: mimeType
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });

        const { signed_url, key, secure_key } = response.data;

        if (!signed_url) {
            console.error('Signed URL is missing in the response.');
            return null;
        }

        const file = fs.createReadStream(filePath);
        const size = fs.statSync(filePath).size;

        await axios.put(signed_url, file, {
            headers: {
                'Content-Type': mimeType,
                'x-amz-acl': 'private',
                'Content-Length': size
            }
        });

        return { key, secure_key, url: response.data.url };
    } catch (error) {
        console.error('Error in uploadMedia:', error.response ? error.response.data : error.message);
        return null;
    }
}

async function postMediaToAccount(authToken, uploadToken, content, accountIds, publishAt, options = {}) {
    try {
        const postData = {
            accounts: accountIds,
            publish_at: publishAt,
            content: content,
            existing_attachments: [{ upload_token: uploadToken }],
            options: options
        };

        const response = await axios.post(`${API_BASE_URL}/posts`, postData, {
            headers: { Authorization: `Bearer ${authToken}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error posting to account:', error.response ? error.response.data : error.message);
        return null;
    }
}

app.get('/api/accounts', async (req, res) => {
    const authToken = await login();
    if (!authToken) {
        return res.status(500).json({ error: 'Login failed' });
    }

    const accounts = await fetchConnectedAccounts(authToken);
    if (!accounts) {
        return res.status(500).json({ error: 'Failed to fetch connected accounts' });
    }

    res.json(accounts);
});

app.post('/api/post-media', upload.single('media'), async (req, res) => {
    const { content, accountIds, publishAt, options } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!accountIds) {
        return res.status(400).json({ error: 'Account IDs are required' });
    }

    let parsedAccountIds;
    let parsedOptions;

    try {
        parsedAccountIds = JSON.parse(accountIds);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON format for accountIds' });
    }

    try {
        parsedOptions = options ? JSON.parse(options) : {};
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON format for options' });
    }

    const authToken = await login();
    if (!authToken) {
        return res.status(500).json({ error: 'Login failed' });
    }

    const uploadResult = await uploadMedia(authToken, file.path, file.originalname, file.mimetype);
    if (!uploadResult) {
        return res.status(500).json({ error: 'Failed to upload media' });
    }

    const result = await postMediaToAccount(
        authToken, 
        uploadResult.secure_key, 
        content, 
        parsedAccountIds, 
        publishAt,
        parsedOptions
    );

    fs.unlinkSync(file.path);

    if (result) {
        res.json({ message: 'Media upload and posting process completed', result });
    } else {
        res.status(500).json({ error: 'Failed to post media' });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});