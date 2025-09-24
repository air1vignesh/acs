import React, { useState, useEffect, useRef } from "react";
import { 
  Lightbulb, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  Calculator,
  TrendingUp,
  Shield,
  Heart,
  DollarSign,
  Users,
  Home,
  Briefcase,
  PieChart,
  Target,
  Clock,
  Award
} from "lucide-react";
import Header from "../components/Header"; // Replace with your actual Header component import path
import Footer from "../components/Footer"; // Replace with your actual Footer component import path

export default function EnhancedLifeInsuranceCalculator() {
  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const contentRef = useRef(null); // Reference to the content container

  // Basic Information
  const [age, setAge] = useState(32);
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [dependents, setDependents] = useState(3);
  const [monthlyExpenses, setMonthlyExpenses] = useState(45000);
  const [occupation, setOccupation] = useState("Software Engineer");
  const [workingYearsLeft, setWorkingYearsLeft] = useState(28);

  // Family Details
  const [spouseAge, setSpouseAge] = useState(29);
  const [spouseIncome, setSpouseIncome] = useState(40000);
  const [spouseWorking, setSpouseWorking] = useState(true);
  const [childrenAgesStr, setChildrenAgesStr] = useState("8,5");
  const [elderlyParents, setElderlyParents] = useState(2);
  const [parentsMedicalExpenses, setParentsMedicalExpenses] = useState(3000);
  const [parentsAge, setParentsAge] = useState("65,62");

  // Financial Portfolio
  const [businessIncome, setBusinessIncome] = useState(0);
  const [rentIncome, setRentIncome] = useState(8000);
  const [homeLoan, setHomeLoan] = useState(2500000);
  const [personalLoans, setPersonalLoans] = useState(500000);
  const [carLoan, setCarLoan] = useState(800000);
  const [creditCardDebt, setCreditCardDebt] = useState(150000);
  const [mutualFunds, setMutualFunds] = useState(800000);
  const [stocks, setStocks] = useState(300000);
  const [fixedDeposits, setFixedDeposits] = useState(400000);
  const [ppf, setPpf] = useState(200000);
  const [goldJewellery, setGoldJewellery] = useState(600000);
  const [propertyValue, setPropertyValue] = useState(4500000);
  const [emergencyFund, setEmergencyFund] = useState(200000);

  // Coverage & Preferences
  const [currentLifeInsurance, setCurrentLifeInsurance] = useState(1500000);
  const [currentHealthInsurance, setCurrentHealthInsurance] = useState(800000);
  const [employerInsurance, setEmployerInsurance] = useState(500000);
  const [riskProfile, setRiskProfile] = useState("Moderate");
  const [lifestyle, setLifestyle] = useState("Moderate");
  const [healthStatus, setHealthStatus] = useState("Good");
  const [smokingStatus, setSmokingStatus] = useState("Non-Smoker");
  const [retirementAge, setRetirementAge] = useState(58);
  const [inflationRate, setInflationRate] = useState(6.5);
  const [expectedReturns, setExpectedReturns] = useState(10);
  const [salaryGrowthRate, setSalaryGrowthRate] = useState(7);

  // Advanced Goals
  const [childHigherEducationGoal, setChildHigherEducationGoal] = useState(true);
  const [childMarriageGoal, setChildMarriageGoal] = useState(true);
  const [dreamHomeGoal, setDreamHomeGoal] = useState(false);
  const [businessGoal, setBusinessGoal] = useState(false);
  const [travelGoal, setTravelGoal] = useState(true);

  const parseNumber = (v) => v === "" || v === null || isNaN(Number(v)) ? 0 : Number(v);

  function parseAges(str) {
    if (!str) return [];
    return str
      .split(/[,;\s]+/)
      .map(s => s.trim())
      .filter(s => s !== "" && !isNaN(Number(s)))
      .map(n => Number(n));
  }

  // Enhanced validation
  function validateStep(currentStep) {
    const errors = {};
    
    switch(currentStep) {
      case 1:
        if (age < 18 || age > 65) errors.age = "Age must be between 18-65";
        if (monthlyIncome < 10000) errors.monthlyIncome = "Monthly income seems too low";
        if (monthlyExpenses >= monthlyIncome) errors.monthlyExpenses = "Expenses cannot exceed income";
        break;
      case 2:
        if (spouseAge && (spouseAge < 18 || spouseAge > 65)) errors.spouseAge = "Spouse age must be between 18-65";
        if (elderlyParents < 0 || elderlyParents > 4) errors.elderlyParents = "Invalid number of elderly parents";
        break;
      case 3:
        const totalLoans = parseNumber(homeLoan) + parseNumber(personalLoans) + parseNumber(carLoan) + parseNumber(creditCardDebt);
        const annualIncome = parseNumber(monthlyIncome) * 12;
        if (totalLoans > annualIncome * 5) errors.loans = "Total loans seem very high relative to income";
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Scroll to top of content
  const scrollToContentTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle navigation with validation and scroll
  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 5) {
        setStep(step + 1);
        scrollToContentTop();
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      scrollToContentTop();
    }
  };

  // Handle step indicator click
  const handleStepClick = (targetStep) => {
    // Validate all previous steps up to the target step
    for (let i = step; i <= targetStep && i < 5; i++) {
      if (!validateStep(i)) {
        setStep(i); // Go to the first invalid step
        scrollToContentTop();
        return;
      }
    }
    setStep(targetStep);
    scrollToContentTop();
  };

  // Enhanced computation with more sophisticated calculations
  function computeAdvanced() {
    const primaryAnnualIncome = parseNumber(monthlyIncome) * 12;
    const spouseAnnualIncome = spouseWorking ? parseNumber(spouseIncome) * 12 : 0;
    const otherIncome = parseNumber(businessIncome) + parseNumber(rentIncome) * 12;
    const totalAnnualIncome = primaryAnnualIncome + spouseAnnualIncome + otherIncome;

    const yearsToRetire = Math.max(0, retirementAge - age);
    const inflation = inflationRate / 100;
    const returns = expectedReturns / 100;
    const salaryGrowth = salaryGrowthRate / 100;
    
    // More sophisticated Human Life Value calculation
    let humanLifeValue = 0;
    if (yearsToRetire > 0) {
      // Account for salary growth and inflation
      const realGrowthRate = ((1 + salaryGrowth) / (1 + inflation)) - 1;
      const discountRate = ((1 + returns) / (1 + inflation)) - 1;
      
      if (Math.abs(discountRate - realGrowthRate) < 1e-6) {
        humanLifeValue = totalAnnualIncome * yearsToRetire;
      } else {
        // Present value of growing annuity
        const factor1 = Math.pow(1 + realGrowthRate, yearsToRetire);
        const factor2 = Math.pow(1 + discountRate, yearsToRetire);
        humanLifeValue = totalAnnualIncome * (factor1 - factor2) / ((realGrowthRate - discountRate) * factor2);
      }
    }

    // Comprehensive liabilities
    const totalLiabilities = parseNumber(homeLoan) + parseNumber(personalLoans) + 
                           parseNumber(carLoan) + parseNumber(creditCardDebt);

    // Enhanced children's future costs
    const childrenAges = parseAges(childrenAgesStr);
    let childrenFutureCost = 0;
    
    childrenAges.forEach(childAge => {
      // Education costs
      const yearsToGraduation = Math.max(0, 22 - childAge);
      const currentEducationCost = 2500000; // Higher education cost
      const futureEducationCost = currentEducationCost * Math.pow(1 + inflation, yearsToGraduation);
      
      // Marriage costs (if goal is selected)
      let marriageCost = 0;
      if (childMarriageGoal && childAge < 25) {
        const yearsToMarriage = Math.max(0, 25 - childAge);
        marriageCost = 1500000 * Math.pow(1 + inflation, yearsToMarriage);
      }
      
      childrenFutureCost += futureEducationCost + marriageCost;
    });

    // Enhanced parent care costs
    const parentAges = parseAges(parentsAge);
    let parentCareCost = 0;
    if (elderlyParents > 0 && parentAges.length > 0) {
      const avgParentAge = parentAges.reduce((a, b) => a + b, 0) / parentAges.length;
      const yearsOfCare = Math.max(0, 80 - avgParentAge);
      const annualMedicalCost = parseNumber(parentsMedicalExpenses) * 12;
      parentCareCost = annualMedicalCost * yearsOfCare * Math.pow(1 + inflation, 2);
    }

    // Lifestyle maintenance factor
    const lifestyleMultiplier = {
      'Frugal': 0.8,
      'Moderate': 1.0,
      'Luxury': 1.5
    }[lifestyle] || 1.0;

    // Emergency and contingency funds
    const emergencyTarget = parseNumber(monthlyExpenses) * 12 * lifestyleMultiplier; // 1 year expenses
    const contingencyBuffer = totalAnnualIncome * 0.1; // 10% of annual income

    // Goal-based additions
    let goalBasedNeeds = 0;
    if (dreamHomeGoal) goalBasedNeeds += 2000000;
    if (businessGoal) goalBasedNeeds += 1000000;
    if (travelGoal) goalBasedNeeds += 500000;

    // Comprehensive assets calculation
    const liquidAssets = parseNumber(emergencyFund) + parseNumber(fixedDeposits);
    const investmentAssets = parseNumber(mutualFunds) + parseNumber(stocks) + parseNumber(ppf);
    const tangibleAssets = parseNumber(goldJewellery) + parseNumber(propertyValue);
    const currentInsurance = parseNumber(currentLifeInsurance) + parseNumber(employerInsurance);
    
    const totalAssets = liquidAssets + investmentAssets + tangibleAssets + currentInsurance;

    // Calculate gross need
    const grossNeed = humanLifeValue + totalLiabilities + childrenFutureCost + 
                     parentCareCost + emergencyTarget + contingencyBuffer + goalBasedNeeds;

    // Net need after accounting for existing assets
    const netNeed = Math.max(0, grossNeed - totalAssets);
    
    // Risk-adjusted coverage
    const riskMultiplier = {
      'Conservative': 1.2,
      'Moderate': 1.0,
      'Aggressive': 0.8
    }[riskProfile] || 1.0;

    const healthMultiplier = {
      'Excellent': 0.9,
      'Good': 1.0,
      'Average': 1.1,
      'Poor': 1.3
    }[healthStatus] || 1.0;

    const smokingMultiplier = smokingStatus === 'Smoker' ? 1.2 : 1.0;

    const adjustedNeed = netNeed * riskMultiplier * healthMultiplier * smokingMultiplier;
    const recommendedCover = Math.ceil(adjustedNeed / 100000) * 100000;

    // Income replacement ratio
    const incomeReplacementRatio = recommendedCover / totalAnnualIncome;

    return {
      humanLifeValue,
      totalLiabilities,
      childrenFutureCost,
      parentCareCost,
      emergencyTarget,
      contingencyBuffer,
      goalBasedNeeds,
      grossNeed,
      totalAssets: {
        liquid: liquidAssets,
        investment: investmentAssets,
        tangible: tangibleAssets,
        insurance: currentInsurance,
        total: totalAssets
      },
      netNeed,
      recommendedCover,
      totalAnnualIncome,
      yearsToRetire,
      incomeReplacementRatio,
      adjustedNeed
    };
  }

  const result = computeAdvanced();

  // Enhanced recommendations with priority scoring
  function generateRecommendations() {
    const recommendations = [];
    
    // Priority 1: Critical gaps
    if (result.netNeed > result.totalAnnualIncome * 3) {
      recommendations.push({
        type: 'critical',
        icon: AlertTriangle,
        text: `Your insurance gap of ₹${(result.netNeed / 10000000).toFixed(1)}Cr is significant. Consider immediate term insurance coverage.`,
        priority: 1
      });
    }

    // Priority 2: Debt protection
    if (result.totalLiabilities > result.totalAnnualIncome) {
      recommendations.push({
        type: 'important',
        icon: Shield,
        text: "Your debts exceed annual income. Ensure loan protection through adequate term insurance.",
        priority: 2
      });
    }

    // Priority 3: Children's future
    if (result.childrenFutureCost > 0) {
      recommendations.push({
        type: 'planning',
        icon: Users,
        text: `Secure ₹${(result.childrenFutureCost / 100000).toFixed(1)}L for children's education and marriage through dedicated child plans.`,
        priority: 3
      });
    }

    // Priority 4: Health insurance adequacy
    if (parseNumber(currentHealthInsurance) < 1000000) {
      recommendations.push({
        type: 'health',
        icon: Heart,
        text: "Consider increasing health insurance to ₹10L+ to protect against medical inflation.",
        priority: 4
      });
    }

    // Priority 5: Emergency fund
    if (parseNumber(emergencyFund) < parseNumber(monthlyExpenses) * 6) {
      recommendations.push({
        type: 'emergency',
        icon: Target,
        text: "Build emergency fund equivalent to 6-12 months of expenses in liquid instruments.",
        priority: 5
      });
    }

    // Priority 6: Investment diversification
    const totalInvestments = result.totalAssets.investment;
    if (totalInvestments < result.totalAnnualIncome * 0.5) {
      recommendations.push({
        type: 'investment',
        icon: TrendingUp,
        text: "Increase systematic investments to build long-term wealth for financial independence.",
        priority: 6
      });
    }

    // Priority 7: Retirement planning
    if (result.yearsToRetire < 25) {
      recommendations.push({
        type: 'retirement',
        icon: Clock,
        text: "With retirement approaching, focus on building a corpus 25-30x your annual expenses.",
        priority: 7
      });
    }

    return recommendations.sort((a, b) => a.priority - b.priority);
  }

  const recommendations = generateRecommendations();

  // Progress tracking
  const getStepIcon = (stepNum) => {
    const icons = [Users, Heart, Briefcase, Shield, Calculator];
    const IconComponent = icons[stepNum - 1];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Use Project's Existing Header */}
      <Header />

      {/* Enhanced Step Indicators */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {[
              { num: 1, title: "Personal Info", icon: Users },
              { num: 2, title: "Family Details", icon: Heart },
              { num: 3, title: "Finances", icon: Briefcase },
              { num: 4, title: "Coverage", icon: Shield },
              { num: 5, title: "Results", icon: Calculator }
            ].map(({ num, title, icon: Icon }) => (
              <button
                key={num}
                onClick={() => handleStepClick(num)}
                className={`flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-all ${
                  step === num ? 'text-blue-600' : step > num ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                  ${step === num 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                    : step > num 
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{title}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={contentRef} className="max-w-6xl mx-auto p-6">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
          
          {/* Step 1 - Enhanced Personal Information */}
          {step === 1 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Age *</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="18" max="65"
                  />
                  {validationErrors.age && <p className="text-red-500 text-xs">{validationErrors.age}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Monthly Income (₹) *</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="75,000"
                  />
                  {validationErrors.monthlyIncome && <p className="text-red-500 text-xs">{validationErrors.monthlyIncome}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Monthly Expenses (₹) *</label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="45,000"
                  />
                  {validationErrors.monthlyExpenses && <p className="text-red-500 text-xs">{validationErrors.monthlyExpenses}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Dependents</label>
                  <input
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0" max="10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Occupation</label>
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Software Engineer</option>
                    <option>Doctor</option>
                    <option>Lawyer</option>
                    <option>Teacher</option>
                    <option>Business Owner</option>
                    <option>Consultant</option>
                    <option>Government Employee</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Expected Retirement Age</label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="50" max="70"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Why we need this information:</h4>
                    <p className="text-sm text-blue-700 mt-1">Your age, income, and expenses form the foundation of your Human Life Value calculation. This helps determine how much income replacement your family would need.</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Enhanced Family Details */}
          {step === 2 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-800">Family Details</h2>
              </div>

              <div className="space-y-6">
                {/* Spouse Information */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-purple-800">Spouse Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Spouse Age</label>
                      <input
                        type="number"
                        value={spouseAge}
                        onChange={(e) => setSpouseAge(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Working Status</label>
                      <select
                        value={spouseWorking}
                        onChange={(e) => setSpouseWorking(e.target.value === 'true')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="true">Working</option>
                        <option value="false">Homemaker</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Monthly Income (₹)</label>
                      <input
                        type="number"
                        value={spouseIncome}
                        onChange={(e) => setSpouseIncome(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        disabled={!spouseWorking}
                      />
                    </div>
                  </div>
                </div>

                {/* Children Information */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-orange-800">Children Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Children Ages (comma separated)</label>
                      <input
                        type="text"
                        value={childrenAgesStr}
                        onChange={(e) => setChildrenAgesStr(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="8, 5, 12"
                      />
                      <p className="text-xs text-gray-600">Enter ages separated by commas</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={childHigherEducationGoal}
                          onChange={(e) => setChildHigherEducationGoal(e.target.checked)}
                          className="w-4 h-4 text-orange-600"
                        />
                        <label className="text-sm">Plan for higher education abroad</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={childMarriageGoal}
                          onChange={(e) => setChildMarriageGoal(e.target.checked)}
                          className="w-4 h-4 text-orange-600"
                        />
                        <label className="text-sm">Plan for marriage expenses</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parents Information */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-green-800">Elderly Parents Care</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Number of Elderly Parents</label>
                      <input
                        type="number"
                        value={elderlyParents}
                        onChange={(e) => setElderlyParents(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        min="0" max="4"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Parents Ages</label>
                      <input
                        type="text"
                        value={parentsAge}
                        onChange={(e) => setParentsAge(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="65, 62"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Monthly Medical Expenses (₹)</label>
                      <input
                        type="number"
                        value={parentsMedicalExpenses}
                        onChange={(e) => setParentsMedicalExpenses(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between gap-4">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Enhanced Financial Portfolio */}
          {step === 3 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Financial Portfolio</h2>
              </div>

              <div className="space-y-6">
                {/* Additional Income Sources */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-green-800 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Additional Income Sources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Business Income (Annual ₹)</label>
                      <input
                        type="number"
                        value={businessIncome}
                        onChange={(e) => setBusinessIncome(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Rental Income (Monthly ₹)</label>
                      <input
                        type="number"
                        value={rentIncome}
                        onChange={(e) => setRentIncome(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="8,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Other Income (Annual ₹)</label>
                      <input
                        type="number"
                        value={0}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Freelancing, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Liabilities */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-red-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Outstanding Liabilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Home Loan (₹)</label>
                      <input
                        type="number"
                        value={homeLoan}
                        onChange={(e) => setHomeLoan(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="25,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Personal Loan (₹)</label>
                      <input
                        type="number"
                        value={personalLoans}
                        onChange={(e) => setPersonalLoans(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="5,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Car Loan (₹)</label>
                      <input
                        type="number"
                        value={carLoan}
                        onChange={(e) => setCarLoan(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="8,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Credit Card Debt (₹)</label>
                      <input
                        type="number"
                        value={creditCardDebt}
                        onChange={(e) => setCreditCardDebt(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="1,50,000"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Total Liabilities: ₹{((parseNumber(homeLoan) + parseNumber(personalLoans) + parseNumber(carLoan) + parseNumber(creditCardDebt)) / 100000).toFixed(1)}L</strong>
                    </p>
                  </div>
                </div>

                {/* Investment Portfolio */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-blue-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Investment Portfolio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Mutual Funds (₹)</label>
                      <input
                        type="number"
                        value={mutualFunds}
                        onChange={(e) => setMutualFunds(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="8,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Stocks/Equity (₹)</label>
                      <input
                        type="number"
                        value={stocks}
                        onChange={(e) => setStocks(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="3,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Fixed Deposits (₹)</label>
                      <input
                        type="number"
                        value={fixedDeposits}
                        onChange={(e) => setFixedDeposits(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="4,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">PPF/EPF (₹)</label>
                      <input
                        type="number"
                        value={ppf}
                        onChange={(e) => setPpf(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="2,00,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Physical Assets */}
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-yellow-800 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Physical Assets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Property Value (₹)</label>
                      <input
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="45,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Gold & Jewelry (₹)</label>
                      <input
                        type="number"
                        value={goldJewellery}
                        onChange={(e) => setGoldJewellery(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="6,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Emergency Fund (₹)</label>
                      <input
                        type="number"
                        value={emergencyFund}
                        onChange={(e) => setEmergencyFund(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="2,00,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Portfolio Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-purple-800 flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Portfolio Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-green-600">₹{(result.totalAssets.investment / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-gray-600">Investments</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-yellow-600">₹{(result.totalAssets.tangible / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-gray-600">Physical Assets</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-blue-600">₹{(result.totalAssets.liquid / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-gray-600">Liquid Assets</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-red-600">₹{(result.totalLiabilities / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-gray-600">Liabilities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between gap-4">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 4 - Enhanced Coverage & Preferences */}
          {step === 4 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Current Coverage & Preferences</h2>
              </div>

              <div className="space-y-6">
                {/* Current Insurance Coverage */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-blue-800 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Current Insurance Coverage
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Life Insurance (₹)</label>
                      <input
                        type="number"
                        value={currentLifeInsurance}
                        onChange={(e) => setCurrentLifeInsurance(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="15,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Health Insurance (₹)</label>
                      <input
                        type="number"
                        value={currentHealthInsurance}
                        onChange={(e) => setCurrentHealthInsurance(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="8,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Employer Insurance (₹)</label>
                      <input
                        type="number"
                        value={employerInsurance}
                        onChange={(e) => setEmployerInsurance(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="5,00,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Risk & Health Profile */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-orange-800 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Risk & Health Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Risk Profile</label>
                      <select
                        value={riskProfile}
                        onChange={(e) => setRiskProfile(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option>Conservative</option>
                        <option>Moderate</option>
                        <option>Aggressive</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Lifestyle</label>
                      <select
                        value={lifestyle}
                        onChange={(e) => setLifestyle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option>Frugal</option>
                        <option>Moderate</option>
                        <option>Luxury</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Health Status</label>
                      <select
                        value={healthStatus}
                        onChange={(e) => setHealthStatus(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Average</option>
                        <option>Poor</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Smoking Status</label>
                      <select
                        value={smokingStatus}
                        onChange={(e) => setSmokingStatus(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option>Non-Smoker</option>
                        <option>Smoker</option>
                        <option>Ex-Smoker</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Financial Assumptions */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-purple-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Financial Planning Assumptions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Inflation Rate (%)</label>
                      <input
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        step="0.1"
                        placeholder="6.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Expected Returns (%)</label>
                      <input
                        type="number"
                        value={expectedReturns}
                        onChange={(e) => setExpectedReturns(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        step="0.1"
                        placeholder="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Salary Growth Rate (%)</label>
                      <input
                        type="number"
                        value={salaryGrowthRate}
                        onChange={(e) => setSalaryGrowthRate(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        step="0.1"
                        placeholder="7"
                      />
                    </div>
                  </div>
                </div>

                {/* Future Goals */}
                <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-teal-800 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Future Financial Goals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={dreamHomeGoal}
                          onChange={(e) => setDreamHomeGoal(e.target.checked)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <label className="text-sm font-medium">Dream Home Purchase (₹20L buffer)</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={businessGoal}
                          onChange={(e) => setBusinessGoal(e.target.checked)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <label className="text-sm font-medium">Start Business (₹10L capital)</label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={travelGoal}
                          onChange={(e) => setTravelGoal(e.target.checked)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <label className="text-sm font-medium">World Travel Fund (₹5L)</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between gap-4">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 5 - Enhanced Results */}
          {step === 5 && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-gold-600" />
                <h2 className="text-2xl font-bold text-gray-800">Your Comprehensive Insurance Analysis</h2>
              </div>

              <div className="space-y-6">
                {/* Hero Coverage Recommendation */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-8 rounded-2xl shadow-2xl">
                  <div className="text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
                    <h3 className="text-3xl font-bold mb-2">Recommended Life Insurance Coverage</h3>
                    <div className="text-6xl font-bold mb-4">₹{(result.recommendedCover / 10000000).toFixed(1)}Cr</div>
                    <p className="text-xl opacity-90">Scientifically calculated for your unique profile</p>
                    <div className="mt-4 bg-white/20 rounded-lg p-3 inline-block">
                      <p className="text-sm">Income Replacement Ratio: {result.incomeReplacementRatio.toFixed(1)}x of annual income</p>
                    </div>
                  </div>
                </div>

                {/* Financial Health Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-blue-600">₹{(result.totalAnnualIncome / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-gray-600">Total Annual Income</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-green-600">₹{(result.totalAssets.total / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-gray-600">Total Assets</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                    <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-red-600">₹{(result.totalLiabilities / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-gray-600">Total Liabilities</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                    <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-purple-600">{result.yearsToRetire}</p>
                    <p className="text-sm text-gray-600">Years to Retirement</p>
                  </div>
                </div>

                {/* Detailed Calculation Breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Detailed Coverage Calculation
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Human Life Value</span>
                          <span className="font-bold text-blue-600">₹{(result.humanLifeValue / 10000000).toFixed(2)}Cr</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Outstanding Liabilities</span>
                          <span className="font-bold text-red-600">₹{(result.totalLiabilities / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-medium">Children's Future Needs</span>
                          <span className="font-bold text-yellow-600">₹{(result.childrenFutureCost / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Parents Care Fund</span>
                          <span className="font-bold text-green-600">₹{(result.parentCareCost / 100000).toFixed(1)}L</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">Emergency Buffer</span>
                          <span className="font-bold text-purple-600">₹{(result.emergencyTarget / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                          <span className="font-medium">Contingency Buffer</span>
                          <span className="font-bold text-indigo-600">₹{(result.contingencyBuffer / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                          <span className="font-medium">Goal-based Needs</span>
                          <span className="font-bold text-teal-600">₹{(result.goalBasedNeeds / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border-2 border-gray-300">
                          <span className="font-bold">Total Gross Need</span>
                          <span className="font-bold text-gray-800 text-lg">₹{(result.grossNeed / 10000000).toFixed(2)}Cr</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm opacity-75">After adjusting for existing assets:</p>
                          <p className="font-bold text-xl">Net Insurance Need: ₹{(result.netNeed / 10000000).toFixed(2)}Cr</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-75">Risk-adjusted coverage:</p>
                          <p className="font-bold text-2xl text-green-400">₹{(result.recommendedCover / 10000000).toFixed(1)}Cr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asset Allocation Breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Your Current Asset Portfolio
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg mb-3">
                          {((result.totalAssets.investment / result.totalAssets.total) * 100).toFixed(0)}%
                        </div>
                        <p className="font-semibold text-blue-600">Investments</p>
                        <p className="text-sm text-gray-600">₹{(result.totalAssets.investment / 100000).toFixed(1)}L</p>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg mb-3">
                          {((result.totalAssets.tangible / result.totalAssets.total) * 100).toFixed(0)}%
                        </div>
                        <p className="font-semibold text-yellow-600">Physical Assets</p>
                        <p className="text-sm text-gray-600">₹{(result.totalAssets.tangible / 100000).toFixed(1)}L</p>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg mb-3">
                          {((result.totalAssets.liquid / result.totalAssets.total) * 100).toFixed(0)}%
                        </div>
                        <p className="font-semibold text-green-600">Liquid Assets</p>
                        <p className="text-sm text-gray-600">₹{(result.totalAssets.liquid / 100000).toFixed(1)}L</p>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg mb-3">
                          {((result.totalAssets.insurance / result.totalAssets.total) * 100).toFixed(0)}%
                        </div>
                        <p className="font-semibold text-purple-600">Insurance</p>
                        <p className="text-sm text-gray-600">₹{(result.totalAssets.insurance / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority-Based Recommendations */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Personalized Action Plan
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recommendations.map((rec, idx) => {
                        const IconComponent = rec.icon;
                        const bgColor = rec.type === 'critical' ? 'bg-red-50 border-red-200' : 
                                       rec.type === 'important' ? 'bg-orange-50 border-orange-200' :
                                       rec.type === 'planning' ? 'bg-blue-50 border-blue-200' :
                                       rec.type === 'health' ? 'bg-pink-50 border-pink-200' : 
                                       'bg-gray-50 border-gray-200';
                        const iconColor = rec.type === 'critical' ? 'text-red-600' : 
                                         rec.type === 'important' ? 'text-orange-600' :
                                         rec.type === 'planning' ? 'text-blue-600' :
                                         rec.type === 'health' ? 'text-pink-600' : 
                                         'text-gray-600';
                        
                        return (
                          <div key={idx} className={`p-4 rounded-lg border ${bgColor}`}>
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full bg-white shadow-sm ${iconColor}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/50">
                                    Priority {rec.priority}
                                  </span>
                                  {rec.type === 'critical' && (
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                      URGENT
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm font-medium text-gray-800">{rec.text}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Insurance Product Suggestions */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Suggested Insurance Products
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Term Life Insurance</h4>
                        <p className="text-2xl font-bold text-blue-600 mb-2">₹{(result.recommendedCover / 10000000).toFixed(1)}Cr</p>
                        <p className="text-xs text-blue-700">Pure protection with maximum coverage at lowest cost</p>
                        <div className="mt-3 text-xs text-blue-600">
                          <p>• 30-year term policy</p>
                          <p>• Premium: ~₹{Math.round(result.recommendedCover * 0.001 * 1.2 / 1000)}K/year</p>
                        </div>
                      </div>
                      
                      {parseNumber(currentHealthInsurance) < 1500000 && (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">Health Insurance</h4>
                          <p className="text-2xl font-bold text-green-600 mb-2">₹15L+</p>
                          <p className="text-xs text-green-700">Family floater with comprehensive coverage</p>
                          <div className="mt-3 text-xs text-green-600">
                            <p>• Covers entire family</p>
                            <p>• Premium: ~₹25K/year</p>
                          </div>
                        </div>
                      )}
                      
                      {result.childrenFutureCost > 0 && (
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-yellow-800 mb-2">Child Education Plan</h4>
                          <p className="text-2xl font-bold text-yellow-600 mb-2">₹{(result.childrenFutureCost / 100000).toFixed(0)}L</p>
                          <p className="text-xs text-yellow-700">Systematic investment for children's future</p>
                          <div className="mt-3 text-xs text-yellow-600">
                            <p>• Monthly SIP recommended</p>
                            <p>• Target: ₹{(result.childrenFutureCost / 100000).toFixed(0)}L by graduation</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Financial Health Score */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Your Financial Health Score
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                              {Math.round(Math.min(100, (result.totalAssets.total / result.grossNeed) * 100))}
                            </span>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">Coverage Ratio</p>
                        <p className="text-sm text-gray-600">Assets vs. Total Needs</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                            parseNumber(emergencyFund) >= parseNumber(monthlyExpenses) * 6 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                              : 'bg-gradient-to-r from-red-400 to-orange-500'
                          }`}>
                            <span className="text-2xl font-bold text-white">
                              {Math.round((parseNumber(emergencyFund) / (parseNumber(monthlyExpenses) * 6)) * 100)}
                            </span>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">Emergency Fund</p>
                        <p className="text-sm text-gray-600">6 months expenses target</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                            result.totalLiabilities / result.totalAnnualIncome <= 3 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                              : 'bg-gradient-to-r from-red-400 to-orange-500'
                          }`}>
                            <span className="text-2xl font-bold text-white">
                              {Math.round((result.totalLiabilities / result.totalAnnualIncome) * 10) / 10}x
                            </span>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-800">Debt Ratio</p>
                        <p className="text-sm text-gray-600">Debt vs. Annual Income</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Immediate Next Steps
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-white/20 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <p className="text-sm">Get term life insurance quotes for ₹{(result.recommendedCover / 10000000).toFixed(1)}Cr coverage</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-white/20 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <p className="text-sm">Review and optimize your current health insurance coverage</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-white/20 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <p className="text-sm">Start systematic investments for long-term financial goals</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-white/20 rounded-full p-1 mt-1">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <p className="text-sm">Build emergency fund to cover 6-12 months of expenses</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Important Disclaimer</h4>
                      <p className="text-sm text-yellow-700">
                        This calculator provides estimates based on your inputs and standard financial planning principles. 
                        Actual insurance needs may vary based on personal circumstances, market conditions, and other factors. 
                        Please consult with a certified financial planner or insurance advisor before making final decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Use Project's Existing Footer */}
      <Footer 
        step={step}
        setStep={setStep}
        validateStep={validateStep}
      />
    </div>
  );
}