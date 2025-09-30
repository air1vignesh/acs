import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'te' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.about': 'మా గురించి',
    'nav.services': 'సేవలు',
    'nav.calculators': 'కాలిక్యులేటర్లు',
    'nav.contact': 'సంప్రదింపులు',
    'nav.education': 'విద్య',
    'nav.back': 'వెనుకకు వెళ్లండి',
    
    // Hero Section
    'hero.title': 'మీ భవిష్యత్తు, మా నిబద్ధత.',
    'hero.subtitle': 'విశ్వసనీయ సలహాలు మరియు నిపుణ మార్గదర్శకత్వంతో మీ ఆర్దిక లక్ష్యాలను సాధించండి',
    'hero.cta.quote': 'కోట్ పొందండి',
    'hero.cta.consultation': 'ఉచిత సంప్రదింపు',
    'hero.cta.learn': 'మరింత తెలుసుకోండి',

    
    // Services
    'services.title': 'మా సేవలు',
    'services.subtitle': 'మీ భవిష్యత్తును భద్రపరచడానికి మరియు మీ లక్ష్యాలను సాధించడానికి మేము సమగ్ర ఆర్థిక సేవలను అందిస్తున్నాము',
    'services.health.title': 'ఆరోగ్య బీమా',
    'services.health.desc': 'వైద్య ఖర్చుల నుండి మిమ్మల్ని మరియు మీ కుటుంబాన్ని రక్షించండి',
    'services.life.title': 'జీవిత బీమా',
    'services.life.desc': 'మీ ప్రియమైన వారి ఆర్థిక భవిష్యత్తు భద్రపరచండి',
    'services.realestate.title': 'రియల్ ఎస్టేట్ సలహా',
    'services.realestate.desc': 'స్మార్ట్ ప్రాపర్టీ పెట్టుబడి నిర్ణయాలు తీసుకోండి',
    'services.financial.title': 'ఆర్థిక ప్రణాళిక',
    'services.financial.desc': 'మీ ఆర్థిక లక్ష్యాల కోసం వ్యూహాత్మక ప్రణాళిక',
    'services.health.features.1': 'సమగ్ర కవరేజ్',
'services.health.features.2': 'కుటుంబ ప్రణాళికలు అందుబాటులో ఉన్నాయి',
'services.health.features.3': 'క్యాష్‌లెస్ చికిత్స',
'services.health.features.4': 'త్వరిత క్లెయిమ్ ప్రాసెసింగ్',

'services.life.features.1': 'టర్మ్ & హోల్ లైఫ్ ప్లాన్స్',
'services.life.features.2': 'నివేశ ఎంపికలు',
'services.life.features.3': 'పన్ను ప్రయోజనాలు',
'services.life.features.4': 'అనుకూల ప్రీమియంలు',

'services.realestate.features.1': 'మార్కెట్ విశ్లేషణ',
'services.realestate.features.2': 'ప్రాపర్టీ మూల్యాంకనం',
'services.realestate.features.3': 'ఇన్వెస్ట్‌మెంట్ సలహా',
'services.realestate.features.4': 'లీగల్ గైడెన్స్',

'services.financial.features.1': 'లక్ష్య ఆధారిత ప్రణాళిక',
'services.financial.features.2': 'పోర్ట్‌ఫోలియో మేనేజ్మెంట్',
'services.financial.features.3': 'రిటైర్మెంట్ ప్రణాళిక',
'services.financial.features.4': 'పన్ను ఆప్టిమైజేషన్',

    
    // About
    'about.title': 'అజంతా కన్సల్టెన్సీ సర్వీసెస్ గురించి',
    'about.subtitle': 'వ్యక్తిగత అనుభవం నుండి జన్మించింది, లక్ష్యంతో ప్రేరేపించబడింది',
    'about.companyDescription': 'అజంతా కన్సల్టెన్సీ సర్వీసెస్ లో, మేము మా క్లయింట్లకు నైపుణ్యం కలిగిన మార్గదర్శకత్వం, తిరుగులేని నిజాయితీ మరియు వ్యక్తిగత పరిష్కారాల ద్వారా ఆర్థికంగా ధైర్యవంతమైన నిర్ణయాలు తీసుకోవడానికి సహాయం చేస్తాము. లోతైన వాస్తవ ప్రపంచ అనుభవంతో, మా బృందం ఆరోగ్య బీమా మరియు జీవిత బీమా, రియల్ ఎస్టేట్ మరియు ప్రత్యేకమైన ఆర్థిక ప్రణాళికలో సమగ్ర సేవలను అందిస్తుంది. వ్యక్తులు మరియు కుటుంబాలు సంక్లిష్టమైన ఆర్థిక పరిస్థితులను స్పష్టత మరియు విశ్వాసంతో నావిగేట్ చేయడానికి మేము సహాయం చేస్తూ, భద్రత, వృద్ధి మరియు మనశ్శాంతిని నిర్ధారించడానికి శాశ్వత సంబంధాలను పెంపొందించడానికి మేము అంకితమై ఉన్నాము',
    'about.visionTitle': 'మా దృష్టి',
    'about.vision': 'క్లయింట్‌ల ఆర్థిక భద్రత మరియు శ్రేయస్సు సాధనలో ప్రధాన భాగస్వామిగా ఉండటం, ఆరోగ్య బీమా మరియు జీవిత బీమా, రియల్ ఎస్టేట్ మరియు ఆర్థిక ప్రణాళికలో వినూత్న, సంపూర్ణ మరియు నిపుణుల పరిష్కారాలను తిరుగులేని విశ్వాసం మరియు అంకితభావంతో అందించడం.',
    'about.missionTitle': 'మా మిషన్',
    'about.mission': 'వ్యక్తిగతమైన, పారదర్శకమైన మరియు నైతిక సలహా సేవల ద్వారా మా క్లయింట్లకు సాధికారత కల్పించడం, వారి ఆరోగ్యాన్ని కాపాడటానికి, వారి ఆస్తులను రక్షించడానికి మరియు వారి ఆర్థిక సామర్థ్యాన్ని పెంచుకోవడానికి వాస్తవ ప్రపంచ నైపుణ్యాన్ని ఉపయోగించి, వారికి ఆత్మవిశ్వాసంతో కూడిన భవిష్యత్తును అందించడం.',
    'about.valuesTitle': 'మమ్మల్ని ఎందుకు ఎంచుకోవాలి ?',
    'about.values.clientCentric.title': 'అనుభవం నుండి అవగాహన వరకు',
    'about.values.clientCentric.description': ' మీ కష్టాలు మాకు తెలుసు; ఎందుకంటే మేము కూడా అదే సమస్యలను ఎదుర్కొన్నాం.',
    'about.values.expertise.title': 'మా విలువలు',
    'about.values.expertise.description': 'పారదర్శకత, నిజాయితీ, మరియు క్లయింటే మా ప్రధానం అనే సూత్రాలతో, మేము నమ్మకమైన, శాశ్వత సంబంధాలను పెంచుకుంటూ, మీకు అత్యుత్తమ విలువను అందిస్తాము.',
    'about.values.experience.title': 'నిజ జీవిత అనుభవం',
    'about.values.experience.description': 'మార్కెటింగ్‌ అనుభవం, ఫైనాన్షియల్ నైపుణ్యం తో పాటు, మాకు క్లెయిమ్స్‌లో స్వంత అనుభవం ఉంది. దీని ద్వారా, మేము ఆచరణాత్మకమైన, వ్యక్తిగత పరిజ్ఞానంతో మీకు సేవ చేస్తాము.',
    'about.values.education.title': 'మా నిబద్ధత',
    'about.values.education.description': 'మీ అభివృద్ధి చెందుతున్న ఆర్థిక అవసరాలకు సరైన పరిష్కారాలు ఇవ్వడానికి, నిరంతరం నేర్చుకుంటూ, మార్కెట్ స్థితిగతులు గురించి తెలుసుకుంటాము.',
    'about.team.title': 'మా వ్యవస్థాపకుడిని కలవండి',
    'about.team.founder.name': 'విఘ్నేష్ పూజరి',
    'about.team.founder.role': 'వ్యవస్థాపకుడు',
    'about.team.founder.note': 'అజంతా కన్సల్టెన్సీ సర్వీసెస్ వ్యవస్థాపకుడిగా, ప్రతి ఒక్కరికీ వారి భవిష్యత్తు కోసం నిపుణులైన, నమ్మదగిన మార్గదర్శకత్వం అవసరమని నేను నమ్ముతున్నాను. ఆరోగ్య భీమా, జీవిత భీమా, రియల్ ఎస్టేట్ మరియు ఆర్థిక ప్రణాళికలో ప్రామాణికమైన పరిష్కారాలను అందించడమే మా లక్ష్యం. పరిశ్రమ పరిజ్ఞానం మరియు మా బృందం యొక్క నిజ జీవిత అనుభవాలు మా సలహాకు ప్రత్యేక బలాన్నిస్తాయి. మీరు సరైన నిర్ణయాలు తీసుకుని, మరింత ఉజ్వలమైన భవిష్యత్తును నిర్మించుకోవడానికి మేము సహాయం చేస్తాము.',
    'about.stats.clients.number': '100+',
    'about.stats.clients.label': 'కుటుంబాలకు మార్గదర్శకత్వం',
    'about.stats.certification.number': 'IRDAI',
    'about.stats.certification.label': 'సర్టిఫైడ్ సలహాదారులు',
    'about.stats.experience.number': 'నిజమైన',
    'about.stats.experience.label': 'క్లెయిమ్ అనుభవం',
    'about.stats.satisfaction.number': '100%',
    'about.stats.satisfaction.label': 'నిబద్ధత',
    'about.cta.title': 'మీ కుటుంబ భవిష్యత్తును భద్రపరచడానికి సిద్ధంగా ఉన్నారా?',
    'about.cta.description': 'సరైన ఇన్షురెన్స్ మరియు ఆర్థిక రక్షణ నిర్ణయాలలో మా వ్యక్తిగత అనుభవం మరియు వృత్తిపరమైన నైపుణ్యం మిమ్మల్ని మార్గనిర్దేశం చేయనివ్వండి.',
    'about.cta.primaryButton': 'ఉచిత సంప్రదింపులు పొందండి',
    'about.cta.secondaryButton': 'మరింత తెలుసుకోండి',

    // Contact
    'contact.title': 'మాతో సంప్రదించండి',
    'contact.subtitle': 'ఉచిత సంప్రదింపు బుక్ చేసుకోండి',
    'contact.form.name': 'పూర్తి పేరు',
    'contact.form.email': 'ఇమెయిల్',
    'contact.form.phone': 'ఫోన్ నంబర్',
    'contact.form.service': 'సేవ ఎంచుకోండి',
    'contact.form.message': 'సందేశం',
    'contact.form.submit': 'సంప్రదింపు పంపండి',
    
    // Footer
    'footer.company': 'అజంతా కన్సల్టెన్సీ సర్వీసెస్',
    'footer.tagline': 'మీ విశ్వసనీయ ఆర్థిక భాగస్వామి',
    'footer.services': 'సేవలు',
    'footer.quicklinks': 'త్వరిత లింకులు',
    'footer.contact': 'సంప్రదింపులు',
    'footer.newsletter': 'వార్తాలేఖ',
    'footer.newsletter.desc': 'ఆర్థిక చిట్కాలు మరియు అప్‌డేట్‌ల కోసం సబ్‌స్క్రైబ్ అవ్వండి',
    'footer.rights': 'అజంతా కన్సల్టెన్సీ సర్వీసెస్. అన్ని హక్కులు రిజర్వ్‌డ్.',
    
    // Buttons
    'button.callback': 'కాల్‌బ్యాక్ అభ్యర్థించండి',
    'button.learnmore': 'మరింత తెలుసుకోండి',
    'button.calculate': 'లెక్కించండి',
    'button.subscribe': 'సబ్‌స్క్రైబ్',
    
    // Calculators
    'calculators.title': 'ఆర్థిక కాలిక్యులేటర్లు',
    'calculators.subtitle': 'మీ ఆర్థిక నిర్ణయాలను సమాచార ఆధారితంగా తీసుకోండి',
    'calculators.emi.title': 'EMI కాలిక్యులేటర్',
    'calculators.emi.subtitle': 'పోలిక లక్షణాలు మరియు బుల్లెట్ చెల్లింపు ఎంపికలతో మీ రుణ EMI మొత్తాన్ని లెక్కించండి',
    'calculators.health.title': 'ఆరోగ్య బీమా రిస్క్ కాలిక్యులేటర్',
    'calculators.health.subtitle': 'వైద్య అత్యవసర పరిస్థితుల కోసం జేబు నుండి బయటకు వచ్చే ఖర్చు మరియు రుణ అవసరాలను లెక్కించండి',
    'calculators.sip.title': 'SIP కాలిక్యులేటర్',
    'calculators.sip.subtitle': 'మీ క్రమబద్ధమైన పెట్టుబడిని ప్లాన్ చేయండి మరియు రిటర్న్‌లను లెక్కించండి',
    'calculators.life.title': 'జీవిత బీమా కాలిక్యులేటర్',
    'calculators.life.subtitle': 'AI-శక్తితో కూడిన విశ్లేషణతో సరైన జీవిత బీమా కవరేజీని లెక్కించండి',
    
    // Service Details
    'service.benefits': 'ముఖ్యాంశాలు',
    'service.process': 'మా ప్రక్రియ',
    'service.faqs': 'తరచుగా అడిగే ప్రశ్నలు',
    'service.cta.title': 'ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?',
    'service.cta.consultation': 'ఉచిత సంప్రదింపు పొందండి',
    'service.cta.call': 'కాల్ చేయండి',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.calculators': 'Calculators',
    'nav.contact': 'Contact',
    'nav.education': 'Eductaion',
    'nav.back': 'Back to Calculators',
    
    // Hero Section
    'hero.title': 'Your Future,Our Commitment.',
    'hero.subtitle': 'Achieve your financial goals with trusted advice and expert guidance',
    'hero.cta.quote': 'Get a Quote',
    'hero.cta.consultation': 'Free Consultation',
    'hero.cta.learn': 'Learn More',
    'infographic.title': 'CLIENT ADVISORY PROCESS',
'infographic.step1.title': 'CLIENT REQUEST',
'infographic.step1.subtitle': 'CALL, CHAT, MAIL',
'infographic.step1.desc': 'Initial client outreach through various communication channels',

'infographic.step2.title': 'INITIAL CONTACT',
'infographic.step2.subtitle': 'ADVISOR REACHES OUT',
'infographic.step2.desc': 'Advisor initiates contact within designated timeframe',

'infographic.step3.title': 'UNDERSTANDING',
'infographic.step3.subtitle': 'ACTIVELY LISTENS TO CONCERNS',
'infographic.step3.desc': 'Deep listening session to understand client needs and concerns',

'infographic.step4.title': 'ANALYSIS & ADVICE',
'infographic.step4.subtitle': 'CAREFUL ANALYSIS - ADVISOR GIVES GUIDANCE',
'infographic.step4.desc': 'Comprehensive analysis followed by tailored advice and recommendations',

'infographic.step5.title': 'CONCLUSION',
'infographic.step5.subtitle': 'CLARIFY DOUBTS - COMMUNICATION ENDS',
'infographic.step5.desc': 'Final clarifications and formal conclusion of advisory session',

'infographic.bottomTitle': 'Professional Advisory Services',
'infographic.bottomDesc': 'Our structured 5-step process ensures comprehensive client support from initial contact to successful conclusion.',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer comprehensive financial services to secure your future and help you achieve your goals',
    'services.health.title': 'Health Insurance',
    'services.health.desc': 'Protect yourself and your family from medical expenses',
    'services.life.title': 'Life Insurance',
    'services.life.desc': 'Secure the financial future of your loved ones',
    'services.realestate.title': 'Real Estate Advisory',
    'services.realestate.desc': 'Make smart property investment decisions',
    'services.financial.title': 'Financial Planning',
    'services.financial.desc': 'Strategic planning for your financial goals',
    'services.health.features.1': 'Comprehensive Coverage',
'services.health.features.2': 'Family Plans Available',
'services.health.features.3': 'Cashless Treatment',
'services.health.features.4': 'Quick Claim Processing',

'services.life.features.1': 'Term & Whole Life Plans',
'services.life.features.2': 'Investment Options',
'services.life.features.3': 'Tax Benefits',
'services.life.features.4': 'Flexible Premiums',

'services.realestate.features.1': 'Market Analysis',
'services.realestate.features.2': 'Property Valuation',
'services.realestate.features.3': 'Investment Advisory',
'services.realestate.features.4': 'Legal Guidance',

'services.financial.features.1': 'Goal-based Planning',
'services.financial.features.2': 'Portfolio Management',
'services.financial.features.3': 'Retirement Planning',
'services.financial.features.4': 'Tax Optimization',

    
    // About
    'about.title': 'About Ajantha Consultancy Services',
    'about.subtitle': 'Born from Personal Experience, Driven by Purpose',
    'about.companyDescription': 'At Ajantha Consultancy Services, we empower our clients to make confident financial decisions through expert guidance, unwavering integrity, and personalized solutions. With deep real-world experience, our team delivers comprehensive services in health and life insurance, real estate, and customized financial planning. We are dedicated to fostering lasting relationships, ensuring security, growth, and peace of mind as we help individuals and families navigate complex financial landscapes with clarity and confidence.',
    'about.visionTitle': 'Vision Statement',
    'about.vision': 'To be the premier partner in our clients’ pursuit of financial security and prosperity, delivering innovative, holistic, and expert solutions in insurance, real estate, and financial planning with unwavering trust and dedication.',
    'about.missionTitle': 'Mission Statement',
    'about.mission': 'To empower our clients through tailored, transparent, and ethical advisory services, leveraging real-world expertise to secure their health, protect their assets, and maximize their financial potential for a confident future.',
    'about.valuesTitle': 'Why Choose us ?',
    'about.values.clientCentric.title': 'From Experience to Understanding',
    'about.values.clientCentric.description': 'Your struggles resonate with us; we\'ve been in your shoes.',
    'about.values.expertise.title': 'Our Values',
    'about.values.expertise.description': 'Transparency, integrity, and a client-first approach are our foundation. We build trust and long-term relationships by delivering exceptional value.',
    'about.values.experience.title': 'Real Life Experience',
    'about.values.experience.description': 'Marketing savvy, financial expertise, and firsthand claims experience. We bring practical, personal knowledge to your service.',
    'about.values.education.title': 'Our Commitment',
    'about.values.education.description': 'We commit to continuous learning and staying updated on market trends to best serve your evolving financial needs.',
    'about.team.title': 'Meet Our Founder',
    'about.team.founder.name': 'Vignesh Pujari',
    'about.team.founder.role': 'Founder',
    'about.team.founder.note': 'As the founder of Ajantha Consultancy Services, I established this firm on one core conviction: that everyone deserves reliable, expert guidance to confidently secure their future. Our mission is to deliver authentic solutions across Health and Life insurance, real estate, and financial planning.Our advice is uniquely informed by deep industry knowledge and the real-life experience of our dedicated team. We empower you to make informed decisions and build a brighter tomorrow.',
    'about.statsTitle': 'Our Impact',
    'about.stats.clients.number': '100+',
    'about.stats.clients.label': 'Families Guided',
    'about.stats.certification.number': 'IRDAI',
    'about.stats.certification.label': 'Certified Advisors',
    'about.stats.experience.number': 'Real',
    'about.stats.experience.label': 'Claim Experience',
    'about.stats.satisfaction.number': '100%',
    'about.stats.satisfaction.label': 'Commitment',
    'about.cta.title': 'Ready to Secure Your Family\'s Future?',
    'about.cta.description': 'Let our personal experience and professional expertise guide you through the right insurance and financial protection decisions.',
    'about.cta.primaryButton': 'Get Free Consultation',
    'about.cta.secondaryButton': 'Learn More',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Book a Free Consultation',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone Number',
    'contact.form.service': 'Select Service',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Inquiry',
    
    // Footer
    'footer.company': 'Ajantha Consultancy Services',
    'footer.tagline': 'Your Trusted Financial Partner',
    'footer.services': 'Services',
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.desc': 'Subscribe for financial tips and updates',
    'footer.rights': 'Ajantha Consultancy Services. All rights reserved.',
    
    // Buttons
    'button.callback': 'Request Callback',
    'button.learnmore': 'Learn More',
    'button.calculate': 'Calculate',
    'button.subscribe': 'Subscribe',
    
    // Calculators
    'calculators.title': 'Financial Calculators',
    'calculators.subtitle': 'Make informed financial decisions with our comprehensive calculators',
    'calculators.emi.title': 'EMI Calculator',
    'calculators.emi.subtitle': 'Calculate your loan EMI amount with comparison features and bullet payment options',
    'calculators.health.title': 'Health Insurance Risk Calculator',
    'calculators.health.subtitle': 'Calculate out-of-pocket exposure and debt requirements for medical emergencies',
    'calculators.sip.title': 'SIP Calculator',
    'calculators.sip.subtitle': 'Plan your systematic investment and calculate returns',
    'calculators.life.title': 'Life Insurance Calculator',
    'calculators.life.subtitle': 'Calculate optimal life insurance coverage with AI-powered analysis',
    
    // Service Details
    'service.benefits': 'Key Benefits',
    'service.process': 'Our Process',
    'service.faqs': 'Frequently Asked Questions',
    'service.cta.title': 'Ready to Get Started?',
    'service.cta.consultation': 'Get Free Consultation',
    'service.cta.call': 'Call Now',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('te');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}