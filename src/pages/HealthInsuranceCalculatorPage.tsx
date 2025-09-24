import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export default function HealthInsuranceCalculatorPage() {
  const { t } = useLanguage();

  // Health Insurance Calculator States
  const [healthData, setHealthData] = useState({
    income: 50000,
    expenses: 30000,
    savings: 100000,
    cover: 300000,
    copay: 0,
    surgery: 0,
    rate: 12
  });

  const surgeries = [
    {name: "Coronary Artery Bypass Grafting (CABG)", cost: 450000},
    {name: "Angioplasty (single stent)", cost: 350000},
    {name: "Heart Valve Replacement", cost: 570000},
    {name: "Heart Transplant", cost: 3400000},
    {name: "TAVI/TAVR Procedure", cost: 2800000},
    {name: "Pacemaker Implantation", cost: 450000},
    {name: "Coronary Angiogram", cost: 60000},
    {name: "Knee Replacement Surgery", cost: 500000},
    {name: "Hip Replacement Surgery", cost: 400000},
    {name: "Spinal Fusion Surgery", cost: 820000}
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const calculateHealthRisk = () => {
    const { income, expenses, savings, cover, copay, surgery, rate } = healthData;
    const selectedSurgery = surgeries[surgery];
    const surgeryyCost = selectedSurgery.cost;
    const copayPct = copay / 100;
    
    // Insurance payout after co-pay
    const insurancePay = Math.max(0, Math.min(cover, surgeryyCost) * (1 - copayPct));
    const outOfPocket = Math.max(0, surgeryyCost - insurancePay);
    const debt = Math.max(0, outOfPocket - savings);
    const capacity = income - expenses;
    const monthlyRate = (rate / 100) / 12;
    
    let monthsSimple = debt === 0 ? 0 : capacity <= 0 ? 'N/A' : Math.ceil(debt / capacity);
    
    let monthsEmi = '—';
    let totalInterest = '—';
    
    if (debt === 0) {
      monthsEmi = 0;
      totalInterest = 0;
    } else if (capacity <= 0) {
      monthsEmi = 'N/A';
      totalInterest = 'N/A';
    } else if (monthlyRate === 0) {
      monthsEmi = Math.ceil(debt / capacity);
      totalInterest = 0;
    } else {
      const interestOnly = monthlyRate * debt;
      if (capacity <= interestOnly) {
        monthsEmi = 'Not repayable';
        totalInterest = 'N/A';
      } else {
        const x = capacity / (capacity - interestOnly);
        const n = Math.log(x) / Math.log(1 + monthlyRate);
        monthsEmi = Math.ceil(n);
        totalInterest = Math.max(0, capacity * monthsEmi - debt);
      }
    }
    
    const riskIndex = income > 0 ? Math.max(0, Math.round(((outOfPocket - savings) / income) * 100)) : 100;
    
    return {
      surgeryyCost,
      outOfPocket,
      debt,
      capacity,
      monthsSimple,
      monthsEmi,
      totalInterest,
      riskIndex
    };
  };

  const getRiskLevel = (riskIndex) => {
    if (riskIndex >= 66) return { level: 'High Risk', color: 'bg-red-100 text-red-800 border-red-200' };
    if (riskIndex >= 33) return { level: 'Moderate Risk', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { level: 'Low Risk', color: 'bg-green-100 text-green-800 border-green-200' };
  };

  const getAdvice = (calculation) => {
    if (calculation.debt === 0) return 'You can cover this event from savings/insurance.';
    if (calculation.capacity <= 0) return 'Your monthly expenses meet or exceed income. Consider boosting insurance cover.';
    if (typeof calculation.monthsEmi === 'string') return 'Your repayment capacity is too low to amortize this debt.';
    return 'Prioritize higher cover or lower co-pay to reduce out-of-pocket expenses.';
  };

  const resetHealthCalculator = () => {
    setHealthData({
      income: 50000,
      expenses: 30000,
      savings: 100000,
      cover: 300000,
      copay: 0,
      surgery: 0,
      rate: 12
    });
  };

  const calculation = calculateHealthRisk();
  const riskInfo = getRiskLevel(calculation.riskIndex);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/calculators" 
              className="inline-flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('nav.back')}
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('calculators.health.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('calculators.health.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Health Insurance Risk Calculator</h3>
                  <p className="opacity-90">Estimate your out-of-pocket exposure and debt requirements for medical emergencies</p>
                </div>
                <button
                  onClick={resetHealthCalculator}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Input Parameters</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Income (₹)
                      </label>
                      <input
                        type="number"
                        value={healthData.income}
                        onChange={(e) => setHealthData({...healthData, income: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Expenses (₹)
                      </label>
                      <input
                        type="number"
                        value={healthData.expenses}
                        onChange={(e) => setHealthData({...healthData, expenses: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Savings (₹)
                      </label>
                      <input
                        type="number"
                        value={healthData.savings}
                        onChange={(e) => setHealthData({...healthData, savings: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Cover (₹)
                      </label>
                      <input
                        type="number"
                        value={healthData.cover}
                        onChange={(e) => setHealthData({...healthData, cover: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Co-pay % (Corporate Insurance)
                      </label>
                      <input
                        type="number"
                        value={healthData.copay}
                        onChange={(e) => setHealthData({...healthData, copay: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        value={healthData.rate}
                        onChange={(e) => setHealthData({...healthData, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Surgery/Procedure
                    </label>
                    <select
                      value={healthData.surgery}
                      onChange={(e) => setHealthData({...healthData, surgery: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {surgeries.map((surgery, index) => (
                        <option key={index} value={index}>{surgery.name}</option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-600 mt-1">
                      Cost will be auto-filled as the maximum cost of the chosen procedure.
                    </p>
                  </div>
                </div>

                {/* Results Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Risk Analysis</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${riskInfo.color}`}>
                      {riskInfo.level}
                    </span>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Surgery Cost</div>
                        <div className="text-xl font-bold text-gray-900">{formatCurrency(calculation.surgeryyCost)}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Out-of-Pocket</div>
                        <div className="text-xl font-bold text-red-600">{formatCurrency(calculation.outOfPocket)}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Debt Needed</div>
                        <div className="text-xl font-bold text-orange-600">{formatCurrency(calculation.debt)}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Repayment Capacity</div>
                        <div className="text-xl font-bold text-green-600">{formatCurrency(calculation.capacity)}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Months (Simple)</div>
                        <div className="text-xl font-bold text-blue-600">{calculation.monthsSimple}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Months (EMI-based)</div>
                        <div className="text-xl font-bold text-purple-600">{calculation.monthsEmi}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Interest</div>
                        <div className="text-xl font-bold text-red-500">
                          {typeof calculation.totalInterest === 'number' ? formatCurrency(calculation.totalInterest) : calculation.totalInterest}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Risk Index</div>
                        <div className="text-xl font-bold text-gray-900">{calculation.riskIndex} / 100</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900">Recommendation</div>
                          <p className="text-sm text-blue-800">{getAdvice(calculation)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}