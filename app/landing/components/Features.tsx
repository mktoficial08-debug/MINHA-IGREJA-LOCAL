import React from 'react';
import UsersIcon from '../../../components/ui/icons/UsersIcon';
import DollarSignIcon from '../../../components/ui/icons/DollarSignIcon';
import LayersIcon from '../../../components/ui/icons/LayersIcon';
import CalendarIcon from '../../../components/ui/icons/CalendarIcon';
import ClipboardListIcon from '../../../components/ui/icons/ClipboardListIcon';
import ShieldCheckIcon from '../../../components/ui/icons/ShieldCheckIcon';

const features = [
  {
    icon: <UsersIcon className="w-8 h-8 text-primary-600" />,
    title: 'Gestão de Membros Completa',
    description: 'Mantenha um cadastro detalhado e atualizado de todos os membros, com histórico, cargos e carteirinha digital.',
  },
  {
    icon: <DollarSignIcon className="w-8 h-8 text-primary-600" />,
    title: 'Financeiro Transparente',
    description: 'Registre dízimos, ofertas e despesas com facilidade. Gere relatórios financeiros para uma gestão clara e precisa.',
  },
  {
    icon: <LayersIcon className="w-8 h-8 text-primary-600" />,
    title: 'Organização de Células',
    description: 'Gerencie pequenos grupos, acompanhe a frequência, registre relatórios e planeje a multiplicação.',
  },
  {
    icon: <CalendarIcon className="w-8 h-8 text-primary-600" />,
    title: 'Agenda de Eventos',
    description: 'Crie e divulgue os eventos da igreja, desde cultos a conferências, em um calendário integrado.',
  },
  {
    icon: <ClipboardListIcon className="w-8 h-8 text-primary-600" />,
    title: 'Acompanhamento de Visitantes',
    description: 'Cadastre visitantes e crie um fluxo de acompanhamento para integrá-los à comunidade da igreja.',
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8 text-primary-600" />,
    title: 'Portal do Membro',
    description: 'Ofereça um espaço exclusivo para seus membros acessarem seus dados, eventos e informações da célula.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">Tudo que sua igreja precisa em um só lugar</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Desde a secretaria até a liderança de células, o Minha Igreja oferece as ferramentas para otimizar sua gestão.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-block bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;