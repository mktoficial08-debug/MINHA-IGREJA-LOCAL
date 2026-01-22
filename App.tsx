import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import AdminLayout from './layouts/AdminLayout';
import AuthPage from './app/auth/AuthPage';
import MemberPortal from './app/portal/MemberPortal';
import LandingPage from './app/landing/LandingPage';

type View = 'landing' | 'auth';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [view, setView] = useState<View>('landing');

  if (currentUser) {
    if (currentUser.role === 'Admin') {
      return <AdminLayout />;
    }
    return <MemberPortal />;
  }
  
  switch(view) {
    case 'auth':
      return <AuthPage />;
    case 'landing':
    default:
      return <LandingPage onNavigateToAuth={() => setView('auth')} />;
  }
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <div className="text-gray-900 dark:text-gray-100 min-h-screen bg-white dark:bg-gray-900">
          <AppContent />
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;