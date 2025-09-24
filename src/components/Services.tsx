import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Home, TrendingUp, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  // helper function to load features by count
  const getFeatures = (baseKey, count) => {
    return Array.from({ length: count }, (_, i) => t(`${baseKey}.${i + 1}`));
  };

  const services = [
    {
      id: 1,
      icon: Heart,
      title: t('services.health.title'),
      description: t('services.health.desc'),
      features: getFeatures('services.health.features', 4),
      color: 'bg-red-100 text-red-700',
      gradient: 'from-red-50 to-pink-50'
    },
    {
      id: 2,
      icon: Shield,
      title: t('services.life.title'),
      description: t('services.life.desc'),
      features: getFeatures('services.life.features', 4),
      color: 'bg-blue-100 text-blue-700',
      gradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 3,
      icon: Home,
      title: t('services.realestate.title'),
      description: t('services.realestate.desc'),
      features: getFeatures('services.realestate.features', 4),
      color: 'bg-green-100 text-green-700',
      gradient: 'from-green-50 to-emerald-50'
    },
    {
      id: 4,
      icon: TrendingUp,
      title: t('services.financial.title'),
      description: t('services.financial.desc'),
      features: getFeatures('services.financial.features', 4),
      color: 'bg-orange-100 text-orange-700',
      gradient: 'from-orange-50 to-yellow-50'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
            >
              <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to={`/service/${service.id}`}
                className="w-full bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center group"
              >
                {t('button.learnmore')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
