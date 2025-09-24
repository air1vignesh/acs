import React from 'react';
import { Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-green-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col items-center text-center space-y-10">
            {/* Logo Image */}
            <div>
              <img
                src="/data/Ajantha logo black.png" 
                alt="Ajantha Consultancy Logo"
                className="w-auto max-h-36 object-contain mx-auto"
              />
            </div>

            {/* Text Content */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

          
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img
                src="/data/close-up-smiley-family-therapist.jpg"
                alt="Financial Planning"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
