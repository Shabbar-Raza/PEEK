import React from 'react';
import { 
  Brain, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Shield,
  FileText,
  HelpCircle
} from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Analytics', href: '#dashboard' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API Docs', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#', icon: HelpCircle },
        { name: 'Contact Us', href: '#', icon: Mail },
        { name: 'System Status', href: '#' },
        { name: 'Training', href: '#' },
        { name: 'Community', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#', icon: Shield },
        { name: 'Terms of Service', href: '#', icon: FileText },
        { name: 'COPPA Compliance', href: '#' },
        { name: 'Data Security', href: '#' },
        { name: 'Cookie Policy', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Partners', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">TutorScope AI</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Transforming online tutoring with AI-powered analytics. Get deeper insights 
              into student progress, engagement, and learning outcomes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>support@tutorscope.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5 text-gray-300 hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{link.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Security & Compliance */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <div className="font-semibold">COPPA Compliant</div>
                <div className="text-sm text-gray-400">Child privacy protected</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <div className="font-semibold">SOC 2 Certified</div>
                <div className="text-sm text-gray-400">Enterprise security</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-purple-400" />
              <div>
                <div className="font-semibold">GDPR Ready</div>
                <div className="text-sm text-gray-400">Data protection compliant</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 TutorScope AI. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for educators</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}