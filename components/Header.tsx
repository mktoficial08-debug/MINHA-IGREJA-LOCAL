import React from 'react';
import MenuIcon from './icons/MenuIcon';
import BellIcon from './icons/BellIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm h-20 flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <h2 className="hidden sm:block text-xl font-semibold text-gray-700 dark:text-gray-200">Igreja Batista Central</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center space-x-3">
            <img
                src="https://picsum.photos/seed/user/40/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
            />
            <div className='hidden md:block'>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">Pr. João Silva</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
            </div>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <ChevronDownIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
