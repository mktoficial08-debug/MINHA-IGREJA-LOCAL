import React from 'react';
import ChurchIcon from '../../../components/ui/icons/ChurchIcon';

interface HeaderProps {
    onNavigateToAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToAuth }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2">
              <ChurchIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">Minha Igreja</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-center flex-wrap items-center">
              <li><a href="#features" className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out">Funcionalidades</a></li>
              <li><a href="#pricing" className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out">Preços</a></li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={onNavigateToAuth} className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 transition duration-150 ease-in-out">
              Entrar
            </button>
            <button onClick={onNavigateToAuth} className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors font-semibold">
              Começar Agora
            </button>
          </div>
          {/* Mobile menu button could go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;