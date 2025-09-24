import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart, TrendingUp, ArrowRight, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export default function CalculatorsPage() {
  const { t } = useLanguage();

  const calculators = [
    {
      id: 'emi',
      title: 'EMI Calculator',
      teTitle: 'EMI కాలిక్యులేటర్',
      description: 'Calculate your loan EMI amount with comparison features and bullet payment options',
      teDescription: 'పోలిక లక్షణాలు మరియు బుల్లెట్ చెల్లింపు ఎంపికలతో మీ రుణ EMI మొత్తాన్ని లెక్కించండి',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      path: '/calculators/emi'
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance Risk Calculator',
      teTitle: 'ఆరోగ్య బీమా రిస్క్ కాలిక్యులేటర్',
      description: 'Calculate out-of-pocket exposure and debt requirements for medical emergencies',
      teDescription: 'వైద్య అత్యవసర పరిస్థితుల కోసం జేబు నుండి బయటకు వచ్చే ఖర్చు మరియు రుణ అవసరాలను లెక్కించండి',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      path: '/calculators/health-insurance'
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      teTitle: 'SIP కాలిక్యులేటర్',
      description: 'Plan your systematic investment and calculate returns',
      teDescription: 'మీ క్రమబద్ధమైన పెట్టుబడిని ప్లాన్ చేయండి మరియు రిటర్న్‌లను లెక్కించండి',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      path: '/calculators/sip'
    }
  ];

  const additionalCalculators = [
    {
      id: 'life-insurance',
      title: 'Life Insurance Calculator',
      teTitle: 'జీవిత బీమా కాలిక్యులేటర్',
      description: 'Calculate optimal life insurance coverage with AI-powered analysis',
      teDescription: 'AI-శక్తితో కూడిన విశ్లేషణతో సరైన జీవిత బీమా కవరేజీని లెక్కించండి',
      icon: Shield,
      color: 'from-orange-500 to-red-600',
      path: '/calculators/life-insurance'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('calculators.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('calculators.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...calculators, ...additionalCalculators].map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  to={calc.path}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <div className={`bg-gradient-to-r ${calc.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {t('language') === 'te' ? calc.teTitle : calc.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {t('language') === 'te' ? calc.teDescription : calc.description}
                    </p>

                    <div className="flex items-center text-blue-700 font-semibold group-hover:text-blue-800 transition-colors duration-200">
                      {t('button.calculate')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}