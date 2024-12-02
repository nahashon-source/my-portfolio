import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub',
      href: 'https://github.com/nahashon',
      icon: <Github size={20} />
    },
    { 
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/nahashon',
      icon: <Linkedin size={20} />
    },
    { 
      name: 'Twitter',
      href: 'https://twitter.com/nahashon',
      icon: <Twitter size={20} />
    },
    { 
      name: 'Email',
      href: 'mailto:contact@nahashon.dev',
      icon: <Mail size={20} />
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-4">NM</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Full-stack developer passionate about creating impactful web solutions
              and contributing to open-source projects.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="not-italic">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Nairobi, Kenya</p>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <a href="tel:+254700000000">+254 (783) 384-516</a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <a href="mailto:contact@nahashon.dev">contact@nashonmwendwa04@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {currentYear} Nahashon Mwendwa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;