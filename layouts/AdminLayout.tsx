import React, { useState } from 'react';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Dashboard from '../app/admin/dashboard/Dashboard';
import Members from '../app/admin/members/Members';
import Financial from '../app/admin/financial/Financial';
import Visitors from '../app/admin/visitors/Visitors';
import Cells from '../app/admin/cells/Cells';
import Events from '../app/admin/events/Events';
import Settings from '../app/admin/settings/Settings';
import type { ViewName } from '../types';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewName>('Dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Membros':
        return <Members />;
      case 'Financeiro':
        return <Financial />;
      case 'Visitantes':
        return <Visitors />;
      case 'Células':
        return <Cells />;
      case 'Eventos':
        return <Events />;
      case 'Configurações':
        return <Settings />;
      default:
        return <div className='p-8'><h1 className="text-2xl font-bold">Página de {activeView} em construção...</h1></div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;