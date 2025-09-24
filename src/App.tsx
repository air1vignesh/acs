import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import FontLoader from './components/FontLoader';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CalculatorsPage from './pages/CalculatorsPage';
import EMICalculatorPage from './pages/EMICalculatorPage';
import HealthInsuranceCalculatorPage from './pages/HealthInsuranceCalculatorPage';
import SIPCalculatorPage from './pages/SIPCalculatorPage';
import LifeInsuranceCalculatorPage from './pages/LifeInsuranceCalculatorPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import EducationHub from './pages/EducationHub';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <FontLoader>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
              <Route path="/calculators/emi" element={<EMICalculatorPage />} />
              <Route path="/calculators/health-insurance" element={<HealthInsuranceCalculatorPage />} />
              <Route path="/calculators/sip" element={<SIPCalculatorPage />} />
              <Route path="/calculators/life-insurance" element={<LifeInsuranceCalculatorPage />} />
              <Route path="/educationhub" element={<EducationHub />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </FontLoader>
      </LanguageProvider>
    </Router>
  );
}

export default App;