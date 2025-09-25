import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Globe, Facebook, Twitter, Instagram } from 'lucide-react'; 

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.replace('/#', '#');
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    // Scroll to top for all navigations
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLogoModal = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsLogoModalOpen(true);
  };

  const closeLogoModal = () => {
    setIsLogoModalOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <a href="#" onClick={openLogoModal} className="flex items-center">
              <img src="/data/1758011042953.png" alt="Ajantha Consultancy Services Logo" className="w-12 h-12 cursor-pointer" />
            </a>
            <span className="text-xl font-bold text-gray-900">
              {language === 'te'
                ? 'అజంతా కన్సల్టెన్సీ సర్వీసెస్'
                : 'Ajantha Consultancy Services'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={() => handleNavClick('/')}
              className={`font-medium transition-colors ${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/#about"
              onClick={() => handleNavClick('/#about')}
              className={`font-medium transition-colors ${isActive('/#about') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/#services"
              onClick={() => handleNavClick('/#services')}
              className={`font-medium transition-colors ${isActive('/#services') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/educationhub"
              onClick={() => handleNavClick('/educationhub')}
              className={`font-medium transition-colors ${isActive('/educationhub') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {language === 'te' ? 'విద్య' : 'Education'}
            </Link>
            <Link
              to="/calculators"
              onClick={() => handleNavClick('/calculators')}
              className={`font-medium transition-colors ${isActive('/calculators') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t('nav.calculators')}
            </Link>
            <Link
              to="/#contact"
              onClick={() => handleNavClick('/#contact')}
              className={`font-medium transition-colors ${isActive('/#contact') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Language Toggle & Social Media & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Social Media Links for Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/AjanthaConsulta" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/ajanthaconsultancyservices/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title={language === 'en' ? 'Switch to Telugu' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'తె' : 'EN'}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/" onClick={() => handleNavClick('/')} className={`font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {t('nav.home')}
              </Link>
              <Link to="/#about" onClick={() => handleNavClick('/#about')} className={`font-medium transition-colors ${isActive('/#about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {t('nav.about')}
              </Link>
              <Link to="/#services" onClick={() => handleNavClick('/#services')} className={`font-medium transition-colors ${isActive('/#services') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {t('nav.services')}
              </Link>
              <Link to="/educationhub" onClick={() => handleNavClick('/educationhub')} className={`font-medium transition-colors ${isActive('/educationhub') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {language === 'te' ? 'విద్య' : 'Education'}
              </Link>
              <Link to="/calculators" onClick={() => handleNavClick('/calculators')} className={`font-medium transition-colors ${isActive('/calculators') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {t('nav.calculators')}
              </Link>
              <Link to="/#contact" onClick={() => handleNavClick('/#contact')} className={`font-medium transition-colors ${isActive('/#contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {t('nav.contact')}
              </Link>
              {/* Social Media Links for Mobile */}
              <div className="flex items-center space-x-4 mt-4 justify-center border-t border-gray-200 pt-4">
                <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Logo Pop-up Modal */}
      {isLogoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[999]" onClick={closeLogoModal}>
          <div className="relative max-w-full max-h-full bg-white p-4 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}> 
            <button 
              onClick={closeLogoModal}
              className="absolute -top-3 -right-3 text-gray-700 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img src="/public/data/1758011042953.png" alt="Ajantha Consultancy Services Logo" className="max-w-full max-h-[90vh] object-contain" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;