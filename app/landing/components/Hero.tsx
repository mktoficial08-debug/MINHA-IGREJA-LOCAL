import React from 'react';
import UsersIcon from '../../../components/ui/icons/UsersIcon';
import DollarSignIcon from '../../../components/ui/icons/DollarSignIcon';
import LayersIcon from '../../../components/ui/icons/LayersIcon';

interface HeroProps {
    onNavigateToAuth: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToAuth }) => {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-900 pointer-events-none" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight mb-4">
            Gestão de igreja simplificada, do membro ao financeiro.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            O Minha Igreja centraliza todas as suas operações em uma plataforma intuitiva, liberando seu tempo para focar no que realmente importa: a sua comunidade.
          </p>
          <button 
            onClick={onNavigateToAuth}
            className="bg-primary-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-primary-700 transition-transform hover:scale-105 font-semibold text-lg">
            Comece seu teste grátis de 14 dias
          </button>
        </div>
        
        {/* Dashboard Mockup */}
        <div className="relative mt-16 max-w-4xl mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-purple-500 rounded-xl shadow-2xl transform -rotate-2"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3 px-2">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-3">
                            <div className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full"><UsersIcon className="w-5 h-5 text-primary-600"/></div>
                            <div><p className="font-bold text-lg">1,250</p><p className="text-xs text-gray-500">Membros</p></div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-3">
                             <div className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full"><DollarSignIcon className="w-5 h-5 text-primary-600"/></div>
                            <div><p className="font-bold text-lg">R$ 15k</p><p className="text-xs text-gray-500">Entradas/Mês</p></div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-3">
                             <div className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full"><LayersIcon className="w-5 h-5 text-primary-600"/></div>
                            <div><p className="font-bold text-lg">48</p><p className="text-xs text-gray-500">Células Ativas</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;