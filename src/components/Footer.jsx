import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nahashon", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/nahashon", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/nahashon", icon: Twitter },
  { name: "Email", href: "mailto:nashonmwendwa04@gmail.com", icon: Mail },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 pt-14 pb-8">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Nahashon Mwendwa
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Full-stack developer focused on building scalable web applications
              and creating meaningful digital experiences.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.name} profile`}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact
            </h3>

            <address className="not-italic space-y-3 text-gray-600 dark:text-gray-300">
              <p>Nairobi, Kenya</p>

              <p>
                <a
                  href="tel:+254748495724"
                  className="hover:text-green-600 dark:hover:text-green-400 transition"
                >
                  +254 748 495 724
                </a>
              </p>

              <p className="break-all">
                <a
                  href="mailto:nashonmwendwa04@gmail.com"
                  className="hover:text-green-600 dark:hover:text-green-400 transition"
                >
                  nashonmwendwa04@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Nahashon Mwendwa. Built with React.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;