import React from 'react';
import { Award, Users, Target, Heart, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('about.values.clientCentric.title'),
      description: t('about.values.clientCentric.description')
    },
    {
      icon: Award,
      title: t('about.values.expertise.title'),
      description: t('about.values.expertise.description')
    },
    {
      icon: Target,
      title: t('about.values.experience.title'),
      description: t('about.values.experience.description')
    },
    {
      icon: Users,
      title: t('about.values.education.title'),
      description: t('about.values.education.description')
    }
  ];

  const team = [
    {
      name: t('about.team.founder.name'),
      role: t('about.team.founder.role'),
      image: '/data/1758005955871.jpg',
      note: t('about.team.founder.note')
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              IRDAI Certified • Personal Experience • Trusted Guidance
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            {t('about.title')}
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-blue-700 mb-6 font-semibold">
            {t('about.subtitle')}
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {t('about.companyDescription')}
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="max-w-5xl mx-auto mb-16 space-y-10 text-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('about.visionTitle')}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{t('about.vision')}</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('about.missionTitle')}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{t('about.mission')}</p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {t('about.valuesTitle')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-blue-700" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {t('about.team.title')}
          </h3>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6 transition-transform duration-500 hover:scale-105 hover:shadow-3xl"
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-72 h-72 rounded-full overflow-hidden shadow-lg transform transition-all duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-blue-700 font-semibold text-lg mb-2">
                    {member.role}
                  </p>
                  <p className="text-green-600 font-medium mb-2 bg-green-50 rounded-lg py-1 px-3 inline-block">
                    {member.education}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {member.experience}
                  </p>

                  {/* Founder Note */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <Quote className="w-8 h-8 text-blue-600 flex-shrink-0" />
                      <p className="italic text-gray-800 text-lg leading-relaxed">
                        &ldquo;{member.note}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}