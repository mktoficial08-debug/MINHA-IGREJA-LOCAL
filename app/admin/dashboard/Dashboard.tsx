import React from 'react';
import Card from '../../../components/ui/Card';
import UsersIcon from '../../../components/ui/icons/UsersIcon';
import DollarSignIcon from '../../../components/ui/icons/DollarSignIcon';
import LayersIcon from '../../../components/ui/icons/LayersIcon';
import RecentActivity from './components/RecentActivity';
import UpcomingEvents from './components/UpcomingEvents';
import { useAuth } from '../../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Bem-vindo de volta, {currentUser?.name}!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total de Membros" value="1,250" icon={<UsersIcon className="w-6 h-6" />} change="+12 desde o mês passado" trend="up" />
        <Card title="Novos Membros (Mês)" value="32" icon={<UsersIcon className="w-6 h-6" />} change="+5.2% vs mês anterior" trend="up" />
        <Card title="Dízimos e Ofertas (Mês)" value="R$ 15.750" icon={<DollarSignIcon className="w-6 h-6" />} change="-1.8% vs mês anterior" trend="down" />
        <Card title="Grupos Pequenos Ativos" value="48" icon={<LayersIcon className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <RecentActivity />
        </div>
        <div>
            <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
