import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import StaffMonitoring from './pages/StaffMonitoring';
import WhatsApp from './pages/WhatsApp';
import EnquiryTracking from './pages/EnquiryTracking';
import OETTraining from './pages/OETTraining';
import Documents from './pages/Documents';
import Visa from './pages/Visa';
import Branches from './pages/Branches';
import Reports from './pages/Reports';



const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="crm" element={<CRM />} />
            <Route path="staff" element={<StaffMonitoring />} />
            <Route path="whatsapp" element={<WhatsApp />} />
            <Route path="tracking" element={<EnquiryTracking />} />
            <Route path="oet" element={<OETTraining />} />
            <Route path="documents" element={<Documents />} />
            <Route path="visa" element={<Visa />} />
            <Route path="branches" element={<Branches />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
