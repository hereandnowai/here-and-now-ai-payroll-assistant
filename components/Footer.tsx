
import React from 'react';
import { BRAND_CONSTANTS } from '../constants';
import { LinkedInIcon, InstagramIcon, GithubIcon, XIcon, YoutubeIcon, BlogIcon } from './icons/SocialIcons';

export const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Blog', href: BRAND_CONSTANTS.brand.socialMedia.blog, icon: <BlogIcon className="w-5 h-5" /> },
    { name: 'LinkedIn', href: BRAND_CONSTANTS.brand.socialMedia.linkedin, icon: <LinkedInIcon className="w-5 h-5" /> },
    { name: 'Instagram', href: BRAND_CONSTANTS.brand.socialMedia.instagram, icon: <InstagramIcon className="w-5 h-5" /> },
    { name: 'GitHub', href: BRAND_CONSTANTS.brand.socialMedia.github, icon: <GithubIcon className="w-5 h-5" /> },
    { name: 'X', href: BRAND_CONSTANTS.brand.socialMedia.x, icon: <XIcon className="w-5 h-5" /> },
    { name: 'YouTube', href: BRAND_CONSTANTS.brand.socialMedia.youtube, icon: <YoutubeIcon className="w-5 h-5" /> },
  ];

  return (
    <footer 
      className="p-4 text-center"
      style={{ backgroundColor: BRAND_CONSTANTS.brand.colors.secondary, color: BRAND_CONSTANTS.brand.colors.primary }}
    >
      <p className="text-sm mb-2">{BRAND_CONSTANTS.brand.slogan}</p>
      <div className="flex justify-center space-x-4">
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="hover:opacity-75 transition-opacity"
            style={{ color: BRAND_CONSTANTS.brand.colors.primary }}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="text-xs mt-3">
        Developed by Adhithya J [ AI Products Engineering Team ]
      </p>
      <p className="text-xs mt-1">
        &copy; {new Date().getFullYear()} {BRAND_CONSTANTS.brand.longName}. All rights reserved.
      </p>
    </footer>
  );
};
