import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SocialSidebar from './components/SocialSidebar'; 

const API_BASE_URL = 'http://localhost:3000/api';

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounts`,{
        "items": [
          {}
        ],
        "currentPage": 0,
        "lastPage": 0,
        "nextPage": 0,
        "total": 0
      });
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setMessage('Failed to fetch accounts');
    }
  };

  const handleAccountToggle = (accountId) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (isImmediate) => {
    if (!file || selectedAccounts.length === 0) {
      setMessage('Please select a file and at least one account');
      return;
    }
  
    setIsLoading(true);
    setMessage('Uploading and posting...');
  
    const formData = new FormData();
    formData.append('media', file);
    formData.append('content', content);
    formData.append('accountIds', JSON.stringify(selectedAccounts));
  
    const localDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
    const publishAt = isImmediate
      ? new Date().toISOString().slice(0, 19).replace('T', ' ')
      : new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000)
          .toISOString().slice(0, 19).replace('T', ' ');  // here Converting to UTC
  
    formData.append('publishAt', publishAt);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/post-media`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Media posted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error posting media:', error);
      setMessage('Failed to post media');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <SocialSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200">
          <h1 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">SocialBu Media Poster</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Connected Accounts:</label>
              <div className="mt-1 space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {accounts.length > 0 ? (
                  accounts.map(account => (
                    <label key={account.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleAccountToggle(account.id)}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded"
                      />
                      <span className="text-gray-700">{account.name} ({account.type})</span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No connected accounts. Please add some accounts.</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full transition duration-300 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg"
              onClick={toggleSidebar} 
            >
              Add Socials
            </button>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-150 ease-in-out"
                rows="3"
                placeholder="Type your content here..."
              />
            </div>
            <div>
              <label htmlFor="media" className="block text-sm font-medium text-gray-700 mb-2">Upload Media:</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,video/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-2">Schedule Post (optional):</label>
              <div className="mt-1 flex space-x-2">
                <input
                  id="scheduleDate"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                />
                <input
                  id="scheduleTime"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
              >
                Post Immediately
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-md hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
              >
                Schedule Post
              </button>
            </div>
          </form>
          {message && (
            <div className={`mt-4 p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-center font-semibold">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

