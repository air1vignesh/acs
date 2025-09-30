import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9030862622',
      action: 'tel:+919030862622',
      bg: 'bg-blue-100',
      color: 'text-blue-700'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'ajanthaconsultancyservices@gmail.com',
      action: 'mailto:ajanthaconsultancyservices@gmail.com',
      bg: 'bg-pink-100',
      color: 'text-pink-700'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Hyderabad, Telangana, India',
      action: '#',
      bg: 'bg-purple-100',
      color: 'text-purple-700'
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon-Sat: 9:00 AM - 7:00 PM',
      action: '#',
      bg: 'bg-yellow-100',
      color: 'text-yellow-700'
    }
  ];

  // ✅ Pre-filled WhatsApp message
  const whatsappLink =
    'https://wa.me/919030862622?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.';

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`${info.bg} ${info.color} p-4 rounded-full mb-4 shadow-sm`}
              >
                <info.icon className="w-7 h-7" />
              </div>
              <h4 className="text-sm text-gray-500 font-medium mb-1">
                {info.label}
              </h4>
              <p className="text-gray-900 font-semibold">{info.value}</p>
            </a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="relative bg-green-600 text-white rounded-2xl shadow-lg p-10 overflow-hidden">
          {/* Decorative bubbles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-700 rounded-full opacity-20"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-green-800 rounded-full opacity-10"></div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="bg-white text-green-600 p-4 rounded-full shadow-md">
                <MessageCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Quick WhatsApp Consultation</h3>
                <p className="text-green-100">
                  Get instant answers to your financial queries
                </p>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-green-50 transition-all duration-300"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
