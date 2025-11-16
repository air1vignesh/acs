import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const location = useLocation();

  // Helper function to get features (matching your Services component)
  const getFeatures = (baseKey, count) => {
    return Array.from({ length: count }, (_, i) => t(`${baseKey}.${i + 1}`));
  };

  // Services data matching your Services component
  const services = [
    {
      id: 1,
      title: t('services.health.title'),
    },
    {
      id: 2,
      title: t('services.life.title'),
    },
    {
      id: 3,
      title: t('services.realestate.title'),
    },
    {
      id: 4,
      title: t('services.financial.title'),
    }
  ];

  const quickLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.education'), href: '/educationhub' },
    { name: t('nav.contact'), href: '/#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61583964147111', color: 'hover:text-blue-600' },
    { icon: Twitter, href: 'https://x.com/AjanthaConsulta?t=CVX-Adl3jnmHuiOf2VeCgQ&s=09', color: 'hover:text-blue-400' },
    { icon: Instagram, href: 'https://www.instagram.com/ajanthaconsultancyservices/', color: 'hover:text-pink-600' }
  ];

  // Navigation function matching header behavior
  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname === '/') {
        // We're on the home page, scroll to element
        const element = document.getElementById(hash);
        if (element) {
          // Calculate header height for offset
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight + 20 : 100;
          
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return;
        }
      }
      // Not on home page, navigate with hash (React Router will handle it)
    }
    // For other paths, scroll to top will be handled by header's useEffect
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              {/* Logo Image */}
              <img
                src="/data/Ajantha logo.png"
                alt="ACS Logo"
                className="h-12 w-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="ml-3">
                <h3 className="text-lg font-bold">{t('footer.company')}</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={`Visit our ${social.icon.name} page`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={`/service/${service.id}`}
                    onClick={() => handleNavClick(`/service/${service.id}`)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.quicklinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <a
                  href="tel:+919030862622"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  +91 9030862622
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <a
                  href="mailto:ajanthaconsultancy@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  ajanthaconsultancy@gmail.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400">
                  Hyderabad, Telangana, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}