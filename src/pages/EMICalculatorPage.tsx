import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

export default function EMICalculatorPage() {
  const { t } = useLanguage();

  // Default rates and tenures for EMI calculator
  const defaultRates = {
    home: 8.75,
    personal: 12.0,
    gold: 12.0,
    education: 10.5,
    vehicle: 9.25,
  };

  const defaultTenures = {
    home: 20,
    personal: 5,
    gold: 1,
    education: 8,
    vehicle: 7,
  };

  // EMI Calculator States - Loan A
  const [principal, setPrincipal] = useState(1000000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(0);
  const [paymentsPerYear, setPaymentsPerYear] = useState(12);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [repayMode, setRepayMode] = useState("emi");
  const [loanType, setLoanType] = useState("home");
  const [autoUpdate, setAutoUpdate] = useState(false);

  // EMI Calculator States - Loan B (Compare Mode)
  const [compareMode, setCompareMode] = useState(false);
  const [loanTypeB, setLoanTypeB] = useState("home");
  const [autoUpdateB, setAutoUpdateB] = useState(false);
  const [p2, setP2] = useState(800000);
  const [r2, setR2] = useState(9.0);
  const [y2, setY2] = useState(20);
  const [m2, setM2] = useState(0);
  const [payPerYearB, setPayPerYearB] = useState(12);
  const [extra2, setExtra2] = useState(0);
  const [repayModeB, setRepayModeB] = useState("emi");

  async function fetchLiveRate(type) {
    await new Promise((r) => setTimeout(r, 400));
    return defaultRates[type] + (Math.random() * 0.5 - 0.25);
  }

  async function handleLoanTypeChange(key) {
    setLoanType(key);
    setTenureYears(defaultTenures[key] ?? 10);
    setTenureMonths(0);
    if (autoUpdate) {
      const rate = await fetchLiveRate(key);
      setAnnualRate(Number(rate.toFixed(2)));
    } else setAnnualRate(defaultRates[key] ?? 10);
  }

  async function handleLoanTypeChangeB(key) {
    setLoanTypeB(key);
    setY2(defaultTenures[key] ?? 10);
    setM2(0);
    if (autoUpdateB) {
      const rate = await fetchLiveRate(key);
      setR2(Number(rate.toFixed(2)));
    } else setR2(defaultRates[key] ?? 10);
  }

  useEffect(() => {
    if (autoUpdate) handleLoanTypeChange(loanType);
  }, [autoUpdate]);

  useEffect(() => {
    if (autoUpdateB) handleLoanTypeChangeB(loanTypeB);
  }, [autoUpdateB]);

  const totalMonths = useMemo(
    () => tenureYears * 12 + Number(tenureMonths),
    [tenureYears, tenureMonths]
  );
  const totalMonthsB = useMemo(() => y2 * 12 + Number(m2), [y2, m2]);

  // EMI calculation function
  function computeEMI(p, annualR, months, extra = 0, freq = 12) {
    if (!months || months <= 0)
      return { emi: 0, totalPayment: 0, totalInterest: 0 };

    const r = annualR / 100 / freq;
    const n = months;
    const emi =
      r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let balance = p,
      totalInterest = 0,
      totalPayment = 0;

    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      let principalComponent = emi - interest + extra;
      if (principalComponent > balance) principalComponent = balance;
      const payment = principalComponent + interest;
      balance = Math.max(0, balance - principalComponent);
      totalInterest += interest;
      totalPayment += payment;
      if (balance <= 0) break;
    }
    return {
      emi: Number((emi + extra).toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
    };
  }

  // Bullet payment calculation function
  function computeBullet(p, annualR, months) {
    const years = months / 12;
    const simpleInterest = p * (annualR / 100) * years;
    return {
      emi: 0,
      totalPayment: p + simpleInterest,
      totalInterest: simpleInterest,
    };
  }

  const loanA = useMemo(
    () =>
      repayMode === "emi"
        ? computeEMI(
            Number(principal),
            Number(annualRate),
            Number(totalMonths),
            Number(extraMonthly),
            paymentsPerYear
          )
        : computeBullet(Number(principal), Number(annualRate), totalMonths),
    [principal, annualRate, totalMonths, extraMonthly, paymentsPerYear, repayMode]
  );

  const loanB = useMemo(
    () =>
      compareMode
        ? repayModeB === "emi"
          ? computeEMI(Number(p2), Number(r2), Number(totalMonthsB), Number(extra2), payPerYearB)
          : computeBullet(Number(p2), Number(r2), totalMonthsB)
        : null,
    [compareMode, p2, r2, totalMonthsB, extra2, payPerYearB, repayModeB]
  );

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
              {t('calculators.emi.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('calculators.emi.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">Expert EMI / Bullet Calculator</h3>
              <p className="opacity-90">EMI or single-shot payoff, compare two loans with identical input flexibility</p>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Loan A Input Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Loan A Inputs</h4>
                  <LoanInputs
                    type={loanType}
                    onType={handleLoanTypeChange}
                    auto={autoUpdate}
                    onAuto={setAutoUpdate}
                    principal={principal}
                    setPrincipal={setPrincipal}
                    rate={annualRate}
                    setRate={setAnnualRate}
                    years={tenureYears}
                    setYears={setTenureYears}
                    months={tenureMonths}
                    setMonths={setTenureMonths}
                    payPerYear={paymentsPerYear}
                    setPayPerYear={setPaymentsPerYear}
                    extra={extraMonthly}
                    setExtra={setExtraMonthly}
                    repayMode={repayMode}
                    setRepayMode={setRepayMode}
                  />

                  <div className="flex items-center gap-2 mt-4">
                    <input
                      id="compare"
                      type="checkbox"
                      checked={compareMode}
                      onChange={(e) => setCompareMode(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="compare" className="text-sm font-medium text-gray-700">
                      Compare with another loan
                    </label>
                  </div>

                  {compareMode && (
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mt-4">
                      <h3 className="text-sm font-medium mb-3 text-gray-900">Loan B Inputs</h3>
                      <LoanInputs
                        type={loanTypeB}
                        onType={handleLoanTypeChangeB}
                        auto={autoUpdateB}
                        onAuto={setAutoUpdateB}
                        principal={p2}
                        setPrincipal={setP2}
                        rate={r2}
                        setRate={setR2}
                        years={y2}
                        setYears={setY2}
                        months={m2}
                        setMonths={setM2}
                        payPerYear={payPerYearB}
                        setPayPerYear={setPayPerYearB}
                        extra={extra2}
                        setExtra={setExtra2}
                        repayMode={repayModeB}
                        setRepayMode={setRepayModeB}
                      />
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Results</h4>
                  <ResultCard
                    title="Loan A"
                    emi={loanA.emi}
                    interest={loanA.totalInterest}
                    total={loanA.totalPayment}
                    bullet={repayMode === "bullet"}
                  />
                  {compareMode && loanB && (
                    <ResultCard
                      title="Loan B"
                      emi={loanB.emi}
                      interest={loanB.totalInterest}
                      total={loanB.totalPayment}
                      bullet={repayModeB === "bullet"}
                    />
                  )}
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

// Reusable Components
function LoanInputs({
  type,
  onType,
  auto,
  onAuto,
  principal,
  setPrincipal,
  rate,
  setRate,
  years,
  setYears,
  months,
  setMonths,
  payPerYear,
  setPayPerYear,
  extra,
  setExtra,
  repayMode,
  setRepayMode,
}) {
  return (
    <div className="space-y-3">
      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 mb-1">Loan Type</span>
        <select
          value={type}
          onChange={(e) => onType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="home">Home Loan</option>
          <option value="gold">Gold Loan</option>
          <option value="personal">Personal Loan</option>
          <option value="vehicle">Vehicle Loan</option>
          <option value="education">Education Loan</option>
        </select>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={auto}
          onChange={(e) => onAuto(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700">Auto-update live rate</span>
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 mb-1">Principal (₹)</span>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</span>
        <input
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <div className="flex gap-2">
        <label className="flex-1 flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">Tenure — Years</span>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="w-32 flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">Months</span>
          <input
            type="number"
            max={11}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="flex gap-4 items-center">
        <input
          id={`emi-${type}`}
          type="radio"
          name={`repay-${type}`}
          value="emi"
          checked={repayMode === "emi"}
          onChange={() => setRepayMode("emi")}
          className="text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor={`emi-${type}`} className="text-sm font-medium text-gray-700">
          EMI
        </label>
        <input
          id={`bullet-${type}`}
          type="radio"
          name={`repay-${type}`}
          value="bullet"
          checked={repayMode === "bullet"}
          onChange={() => setRepayMode("bullet")}
          className="text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor={`bullet-${type}`} className="text-sm font-medium text-gray-700">
          Single-Shot (Principal + Interest at end)
        </label>
      </div>

      {repayMode === "emi" && (
        <>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Payments per year</span>
            <select
              value={payPerYear}
              onChange={(e) => setPayPerYear(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={12}>Monthly (12)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={1}>Yearly (1)</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-1">Extra Periodic Prepayment (₹)</span>
            <input
              type="number"
              value={extra}
              onChange={(e) => setExtra(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </>
      )}
    </div>
  );
}

function ResultCard({ title, emi, interest, total, bullet }) {
  return (
    <div className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm border mb-4">
      <div className="flex justify-between items-baseline">
        <div>
          <div className="text-sm text-gray-600 font-medium">{title}</div>
          {bullet ? (
            <div className="text-lg font-medium text-purple-700">Bullet Repayment</div>
          ) : (
            <div className="text-2xl font-bold text-blue-700">₹ {emi.toLocaleString()} EMI</div>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 font-medium">Total Interest</div>
          <div className="font-semibold text-red-600">₹ {interest.toLocaleString()}</div>
          <div className="text-sm text-gray-500">
            Total Paid: ₹ {total.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}