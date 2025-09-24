import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Heart, Home, TrendingUp, ArrowRight, CheckCircle, ArrowLeft, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockData } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const { language, t } = useLanguage();
  const service = mockData.services.find(s => s.id === parseInt(serviceId || '0'));

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Service Not Found</h1>
            <Link 
              to="/#services" 
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = {
    Shield,
    Heart,
    Home,
    TrendingUp
  }[service.icon];

  const serviceDetails = {
    1: { // Health Insurance
      overview: {
        en: "Comprehensive health insurance solutions designed to protect your family from unexpected medical expenses. Our health insurance plans provide extensive coverage with cashless treatment facilities at top hospitals.",
        te: "అనుకోని వైద్య ఖర్చుల నుండి మీ కుటుంబాన్ని రక్షించడానికి రూపొందించిన సమగ్ర ఆరోగ్య బీమా పరిష్కారాలు. మా ఆరోగ్య బీమా ప్రణాళికలు అగ్రశ్రేణి ఆసుపత్రులలో నగదు రహిత చికిత్స సౌకర్యాలతో విస్తృత కవరేజీని అందిస్తాయి."
      },
      benefits: {
        en: [
          "Cashless treatment at 10,000+ network hospitals",
          "Coverage for pre and post hospitalization expenses",
          "Critical illness coverage up to ₹50 lakhs",
          "Annual health check-ups included",
          "No waiting period for accidents",
          "Coverage for day-care procedures",
          "Maternity benefits available",
          "Tax benefits under Section 80D"
        ],
        te: [
          "10,000+ నెట్‌వర్క్ ఆసుపత్రులలో నగదు రహిత చికిత్స",
          "ఆసుపత్రిలో చేరడానికి ముందు మరియు తరువాత ఖర్చుల కవరేజీ",
          "₹50 లక్షల వరకు క్రిటికల్ ఇల్నెస్ కవరేజీ",
          "వార్షిక ఆరోగ్య పరీక్షలు చేర్చబడ్డాయి",
          "ప్రమాదాలకు వేచి ఉండే కాలం లేదు",
          "డే-కేర్ ప్రక్రియలకు కవరేజీ",
          "మాతృత్వ ప్రయోజనాలు అందుబాటులో ఉన్నాయి",
          "సెక్షన్ 80D కింద పన్ను ప్రయోజనాలు"
        ]
      },
      process: {
        en: [
          "Free consultation to assess your healthcare needs",
          "Comparison of plans from top insurance companies",
          "Customized recommendations based on your budget",
          "Hassle-free documentation and application process",
          "Policy issuance and welcome kit delivery",
          "Ongoing support for claims and renewals"
        ],
        te: [
          "మీ ఆరోగ్య అవసరాలను అంచనా వేయడానికి ఉచిత సంప్రదింపు",
          "అగ్రశ్రేణి బీమా కంపెనీల ప్రణాళికల పోలిక",
          "మీ బడ్జెట్ ఆధారంగా అనుకూలీకరించిన సిఫార్సులు",
          "ఇబ్బంది లేని డాక్యుమెంటేషన్ మరియు దరఖాస్తు ప్రక్రియ",
          "పాలసీ జారీ మరియు స్వాగత కిట్ డెలివరీ",
          "క్లెయిమ్‌లు మరియు పునరుద్ధరణలకు కొనసాగుతున్న మద్దతు"
        ]
      },
      faqs: {
        en: [
          {
            q: "What is the waiting period for pre-existing diseases?",
            a: "Typically 2-4 years depending on the insurance company and specific condition. We help you find policies with shorter waiting periods."
          },
          {
            q: "Can I add family members to my policy?",
            a: "Yes, you can include spouse, children, and dependent parents in a family floater policy, which is often more cost-effective."
          },
          {
            q: "What is cashless treatment?",
            a: "Cashless treatment allows you to receive medical care at network hospitals without paying upfront. The insurance company settles bills directly with the hospital."
          }
        ],
        te: [
          {
            q: "ముందుగా ఉన్న వ్యాధులకు వేచి ఉండే కాలం ఎంత?",
            a: "బీమా కంపెనీ మరియు నిర్దిష్ట పరిస్థితిని బట్టి సాధారణంగా 2-4 సంవత్సరాలు. తక్కువ వేచి ఉండే కాలంతో పాలసీలను కనుగొనడంలో మేము మీకు సహాయం చేస్తాము."
          },
          {
            q: "నేను నా పాలసీకి కుటుంబ సభ్యులను జోడించగలనా?",
            a: "అవును, మీరు జీవిత భాగస్వామి, పిల్లలు మరియు ఆధారపడిన తల్లిదండ్రులను కుటుంబ ఫ్లోటర్ పాలసీలో చేర్చవచ్చు, ఇది తరచుగా మరింత ఖర్చు-ప్రభావవంతంగా ఉంటుంది."
          },
          {
            q: "నగదు రహిత చికిత్స అంటే ఏమిటి?",
            a: "నగదు రహిత చికిత్స మీరు ముందుగా చెల్లించకుండా నెట్‌వర్క్ ఆసుపత్రులలో వైద్య సంరక్షణ పొందడానికి అనుమతిస్తుంది. బీమా కంపెనీ ఆసుపత్రితో నేరుగా బిల్లులను పరిష్కరిస్తుంది."
          }
        ]
      }
    },
    2: { // Life Insurance
      overview: {
        en: "Secure your family's financial future with our comprehensive life insurance solutions. From term insurance to investment-linked plans, we help you choose the right coverage for your needs.",
        te: "మా సమగ్ర జీవిత బీమా పరిష్కారాలతో మీ కుటుంబ ఆర్థిక భవిష్యత్తును భద్రపరచుకోండి. టర్మ్ ఇన్సూరెన్స్ నుండి పెట్టుబడి-లింక్డ్ ప్రణాళికల వరకు, మీ అవసరాలకు సరైన కవరేజీని ఎంచుకోవడంలో మేము మీకు సహాయం చేస్తాము."
      },
      benefits: {
        en: [
          "High coverage at affordable premiums",
          "Tax benefits under Section 80C and 10(10D)",
          "Flexible premium payment options",
          "Riders for additional protection",
          "Online policy management",
          "Quick claim settlement process",
          "Return of premium options available",
          "Coverage up to ₹10 crores"
        ],
        te: [
          "సరసమైన ప్రీమియంలతో అధిక కవరేజీ",
          "సెక్షన్ 80C మరియు 10(10D) కింద పన్ను ప్రయోజనాలు",
          "సరళమైన ప్రీమియం చెల్లింపు ఎంపికలు",
          "అదనపు రక్షణ కోసం రైడర్లు",
          "ఆన్‌లైన్ పాలసీ నిర్వహణ",
          "త్వరిత క్లెయిమ్ పరిష్కార ప్రక్రియ",
          "ప్రీమియం రిటర్న్ ఎంపికలు అందుబాటులో ఉన్నాయి",
          "₹10 కోట్లు వరకు కవరేజీ"
        ]
      },
      process: {
        en: [
          "Financial needs analysis and goal setting",
          "Comparison of term and investment plans",
          "Premium calculation and affordability assessment",
          "Medical examination coordination (if required)",
          "Policy documentation and submission",
          "Policy delivery and activation"
        ],
        te: [
          "ఆర్థిక అవసరాల విశ్లేషణ మరియు లక్ష్య నిర్ణయం",
          "టర్మ్ మరియు పెట్టుబడి ప్రణాళికల పోలిక",
          "ప్రీమియం లెక్కింపు మరియు స్థోమత అంచనా",
          "వైద్య పరీక్ష సమన్వయం (అవసరమైతే)",
          "పాలసీ డాక్యుమెంటేషన్ మరియు సమర్పణ",
          "పాలసీ డెలివరీ మరియు యాక్టివేషన్"
        ]
      },
      faqs: {
        en: [
          {
            q: "How much life insurance coverage do I need?",
            a: "Generally 10-15 times your annual income, considering your dependents' needs, outstanding loans, and future financial goals."
          },
          {
            q: "What's the difference between term and endowment plans?",
            a: "Term insurance provides pure protection at lower cost, while endowment plans combine insurance with savings but at higher premiums."
          },
          {
            q: "Can I increase my coverage later?",
            a: "Some policies offer options to increase coverage without medical examination during specific life events like marriage or childbirth."
          }
        ],
        te: [
          {
            q: "నాకు ఎంత జీవిత బీమా కవరేజీ అవసరం?",
            a: "సాధారణంగా మీ వార్షిక ఆదాయానికి 10-15 రెట్లు, మీ ఆధారపడిన వారి అవసరాలు, బకాయి రుణాలు మరియు భవిష్యత్ ఆర్థిక లక్ష్యాలను పరిగణనలోకి తీసుకుంటూ."
          },
          {
            q: "టర్మ్ మరియు ఎండోమెంట్ ప్రణాళికల మధ్య తేడా ఏమిటి?",
            a: "టర్మ్ ఇన్సూరెన్స్ తక్కువ ఖర్చుతో స్వచ్ఛమైన రక్షణను అందిస్తుంది, అయితే ఎండోమెంట్ ప్రణాళికలు బీమాను పొదుపుతో కలుపుతాయి కానీ అధిక ప్రీమియంలతో."
          },
          {
            q: "నేను తరువాత నా కవరేజీని పెంచుకోగలనా?",
            a: "కొన్ని పాలసీలు వివాహం లేదా పిల్లల జన్మ వంటి నిర్దిష్ట జీవిత సంఘటనల సమయంలో వైద్య పరీక్ష లేకుండా కవరేజీని పెంచే ఎంపికలను అందిస్తాయి."
          }
        ]
      }
    },
    3: { // Real Estate
      overview: {
        en: "Expert real estate advisory services to help you make informed property investment decisions. From residential to commercial properties, we guide you through every step of the real estate journey.",
        te: "సమాచార ఆధారిత ఆస్తి పెట్టుబడి నిర్ణయాలు తీసుకోవడంలో మీకు సహాయపడే నిపుణ రియల్ ఎస్టేట్ సలహా సేవలు. నివాస నుండి వాణిజ్య ఆస్తుల వరకు, రియల్ ఎస్టేట్ ప్రయాణంలో ప్రతి దశలో మేము మీకు మార్గదర్శకత్వం అందిస్తాము."
      },
      benefits: {
        en: [
          "Market analysis and property valuation",
          "Legal documentation assistance",
          "Investment potential assessment",
          "Negotiation support",
          "Due diligence services",
          "Property management guidance",
          "Tax optimization strategies",
          "Exit strategy planning"
        ],
        te: [
          "మార్కెట్ విశ్లేషణ మరియు ఆస్తి మూల్యాంకనం",
          "చట్టపరమైన డాక్యుమెంటేషన్ సహాయం",
          "పెట్టుబడి సంభావ్యత అంచనా",
          "చర్చల మద్దతు",
          "డ్యూ డిలిజెన్స్ సేవలు",
          "ఆస్తి నిర్వహణ మార్గదర్శకత్వం",
          "పన్ను ఆప్టిమైజేషన్ వ్యూహాలు",
          "నిష్క్రమణ వ్యూహ ప్రణాళిక"
        ]
      },
      process: {
        en: [
          "Investment goal and budget discussion",
          "Market research and property identification",
          "Site visits and property evaluation",
          "Legal and technical due diligence",
          "Price negotiation and deal closure",
          "Documentation and registration support"
        ],
        te: [
          "పెట్టుబడి లక్ష్యం మరియు బడ్జెట్ చర్చ",
          "మార్కెట్ పరిశోధన మరియు ఆస్తి గుర్తింపు",
          "సైట్ సందర్శనలు మరియు ఆస్తి మూల్యాంకనం",
          "చట్టపరమైన మరియు సాంకేతిక డ్యూ డిలిజెన్స్",
          "ధర చర్చలు మరియు ఒప్పందం ముగింపు",
          "డాక్యుమెంటేషన్ మరియు రిజిస్ట్రేషన్ మద్దతు"
        ]
      },
      faqs: {
        en: [
          {
            q: "What documents should I check before buying property?",
            a: "Title deed, approved building plans, completion certificate, NOC from authorities, and tax receipts are essential documents."
          },
          {
            q: "Is real estate a good investment option?",
            a: "Real estate can be a good long-term investment, but it depends on location, market conditions, and your financial goals."
          },
          {
            q: "What are the tax implications of property investment?",
            a: "You can claim deductions on home loan interest, depreciation (for rental property), and long-term capital gains benefits after 2 years."
          }
        ],
        te: [
          {
            q: "ఆస్తి కొనుగోలు చేయడానికి ముందు నేను ఏ పత్రాలను తనిఖీ చేయాలి?",
            a: "టైటిల్ డీడ్, ఆమోదించబడిన భవన ప్రణాళికలు, పూర్తి సర్టిఫికేట్, అధికారుల నుండి NOC, మరియు పన్ను రసీదులు అవసరమైన పత్రాలు."
          },
          {
            q: "రియల్ ఎస్టేట్ మంచి పెట్టుబడి ఎంపికా?",
            a: "రియల్ ఎస్టేట్ మంచి దీర్ఘకాలిక పెట్టుబడి కావచ్చు, కానీ అది స్థానం, మార్కెట్ పరిస్థితులు మరియు మీ ఆర్థిక లక్ష్యాలపై ఆధారపడి ఉంటుంది."
          },
          {
            q: "ఆస్తి పెట్టుబడి యొక్క పన్ను చిక్కులు ఏమిటి?",
            a: "మీరు గృహ రుణ వడ్డీపై, తరుగుదల (అద్దె ఆస్తి కోసం), మరియు 2 సంవత్సరాల తర్వాత దీర్ఘకాలిక మూలధన లాభాల ప్రయోజనాలపై మినహాయింపులను క్లెయిమ్ చేయవచ్చు."
          }
        ]
      }
    },
    4: { // Financial Planning
      overview: {
        en: "Comprehensive financial planning services to help you achieve your life goals through strategic investment and wealth management. Our certified financial planners create personalized strategies for your financial success.",
        te: "వ్యూహాత్మక పెట్టుబడి మరియు సంపద నిర్వహణ ద్వారా మీ జీవిత లక్ష్యాలను సాధించడంలో సహాయపడే సమగ్ర ఆర్థిక ప్రణాళిక సేవలు. మా ధృవీకరించబడిన ఆర్థిక ప్రణాళికాకర్తలు మీ ఆర్థిక విజయం కోసం వ్యక్తిగతీకరించిన వ్యూహాలను రూపొందిస్తారు."
      },
      benefits: {
        en: [
          "Goal-based financial planning",
          "Investment portfolio optimization",
          "Tax planning and optimization",
          "Retirement planning strategies",
          "Children's education planning",
          "Emergency fund creation",
          "Risk assessment and management",
          "Regular portfolio reviews"
        ],
        te: [
          "లక్ష్య-ఆధారిత ఆర్థిక ప్రణాళిక",
          "పెట్టుబడి పోర్ట్‌ఫోలియో ఆప్టిమైజేషన్",
          "పన్ను ప్రణాళిక మరియు ఆప్టిమైజేషన్",
          "పదవీ విరమణ ప్రణాళిక వ్యూహాలు",
          "పిల్లల విద్య ప్రణాళిక",
          "అత్యవసర నిధి సృష్టి",
          "రిస్క్ అంచనా మరియు నిర్వహణ",
          "క్రమం తప్పకుండా పోర్ట్‌ఫోలియో సమీక్షలు"
        ]
      },
      process: {
        en: [
          "Financial health check and goal identification",
          "Risk profiling and investment capacity analysis",
          "Customized financial plan creation",
          "Investment product recommendations",
          "Portfolio implementation and monitoring",
          "Periodic reviews and rebalancing"
        ],
        te: [
          "ఆర్థిక ఆరోగ్య తనిఖీ మరియు లక్ష్య గుర్తింపు",
          "రిస్క్ ప్రొఫైలింగ్ మరియు పెట్టుబడి సామర్థ్య విశ్లేషణ",
          "అనుకూలీకరించిన ఆర్థిక ప్రణాళిక సృష్టి",
          "పెట్టుబడి ఉత్పత్తి సిఫార్సులు",
          "పోర్ట్‌ఫోలియో అమలు మరియు పర్యవేక్షణ",
          "కాలానుగుణ సమీక్షలు మరియు రీబ్యాలెన్సింగ్"
        ]
      },
      faqs: {
        en: [
          {
            q: "When should I start financial planning?",
            a: "The earlier you start, the better. Even in your 20s, starting with small investments can lead to significant wealth creation due to compounding."
          },
          {
            q: "How much should I invest each month?",
            a: "Ideally 20-30% of your income should go towards investments, but this can vary based on your goals and current financial situation."
          },
          {
            q: "What is the role of emergency fund?",
            a: "An emergency fund covering 6-12 months of expenses provides financial security and prevents you from breaking long-term investments during emergencies."
          }
        ],
        te: [
          {
            q: "నేను ఎప్పుడు ఆర్థిక ప్రణాళిక ప్రారంభించాలి?",
            a: "మీరు ఎంత త్వరగా ప్రారంభిస్తే అంత మంచిది. మీ 20వ దశకంలో కూడా, చిన్న పెట్టుబడులతో ప్రారంభించడం కాంపౌండింగ్ కారణంగా గణనీయమైన సంపద సృష్టికి దారితీస్తుంది."
          },
          {
            q: "నేను ప్రతి నెలా ఎంత పెట్టుబడి పెట్టాలి?",
            a: "ఆదర్శవంతంగా మీ ఆదాయంలో 20-30% పెట్టుబడుల వైపు వెళ్లాలి, కానీ ఇది మీ లక్ష్యాలు మరియు ప్రస్తుత ఆర్థిక పరిస్థితిని బట్టి మారవచ్చు."
          },
          {
            q: "అత్యవసర నిధి పాత్ర ఏమిటి?",
            a: "6-12 నెలల ఖర్చులను కవర్ చేసే అత్యవసర నిధి ఆర్థిక భద్రతను అందిస్తుంది మరియు అత్యవసర సమయాల్లో దీర్ఘకాలిక పెట్టుబడులను విచ్ఛిన్నం చేయకుండా నిరోధిస్తుంది."
          }
        ]
      }
    }
  };

  // Default to health insurance if service not found in details
  const currentServiceDetails = serviceDetails[service.id] || serviceDetails[1];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/#services" 
              className="inline-flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'te' ? 'సేవలకు తిరిగి వెళ్లండి' : 'Back to Services'}
            </Link>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <IconComponent className="w-10 h-10 text-blue-700" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {language === 'te' ? service.teTitle : service.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {currentServiceDetails.overview[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'te' ? 'ముख్య ప్రయోజనాలు' : 'Key Benefits'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentServiceDetails.benefits[language].map((benefit, index) => (
              <div key={index} className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'te' ? 'మా ప్రక్రియ' : 'Our Process'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServiceDetails.process[language].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-8">
            {currentServiceDetails.faqs[language].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {language === 'te' ? 'ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {language === 'te' 
              ? `మీ ${service.teTitle} అవసరాలను చర్చించడానికి మా నిపుణులతో ఉచిత సంప్రదింపును షెడ్యూల్ చేయండి.`
              : `Schedule a free consultation with our experts to discuss your ${service.title.toLowerCase()} needs.`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/#contact" 
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-flex items-center justify-center"
            >
              {language === 'te' ? 'ఉచిత సంప్రదింపు పొందండి' : 'Get Free Consultation'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a 
              href="tel:+919876543210"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              {language === 'te' ? 'కాల్ చేయండి' : 'Call Now'}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}