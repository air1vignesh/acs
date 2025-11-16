import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FloatingCTA() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/9603189145"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </a>

        {/* Direct Call Button */}
        <a
          href="tel:9603189145"
          className="bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 hover:scale-110 group"
        >
          <Phone className="w-6 h-6 group-hover:animate-pulse" />
        </a>
      </div>
    </>
  );
}
