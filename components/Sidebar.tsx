import React from 'react';
import HomeIcon from './icons/HomeIcon';
import UsersIcon from './icons/UsersIcon';
import CalendarIcon from './icons/CalendarIcon';
import DollarSignIcon from './icons/DollarSignIcon';
import LayersIcon from './icons/LayersIcon';
import SettingsIcon from './icons/SettingsIcon';
import LogOutIcon from './icons/LogOutIcon';
import ChurchIcon from './icons/ChurchIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';

type ViewName = 'Dashboard' | 'Membros' | 'Financeiro' | 'Células' | 'Eventos' | 'Visitantes' | 'Configurações';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeView: ViewName;
  setActiveView: (view: ViewName) => void;
}

const NavLink: React.FC<{ 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  active?: boolean;
  onClick: () => void;
}> = ({ icon, children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
      active
        ? 'bg-primary-500 text-white shadow'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{children}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, activeView, setActiveView }) => {
  // FIX: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
  const navItems: { label: ViewName; icon: React.ReactNode; }[] = [
    { label: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { label: 'Membros', icon: <UsersIcon className="w-5 h-5" /> },
    { label: 'Financeiro', icon: <DollarSignIcon className="w-5 h-5" /> },
    { label: 'Células', icon: <LayersIcon className="w-5 h-5" /> },
    { label: 'Eventos', icon: <CalendarIcon className="w-5 h-5" /> },
    { label: 'Visitantes', icon: <ClipboardListIcon className="w-5 h-5" /> },
  ];
  
  const handleNavClick = (view: ViewName) => {
    setActiveView(view);
    if(sidebarOpen) {
      setSidebarOpen(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 bg-white dark:bg-gray-800 w-64 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700 px-4 gap-3 flex-shrink-0">
          <ChurchIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap">Minha Igreja</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink 
              key={item.label} 
              icon={item.icon} 
              active={activeView === item.label}
              onClick={() => handleNavClick(item.label)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 flex-shrink-0">
            <NavLink icon={<SettingsIcon className="w-5 h-5" />} onClick={() => handleNavClick('Configurações')}>
                Configurações
            </NavLink>
             <NavLink icon={<LogOutIcon className="w-5 h-5" />} onClick={() => alert('Logout!')}>
                Sair
            </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;