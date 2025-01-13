import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: Instagram,
    href: 'https://instagram.com/mathieuexpress',
    label: 'Follow us on Instagram'
  },
  {
    icon: TikTokIcon,
    href: 'https://tiktok.com/@mathieuexpress',
    label: 'Follow us on TikTok'
  },
  {
    icon: XIcon,
    href: 'https://x.com/mathieuexpress',
    label: 'Follow us on X'
  },
  {
    icon: Facebook,
    href: 'https://facebook.com/mathieuexpress',
    label: 'Like us on Facebook'
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@mathieuexpress',
    label: 'Subscribe on YouTube'
  }
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">Connect With Us</h3>
      <div className="flex space-x-4">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition-colors"
            aria-label={label}
          >
            <Icon className="w-6 h-6" />
          </a>
        ))}
      </div>
      <a
        href="/join"
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
      >
        Join Us
      </a>
    </div>
  );
}