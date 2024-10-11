import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGoogle,
  faMastodon,
  faTiktok,
  faPinterest,
  faYoutube,
  faReddit,
} from '@fortawesome/free-brands-svg-icons';

const SocialSidebar = ({ isOpen, toggleSidebar }) => {
  const socialMedia = [
    {
      name: 'Facebook (Pages)',
      icon: faFacebook,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6ImdwYUJDd1ZwQUxpVmgxREw1TGgyWkE9PSIsInZhbHVlIjoiUlltTTltSEhWTU1ZYmcrSldESDFIc2pOTHBQeVI2T3IyakZRWGNxRmMwYz0iLCJtYWMiOiJmNjU1NzkyN2YzN2YwZDNjNDNjNGFkMjJmOTdhZjlkNzY0NzNiN2M5ZTNiMTMxNDAxNWFmNjE2NjkwMjNhOTE4In0%3D',
    },
    {
      name: 'X/Twitter (Profiles)',
      icon: faTwitter,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6InUxZ3drRklRUnRkSE1yT3h3b05UdVE9PSIsInZhbHVlIjoid3FWa0ptXC9SYkdqZmtXNHJOYnR0M2MxK1BaXC9RaFZYeTkxMzl3ZEZZbVNBPSIsIm1hYyI6ImQ5NzQwN2IzY2I1MTMwYTg4M2RmMTFjNmU4NWQxMmU2YmQyMWY5N2E0YzcyNWQ0ZTQzNTJmMDI2MmFkMWViZmIifQ%3D%3D',
    },
    {
      name: 'Instagram (Business Accounts)',
      icon: faInstagram,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6Imx4clFRWlNsSFBLNnpLaFk2cHN1Y3c9PSIsInZhbHVlIjoiMVBzQ3Fma1E4UnF2V1lqSFJ5MVg2YW95a002QjNDQVNESmY1Z0U4WjZYTT0iLCJtYWMiOiIyNWNlNDVlODkwZmIwNzEyYjg5N2Y0NWJjYTA1ZTFjMWQ2MWEwMGI4ZDM4NmViMjlmNTkzMGE5NTEyOGVmYTE5In0%3D',
    },
    {
      name: 'LinkedIn (Profiles, Brands, Organizations)',
      icon: faLinkedin,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6InJBRnB4RkdHNG15U3FXdTVcL1JBTVwvUT09IiwidmFsdWUiOiJ6U2luYk82TEF2cEc1Um5rVTFcL2tON05iWlZwcnAwaVpPOHoxb3J6WGoxUT0iLCJtYWMiOiJhNDRlZWYzNGE1NDc2ZTA3OThmY2RmMzE0Zjk0ZWNjZDhhYzlkMDlhNDdiZDczOGJlYmQ3YTIxOTU4MGViYzRjIn0%3D',
    },
    {
      name: 'Google Business Profile (Locations)',
      icon: faGoogle,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6IjJTbEloVG9EdVE4ZUMrc08rZU5qeUE9PSIsInZhbHVlIjoiWVZaQ3ZPeWIrRmdsVHpzejdlRWVXNVI3S3dRUDI1bHNscUxERCt6Q1FhND0iLCJtYWMiOiJkMjFlMWQyMjA0ZTUwZjMzZTEwOGU1YjE0MzRlMWQ3YmZlNDg1ZTU4Mjc4YWFiNzhkOTMzNjcxOGZjZmI5YjYwIn0%3D',
    },
    {
      name: 'Mastodon (Profiles)',
      icon: faMastodon,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6Ik8rZ0JqQkp1SnNSRVwvYjFndzB6UjR3PT0iLCJ2YWx1ZSI6Ik82MitTNGxWVzJGalwvZU41b3I1SUYzVGszN3d5SVhEaXJPXC9QeFdUVytxND0iLCJtYWMiOiI2MWRhMjNmZmU5MmMxN2Y5MjZkNzZkNmMwOGMwMjNmYTA2NzBkZWQ4YjdjZmQ5YTE2MmU0OGFjYjA5NzAwNzNiIn0%3D',
    },
    {
      name: 'TikTok (Profiles)',
      icon: faTiktok,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6IkI2Z0RSVG8yVkk4ZnhyaDhBdDM2MWc9PSIsInZhbHVlIjoidXpzWWhxRW9PeFNETVlQNFwvVUFOVk1mYStra0RMZTA1WEhlMDJlcVE1TGs9IiwibWFjIjoiMDZmY2IzMTAyMTQ5ODdiM2M2ZTBlMjY3NjE3NzNhZjJhZDY1OTEzMDE0YmUxYmFhYTAwNDUxNjkyZmJjM2ZiNCJ9',
    },
    {
      name: 'Pinterest (Profiles)',
      icon: faPinterest,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6ImJ1NDJ6bnZncnZWWFZ2Um9kRXh5dWc9PSIsInZhbHVlIjoiU1poOVI1cTFxZkpZRERjbEU5N2IrSHFmN0QzSzN3a0haU24zOGRqSHlHQT0iLCJtYWMiOiI2OTVlMGEyZTFhZDZmMWI1MjgwZTVmZjc1NWNiMTgxOThlNDQyNGJjMjQzZWVmNDAwNDQ4MDc3ZjU2NjNmZjY4In0%3D',
    },
    {
      name: 'YouTube (Channels)',
      icon: faYoutube,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6ImpcL24zR2tqN2RPSG9pT284MzRMNDhRPT0iLCJ2YWx1ZSI6IlF6ZXBLNUlyNzV3RXlJMmpJNjJkdnBvaHNFYUJEa3FQTXQwMDliZzZEQUk9IiwibWFjIjoiMjI0ZmE3MTA2YmQ0YTQ4ZTA1MzZkMDdhZWUwYjhkZDU2OTBjNTJjYmE1OTc4ZjRlODQyMWE1MWI1YWViZTI5MyJ9',
    },
    {
      name: 'Reddit (Profiles, Subreddits)',
      icon: faReddit,
      link: 'https://socialbu.com/auth/accounts/connect?connect_token=eyJpdiI6InRFeHk5MEFScDBFXC9YRjM1VStKTHdBPT0iLCJ2YWx1ZSI6InpOeWdSbWIxcW54b0lOa09sR3BPR2FYQ3NHK2xkM3VOeWhLVWRIckMrbVk9IiwibWFjIjoiMmI3ZDkyZTE1MDE1YzdiODZiMjI2MGRkZWVmMTk3ZmRmMDY5ODI5YzMwNzM5YjI1YmM4YmZjZTM3Y2ViNjFjMiJ9',
    },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4 text-xl">
        &times;
      </button>
      <h2 className="text-center font-bold text-xl mt-5">Connect Social Accounts</h2>
      <ul className="mt-5">
        {socialMedia.map((media) => (
          <li key={media.name} className="flex items-center justify-between p-3 hover:bg-gray-200">
            <a href={media.link} className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={media.icon} className="text-2xl" />
              <span>{media.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialSidebar;
