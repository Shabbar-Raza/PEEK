import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RecordingProvider } from './contexts/RecordingContext';

// Landing Page Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import RecordingsPage from './components/dashboard/RecordingsPage';
import TranscriptsPage from './components/dashboard/TranscriptsPage';
import TranscriptViewer from './components/dashboard/TranscriptViewer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onSignupClick={() => {}} />
      <Features />
      <HowItWorks />
      <Dashboard />
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <RecordingProvider>
            <DashboardLayout />
          </RecordingProvider>
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="recordings" element={<RecordingsPage />} />
        <Route path="transcripts" element={<TranscriptsPage />} />
        <Route path="transcripts/:id" element={<TranscriptViewer />} />
        <Route path="analytics" element={<div className="p-6">Analytics coming soon...</div>} />
        <Route path="settings" element={<div className="p-6">Settings coming soon...</div>} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;