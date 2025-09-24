import React, { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export default function SIPCalculatorPage() {
  const { t } = useLanguage();

  const [sipData, setSipData] = useState({
    monthlyInvestment: 5000,
    expectedReturn: 12,
    investmentPeriod: 10,
    stepUpPercentage: 0
  });

  const calculateSIP = () => {
    const { monthlyInvestment, expectedReturn, investmentPeriod, stepUpPercentage } = sipData;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    let futureValue = 0;
    let totalInvestment = 0;
    let currentMonthlyInvestment = monthlyInvestment;
    
    for (let month = 1; month <= totalMonths; month++) {
      // Step up investment annually
      if (month > 1 && (month - 1) % 12 === 0 && stepUpPercentage > 0) {
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpPercentage / 100);
      }
      
      totalInvestment += currentMonthlyInvestment;
      const remainingMonths = totalMonths - month + 1;
      futureValue += currentMonthlyInvestment * Math.pow(1 + monthlyRate, remainingMonths - 1);
    }
    
    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const calculation = calculateSIP();

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
              {t('calculators.sip.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('calculators.sip.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">SIP Calculator</h3>
                  <p className="opacity-90">Calculate your systematic investment plan returns with step-up options</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Investment Parameters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Investment Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={sipData.monthlyInvestment}
                        onChange={(e) => setSipData({...sipData, monthlyInvestment: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="500"
                        step="500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Annual Return (%)
                      </label>
                      <input
                        type="number"
                        value={sipData.expectedReturn}
                        onChange={(e) => setSipData({...sipData, expectedReturn: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="1"
                        max="30"
                        step="0.5"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Equity mutual funds typically return 10-15% annually over long term
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Period (Years)
                      </label>
                      <input
                        type="number"
                        value={sipData.investmentPeriod}
                        onChange={(e) => setSipData({...sipData, investmentPeriod: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="1"
                        max="50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Step-up (%) - Optional
                      </label>
                      <input
                        type="number"
                        value={sipData.stepUpPercentage}
                        onChange={(e) => setSipData({...sipData, stepUpPercentage: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="0"
                        max="20"
                        step="1"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Increase your SIP amount annually to beat inflation
                      </p>
                    </div>
                  </div>

                  {/* Investment Tips */}
                  <div className="mt-8 bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-900 mb-2">💡 Investment Tips</h5>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Start early to benefit from compounding</li>
                      <li>• Increase SIP amount with salary increments</li>
                      <li>• Stay invested for at least 5-7 years</li>
                      <li>• Don't stop SIP during market downturns</li>
                    </ul>
                  </div>
                </div>

                {/* Results Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Investment Projection</h4>
                  
                  <div className="grid gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                      <div className="text-sm text-green-700 font-medium">Future Value</div>
                      <div className="text-3xl font-bold text-green-800">{formatCurrency(calculation.futureValue)}</div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-700 font-medium">Total Investment</div>
                        <div className="text-xl font-bold text-blue-800">{formatCurrency(calculation.totalInvestment)}</div>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="text-sm text-orange-700 font-medium">Total Returns</div>
                        <div className="text-xl font-bold text-orange-800">{formatCurrency(calculation.totalReturns)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Representation */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-4">Investment Breakdown</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Principal Amount</span>
                        <span className="font-semibold">{((calculation.totalInvestment / calculation.futureValue) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(calculation.totalInvestment / calculation.futureValue) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Returns Generated</span>
                        <span className="font-semibold">{((calculation.totalReturns / calculation.futureValue) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(calculation.totalReturns / calculation.futureValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="text-sm text-purple-700 font-medium">Wealth Multiplier</div>
                      <div className="text-lg font-bold text-purple-800">
                        {(calculation.futureValue / calculation.totalInvestment).toFixed(1)}x
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <div className="text-sm text-indigo-700 font-medium">Monthly Final SIP</div>
                      <div className="text-lg font-bold text-indigo-800">
                        {formatCurrency(sipData.monthlyInvestment * Math.pow(1 + sipData.stepUpPercentage / 100, sipData.investmentPeriod - 1))}
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