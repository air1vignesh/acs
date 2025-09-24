import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as XLSX from 'xlsx';

export default function EducationHub() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const healthSections = [
    {
      id: "introduction",
      enTitle: "Introduction",
      teTitle: "పరిచయం",
      enContent: "Buying insurance is hard, reading a policy document is harder. Many terms and conditions are confusing. This guide explains common features, what they mean, and how they affect you.",
      teContent: "బీమా కొనుగోలు చేయడం కష్టం; పాలసీ డాక్యుమెంటును చదవడం ఇంకా క్లిష్టం. నిబంధనలు చాలా సార్లు గందరగోళంగా ఉంటాయి. ఈ గైడ్ సాధారణ ఫీచర్లు ఏమిటో, వాటి అర్థం ఏమిటో, అవి మీపై ఎలా ప్రభావితం చేస్తాయో వివరిస్తుంది.",
    },
    {
      id: "co-payment",
      enTitle: "Say no to Co-Payment",
      teTitle: "సహ-చెల్లింపు నుండి తప్పించుకోండి",
      enContent: "A co-payment clause may reduce your premium, but when you make a claim, you might end up paying a large proportion of the cost. Unless mandatory or in case of age / pre-existing condition, avoid co-payment if possible.",
      teContent: "ప్రీమియాన్ని తగ్గించుకోవడానికి సహ-చెల్లింపు నిబంధన ఉపయోగపడవచ్చు, కానీ క్లెయిమ్ చేసినప్పుడు మీరు ఎక్కువ భాగాన్ని వ్యక్తిగతంగా చెల్లించవలసి ఉండొచ్చు. తప్పనిసరి కాకపోతే లేదా వయసు/pre-existing రోగాల కేసులు ఉన్నప్పుడు మాత్రమే ఉపయోగించండి.",
    },
    {
      id: "room-rent",
      enTitle: "Room Rent",
      teTitle: "గది అద్దె",
      enContent: "Many policies have caps or limits on room rent. If the policy says the cap is 1% of sum insured, e.g. ₹5,000 per day on a ₹5 lakh cover, then picking a room that costs more means you'll have to pay the difference.",
      teContent: "పాలసీలు గది అద్దెపై పరిమితులు లేదా క్యాపులు పెట్టవచ్చు. ఉదాహరణకు, మీరు ₹5 లక్షల పాలసీ తీసుకున్నప్పుడు గది అద్దెకు 1% క్యాపు అంటే రోజుకు ₹5,000 మాత్రమే. కానీ మీరు ఎక్కువ ఖర్చుతో గది ఎంచుకుంటే మిగతా వ్యత్యాసాన్ని మీరు చెల్లించాలి.",
    },
    {
      id: "disease-limits",
      enTitle: "Disease Wise Sub-Limits",
      teTitle: "వ్యాధి వారీ ఉప-పరిమితులు",
      enContent: "Some policies set sub-limits per disease — even if the sum insured is high, for certain illnesses they will pay only up to a lower amount. Always check if there are disease-wise caps.",
      teContent: "కొన్ని పాలసీలు వ్యాధి వారీగా ఉప-పరిమితులు పెట్టతాయి — మొత్తం బీమా పరిమితి పెద్దది అయినా కొన్ని వ్యాధులతో సంబంధం ఉన్నప్పుడు బీమా బాధ్యత తక్కువ మొత్తానికి మాత్రమే ఉంటుంది. వ్యాధి-వారీ క్యాపులు ఉన్నాయా చూడండి.",
    },
    {
      id: "waiting-periods",
      enTitle: "Waiting Periods",
      teTitle: "వేచి కాలాలు",
      enContent: "If you have pre-existing conditions, insurers often require you to wait for 2–4 years before those are covered. Also, after policy start, some treatments may not be covered until waiting periods expire. Choose policies with shorter waiting periods where possible.",
      teContent: "మీకు ముందుగా ఉన్న వ్యాధులున్నట్లయితే, బీమా సంస్థలు అవి కవర్ అయ్యే ముందు 2–4 సంవత్సరాల వేచి ఉండాలి అని కోరుతాయి. పాలసీ ప్రారంభం తర్వాత కూడా కొన్ని చికిత్సలు వేచి కాలం ముగిసేవరకు కవర్ అవ్వవు. వీలైతే చిన్న వేచి కాలాలున్న పాలసీలు ఎంచుకోండి.",
    },
    {
      id: "pre-post-hospitalization",
      enTitle: "Pre & Post Hospitalization",
      teTitle: "ఆసుపత్రి చేరికకు ముందు & తరువాత",
      enContent: "Medical tests before admission and follow-ups after discharge can cost a lot. Good policies cover both pre-hospitalization and post-hospitalization expenses (like diagnostics, medicines).",
      teContent: "ఆసుపత్రిలో చేరే ముందు పరీక్షలు, డిశ్చార్జి తర్వాత చికిత్సలు ఖరీదైనవి. మంచి పాలసీలు రెండు — ఆసుపత్రి చేరికకు ముందు & తరువాత ఖర్చులను కూడా కవర్ చేస్తాయి.",
    },
    {
      id: "restoration",
      enTitle: "Restoration Benefit",
      teTitle: "పునరుద్ధరణ ప్రయోజనం",
      enContent: "If you make a claim, the sum insured reduces. Restoration benefit restores the full cover (or part thereof) after claim so you're covered again. Important especially in comprehensive or family policies.",
      teContent: "మీరు క్లెయిమ్ చేసినప్పుడు బీమా పరిమితి తగ్గిపోతుంది. రెస్టొరేషన్ ప్రయోజనంతో క్లెయిమ్ తర్వాత పరిమితి మళ్ళీ రీసెట్ అవుతుంది. కుటుంబ పాలసీలలో ఇది ముఖ్యమైనది.",
    },
    {
      id: "day-care",
      enTitle: "Day Care Treatments",
      teTitle: "డే కేర్ చికిత్సలు",
      enContent: "Treatments that don't need 24-hour hospitalization (appendicitis, dialysis, etc) often cost a lot but are excluded in some policies. Pick a plan that includes daycare treatments.",
      teContent: "24 గంటల ఆసుపత్రి చేరిక అవసరం లేని చికిత్సలు (ఉదా: డయాలసిస్) ఖరీదైనవి, కానీ కొన్ని పాలసీలలో ఇవి ఉండకపోవచ్చు. డే-కేర్ చికిత్సలను కవర్ చేసేది ఎంచుకోండి.",
    },
    {
      id: "domiciliary",
      enTitle: "Domiciliary Expense",
      teTitle: "డోమిసిలియరీ ఖర్చులు",
      enContent: "If hospitalization isn't possible (lack of hospital bed, etc), treatment at home may be covered. This helps in emergencies or during crises like pandemics. Not all policies provide it.",
      teContent: "ఆసుపత్రిలో చేరడం సాధ్యం కాకపోతే, ఇంట్లో చికిత్స నిర్వహించేందుకు ఖర్చులు కవర్ చేయబడవచ్చు. అన్ని పాలసీలు ఇది ఇవ్వవు.",
    },
    {
      id: "no-claim-bonus",
      enTitle: "No Claim Bonus",
      teTitle: "నో-క్లెయిమ్ బోనస్",
      enContent: "If you don't make any claims in a policy year, insurers may increase your sum insured or give bonus benefits. But check how big the bonus is and whether it resets after a claim.",
      teContent: "పాలసీ సంవత్సరంలో క్లెయిమ్ చేయకపోతే, బీమా పరిమితిని పెంచవచ్చును లేదా బోనస్ ఇవ్వవచ్చు. కానీ బోనస్ ఎంత ఉందో, క్లెయిమ్ తర్వాత అది రీసెట్ అవుతుందా అనేది చూడాలి.",
    },
    {
      id: "checkups",
      enTitle: "Free Health Checkups",
      teTitle: "ఉచిత ఆరోగ్య పరీక్షలు",
      enContent: "Some plans offer free checkups yearly or bi-annually. They help catch issues early. Even if checkups cost little, over time without such benefit it adds up.",
      teContent: "కొన్ని పాలసీలలో వార్షికంగా ఉచిత ఆరోగ్య పరీక్షలు ఉంటాయి. ఇవి సమస్యలు ముందుగా గుర్తు చేసుకోవడానికి సహాయపడతాయి.",
    },
    {
      id: "alternative",
      enTitle: "Alternative Treatments",
      teTitle: "ప్రత్యామ్నాయ చికిత్సలు",
      enContent: "Treatments like Ayurveda, Homeopathy, etc (Ayush systems) may or may not be covered. If covered, only in certified facilities. Check whether your policy includes them.",
      teContent: "ఆయుర్వేదం, హోమియోపతి మొదలైనవి ఉండవచ్చు లేదా ఉండకపోవచ్చు. ఉంటే సర్టిఫైడ్ కేంద్రాలలో మాత్రమే ఉంటుంది. మీ పాలసీ వీటిని కవర్ చేస్తుందా అని చూడండి.",
    },
  ];

  const termSections = [
    {
      id: "term-intro",
      enTitle: "Introduction",
      teTitle: "పరిచయం",
      enContent: "Term life insurance is a pure protection plan that provides financial security to your family in case of your untimely demise. It offers high coverage at low premiums and is essential for anyone with dependents.",
      teContent: "టర్మ్ లైఫ్ ఇన్సూరెన్స్ అనేది ఒక స్వచ్ఛమైన రక్షణ ప్లాన్, ఇది మీ అకాల మరణం విషయంలో మీ కుటుంబానికి ఆర్థిక భద్రతను అందిస్తుంది. ఇది తక్కువ ప్రీమియంలకు అధిక కవరేజీని అందిస్తుంది మరియు ఆధారితులు ఉన్న ఎవరికైనా అవసరమైనది.",
    },
    {
      id: "sum-assured",
      enTitle: "Sum Assured",
      teTitle: "సమ్ అష్యూర్డ్",
      enContent: "The sum assured is the amount paid to your nominees upon your death. Calculate it based on your annual income, expenses, liabilities, and future goals. A common rule is 10-20 times your annual income.",
      teContent: "సమ్ అష్యూర్డ్ అనేది మీ మరణం తర్వాత మీ నామినీలకు చెల్లించబడే మొత్తం. మీ వార్షిక ఆదాయం, ఖర్చులు, బాధ్యతలు, భవిష్యత్ లక్ష్యాల ఆధారంగా దీనిని లెక్కించండి. సాధారణ నియమం మీ వార్షిక ఆదాయం యొక్క 10-20 రెట్లు.",
    },
    {
      id: "policy-term",
      enTitle: "Policy Term",
      teTitle: "పాలసీ టర్మ్",
      enContent: "The duration for which the policy provides coverage. Choose a term that covers you until retirement or until your dependents become financially independent, typically 20-40 years.",
      teContent: "పాలసీ కవరేజీ అందించే కాలపరిమితి. మీ రిటైర్మెంట్ వరకు లేదా మీ ఆధారితులు ఆర్థికంగా స్వతంత్రులు అయ్యే వరకు కవర్ చేసే టర్మ్ ను ఎంచుకోండి, సాధారణంగా 20-40 సంవత్సరాలు.",
    },
    {
      id: "premium-options",
      enTitle: "Premium Payment Options",
      teTitle: "ప్రీమియం చెల్లింపు ఆప్షన్లు",
      enContent: "Term plans offer flexibility in premium payments: single pay, regular pay (monthly, quarterly, annually). Choose based on your cash flow. Premiums are lower for younger, healthier individuals.",
      teContent: "టర్మ్ ప్లాన్లు ప్రీమియం చెల్లింపులలో ఫ్లెక్సిబిలిటీని అందిస్తాయి: సింగిల్ పే, రెగ్యులర్ పే (నెలవారీ, త్రైమాసిక, వార్షిక). మీ క్యాష్ ఫ్లో ఆధారంగా ఎంచుకోండి. యువ, ఆరోగ్యవంతులకు ప్రీమియంలు తక్కువ.",
    },
    {
      id: "riders",
      enTitle: "Riders and Add-Ons",
      teTitle: "రైడర్లు మరియు ఆడ్-ఆన్లు",
      enContent: "Additional benefits like critical illness cover, accidental death benefit, waiver of premium. They enhance protection but increase the premium. Select riders that match your needs.",
      teContent: "క్రిటికల్ ఇల్నెస్ కవర్, యాక్సిడెంటల్ డెత్ బెనిఫిట్, వేవర్ ఆఫ్ ప్రీమియం వంటి అదనపు బెనిఫిట్లు. అవి రక్షణను పెంచుతాయి కానీ ప్రీమియంను పెంచుతాయి. మీ అవసరాలకు సరిపోయే రైడర్లను ఎంచుకోండి.",
    },
    {
      id: "claim-settlement",
      enTitle: "Claim Settlement Ratio",
      teTitle: "క్లెయిమ్ సెటిల్మెంట్ రేషియో",
      enContent: "The percentage of claims settled by the insurer. Choose companies with high CSR (above 95%) for reliability. Check IRDAI reports for latest data.",
      teContent: "ఇన్సూరర్ చేత సెటిల్ చేయబడిన క్లెయిమ్ల శాతం. నమ్మకమైనది కోసం అధిక CSR (95% పైన) ఉన్న కంపెనీలను ఎంచుకోండి. లేటెస్ట్ డేటా కోసం IRDAI రిపోర్ట్లను చెక్ చేయండి.",
    },
    {
      id: "tax-benefits",
      enTitle: "Tax Benefits",
      teTitle: "టాక్స్ బెనిఫిట్లు",
      enContent: "Premiums paid are deductible under Section 80C up to ₹1.5 lakh. Death benefit is tax-free under Section 10(10D). This makes term insurance tax-efficient.",
      teContent: "చెల్లించిన ప్రీమియంలు సెక్షన్ 80C కింద ₹1.5 లక్షల వరకు డిడక్టబుల్. డెత్ బెనిఫిట్ సెక్షన్ 10(10D) కింద టాక్స్-ఫ్రీ. ఇది టర్మ్ ఇన్సూరెన్స్ ను టాక్స్-ఎఫిషియంట్ చేస్తుంది.",
    },
    {
      id: "exclusions",
      enTitle: "Exclusions and Waiting Periods",
      teTitle: "ఎక్స్‌క్లూజన్లు మరియు వేటింగ్ పీరియడ్లు",
      enContent: "Common exclusions: suicide within first year, death due to adventure sports, war. Some plans have waiting periods for certain causes. Read the fine print carefully.",
      teContent: "సాధారణ ఎక్స్‌క్లూజన్లు: మొదటి సంవత్సరంలో ఆత్మహత్య, అడ్వెంచర్ స్పోర్ట్స్ వల్ల మరణం, యుద్ధం. కొన్ని ప్లాన్లు నిర్దిష్ట కారణాలకు వేటింగ్ పీరియడ్లు ఉంటాయి. ఫైన్ ప్రింట్ ను జాగ్రత్తగా చదవండి.",
    },
    {
      id: "types",
      enTitle: "Types of Term Plans",
      teTitle: "టర్మ్ ప్లాన్ల రకాలు",
      enContent: "Level term: fixed sum assured. Increasing term: coverage increases over time. Decreasing term: coverage decreases, suitable for loans. Return of premium: premiums refunded if you survive the term.",
      teContent: "లెవల్ టర్మ్: ఫిక్స్డ్ సమ్ అష్యూర్డ్. ఇన్‌క్రీసింగ్ టర్మ్: కవరేజ్ కాలక్రమేణా పెరుగుతుంది. డిక్రీసింగ్ టర్మ్: కవరేజ్ తగ్గుతుంది, లోన్లకు సూటబుల్. రిటర్న్ ఆఫ్ ప్రీమియం: మీరు టర్మ్ సర్వైవ్ చేస్తే ప్రీమియంలు రిఫండ్.",
    },
    {
      id: "insurer-reliability",
      enTitle: "Insurer's Reliability",
      teTitle: "ఇన్సూరర్ యొక్క నమ్మకమైనత",
      enContent: "Choose established insurers with good solvency ratio, customer service, and digital processes. Compare multiple plans online for best fit.",
      teContent: "మంచి సాల్వెన్సీ రేషియో, కస్టమర్ సర్వీస్, డిజిటల్ ప్రాసెస్‌లు ఉన్న స్థాపిత ఇన్సూరర్లను ఎంచుకోండి. బెస్ట్ ఫిట్ కోసం ఆన్‌లైన్‌లో మల్టిపుల్ ప్లాన్లను కంపేర్ చేయండి.",
    },
  ];

  const guides = {
    health: {
      titleEn: "Health Insurance Guide",
      titleTe: "హెల్త్ ఇన్సూరెన్స్ గైడ్",
      data: healthSections,
    },
    term: {
      titleEn: "Term Insurance Guide",
      titleTe: "టర్మ్ ఇన్సూరెన్స్ గైడ్",
      data: termSections,
    },
  };

  const [selectedGuide, setSelectedGuide] = useState<'health' | 'term'>('health');
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [healthTables, setHealthTables] = useState<JSX.Element[]>([]);
  const [lifeTables, setLifeTables] = useState<JSX.Element[]>([]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
    );

    guides[selectedGuide].data.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [selectedGuide]);

  useEffect(() => {
    scrollToSection(activeSection);
  }, [selectedGuide]);

  const renderHealthExcel = async (url: string, setter: React.Dispatch<React.SetStateAction<JSX.Element[]>>) => {
    try {
      const res = await fetch(url);
      const data = await res.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetTables = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows: (string | number | null)[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          raw: true
        });

        return (
          <div key={sheetName} className="mb-8">
            <h3 className="text-lg font-bold mb-2">{sheetName}</h3>
            <div className="overflow-x-auto">
              <table className="border border-blue-600 w-full">
                <thead>
                  <tr>
                    {rows[0].map((header, j) => (
                      <th key={j} className="bg-blue-600 text-white px-4 py-2 border border-blue-600">
                        {header?.toString()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="border border-blue-600 px-4 py-2 text-sm"
                        >
                          {cell !== null ? cell.toString() : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      });

      setter(sheetTables);
    } catch (err) {
      console.error('Error loading Health Insurance Excel:', err);
    }
  };

  const renderLifeExcel = async (url: string, setter: React.Dispatch<React.SetStateAction<JSX.Element[]>>) => {
    try {
      const res = await fetch(url);
      const data = await res.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetTables = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows: (string | number | null)[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          raw: true
        });

        return (
          <div key={sheetName} className="mb-8">
            <h3 className="text-lg font-bold mb-2">{sheetName}</h3>
            <div className="overflow-x-auto">
              <table className="border border-blue-600 w-full">
                <thead>
                  <tr>
                    {rows[0].map((header, j) => (
                      <th key={j} className="bg-blue-600 text-white px-4 py-2 border border-blue-600">
                        {header?.toString()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => {
                        let displayValue: string | number | null = cell;

                        if (i > 0 && typeof cell === 'number') {
                          if (j === 2) {
                            displayValue = (cell * 100).toFixed(2) + '%';
                          } else if (j === 3) {
                            displayValue = cell.toFixed(1) + '%';
                          } else if (j === 4 || j === 5) {
                            displayValue = cell.toLocaleString();
                          }
                        }

                        return (
                          <td
                            key={j}
                            className="border border-blue-600 px-4 py-2 text-sm"
                          >
                            {displayValue !== null ? displayValue.toString() : ''}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      });

      setter(sheetTables);
    } catch (err) {
      console.error('Error loading Life Insurance Excel:', err);
    }
  };

  useEffect(() => {
    renderHealthExcel('/data/top_10_health_insurance_companies_india_2025.xlsx', setHealthTables);
    renderLifeExcel('/data/top_10_life_insurance_companies_2025.xlsx', setLifeTables);
  }, []);

  return (
    <>
      <Header />
      <section className="py-8 sm:py-12 bg-gray-50 min-h-screen">
        {/* Mobile Guide Selector */}
        <div className="md:hidden mb-6 px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex justify-between items-center px-4 py-3 bg-white rounded-lg shadow border border-gray-200"
          >
            <span className="font-medium">
              {isEnglish ? guides[selectedGuide].titleEn : guides[selectedGuide].titleTe}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {isMobileMenuOpen && (
            <div className="mt-1 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <button
                onClick={() => {
                  setSelectedGuide("health");
                  setIsMobileMenuOpen(false);
                  setActiveSection("introduction");
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 rounded-t-lg ${
                  selectedGuide === "health" ? "bg-blue-50 text-blue-700 font-semibold" : ""
                }`}
              >
                {isEnglish ? "Health Insurance" : "హెల్త్ ఇన్సూరెన్స్"}
              </button>
              <button
                onClick={() => {
                  setSelectedGuide("term");
                  setIsMobileMenuOpen(false);
                  setActiveSection("term-intro");
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 rounded-b-lg ${
                  selectedGuide === "term" ? "bg-blue-50 text-blue-700 font-semibold" : ""
                }`}
              >
                {isEnglish ? "Term Insurance" : "టర్మ్ ఇన్సూరెన్స్"}
              </button>
            </div>
          )}
        </div>

        {/* Desktop Guide Selector */}
        <div className="hidden md:flex justify-center mb-8 space-x-4">
          <button
            onClick={() => {
              setSelectedGuide("health");
              setActiveSection("introduction");
            }}
            className={`px-4 py-2 rounded-lg font-semibold border transition ${
              selectedGuide === "health"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {isEnglish ? "Health Insurance" : "హెల్త్ ఇన్సూరెన్స్"}
          </button>
          <button
            onClick={() => {
              setSelectedGuide("term");
              setActiveSection("term-intro");
            }}
            className={`px-4 py-2 rounded-lg font-semibold border transition ${
              selectedGuide === "term"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {isEnglish ? "Term Insurance" : "టర్మ్ ఇన్సూరెన్స్"}
          </button>
        </div>

        {/* Tables Section */}
        {selectedGuide === 'health' && (
          <div className="mb-12 px-4 md:px-0">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {isEnglish ? "Top 10 Health Insurance Companies (2025)" : "టాప్ 10 హెల్త్ ఇన్సూరెన్స్ కంపెనీలు (2025)"}
            </h3>
            {healthTables.length > 0 ? healthTables : <p>{isEnglish ? "Loading..." : "లోడింగ్..."}</p>}
          </div>
        )}
        {selectedGuide === 'term' && (
          <div className="mb-12 px-4 md:px-0">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {isEnglish ? "Top 10 Life Insurance Companies (2025)" : "టాప్ 10 లైఫ్ ఇన్సూరెన్స్ కంపెనీలు (2025)"}
            </h3>
            {lifeTables.length > 0 ? lifeTables : <p>{isEnglish ? "Loading..." : "లోడింగ్..."}</p>}
          </div>
        )}

        <div className="flex relative">
          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
          >
            <Menu size={20} />
          </button>

          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            w-64 pr-6 border-r border-gray-200 transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:bg-transparent md:z-auto
            fixed top-0 left-0 h-full bg-white z-50 pt-16 px-4
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-3 mt-4 md:mt-0">
              {isEnglish ? "Sections" : "విభాగాలు"}
            </h2>
            <nav className="space-y-1 sticky top-20 max-h-[70vh] overflow-y-auto">
              {guides[selectedGuide].data.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`relative block w-full text-left px-3 py-2 rounded-md transition text-sm sm:text-base ${
                    activeSection === sec.id
                      ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {isEnglish ? sec.enTitle : sec.teTitle}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-8 prose prose-blue max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
              {isEnglish ? guides[selectedGuide].titleEn : guides[selectedGuide].titleTe}
            </h2>
            {guides[selectedGuide].data.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className={`mb-8 sm:mb-10 scroll-mt-32 p-4 rounded-lg transition-colors ${
                  activeSection === sec.id
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : "bg-transparent"
                }`}
              >
                <h3
                  className={`font-bold text-xl sm:text-2xl mb-4 ${
                    activeSection === sec.id ? "text-blue-700" : ""
                  }`}
                >
                  {isEnglish ? sec.enTitle : sec.teTitle}
                </h3>
                <div className="text-sm sm:text-base leading-relaxed">
                  <ReactMarkdown>
                    {isEnglish ? sec.enContent : sec.teContent}
                  </ReactMarkdown>
                </div>
              </section>
            ))}
          </main>
        </div>

        {/* Mobile Bottom Navigation (Optional - Alternative approach) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                const currentIndex = guides[selectedGuide].data.findIndex(
                  sec => sec.id === activeSection
                );
                if (currentIndex > 0) {
                  scrollToSection(guides[selectedGuide].data[currentIndex - 1].id);
                }
              }}
              disabled={guides[selectedGuide].data.findIndex(sec => sec.id === activeSection) === 0}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnglish ? "Previous" : "మునుపటిది"}
            </button>
            
            <span className="text-sm text-gray-600 px-2">
              {guides[selectedGuide].data.findIndex(sec => sec.id === activeSection) + 1} / {guides[selectedGuide].data.length}
            </span>
            
            <button
              onClick={() => {
                const currentIndex = guides[selectedGuide].data.findIndex(
                  sec => sec.id === activeSection
                );
                if (currentIndex < guides[selectedGuide].data.length - 1) {
                  scrollToSection(guides[selectedGuide].data[currentIndex + 1].id);
                }
              }}
              disabled={guides[selectedGuide].data.findIndex(sec => sec.id === activeSection) === guides[selectedGuide].data.length - 1}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnglish ? "Next" : "తదుపరి"}
            </button>
          </div>
        </div>

        {/* Add bottom padding to account for mobile navigation */}
        <div className="md:hidden h-20"></div>
      </section>
      <Footer />
    </>
  );
}