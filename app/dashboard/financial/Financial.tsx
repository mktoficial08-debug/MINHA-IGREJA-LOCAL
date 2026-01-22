import React, { useState, useMemo } from 'react';
import Card from '../../../components/ui/Card';
import DollarSignIcon from '../../../components/ui/icons/DollarSignIcon';
import BarChartIcon from '../../../components/ui/icons/BarChartIcon';
import UsersIcon from '../../../components/ui/icons/UsersIcon';
import RegisterEntry from './components/RegisterEntry';
import type { Member } from '../../../types';

// Mock data, in a real app this would come from an API/shared state
const initialMembersData: Omit<Member, 'roleId'| 'status'>[] = [
  { id: 1, name: 'Carlos Alberto', photo: '...' },
  { id: 2, name: 'Maria Oliveira', photo: '...' },
  { id: 3, name: 'José Pereira', photo: '...' },
  { id: 4, name: 'Ana Paula', photo: '...' },
  { id: 5, name: 'Ricardo Souza', photo: '...' },
  { id: 6, name: 'João Batista', photo: '...' },
];

const initialTitheData = [
    { id: 1, memberId: 1, memberName: 'Carlos Alberto', amount: 1200.00, date: '2024-07-05' },
    { id: 2, memberId: 2, memberName: 'Maria Oliveira', amount: 850.50, date: '2024-07-03' },
    { id: 4, memberId: 4, memberName: 'Ana Paula', amount: 300.00, date: '2024-07-10' },
];

const initialOfferingData = [
    { id: 1, service: 'Culto de Domingo', amount: 1540.75, date: '2024-07-21' },
    { id: 2, service: 'Culto de Oração', amount: 350.00, date: '2024-07-24' },
]

const Financial: React.FC = () => {
    const [tithes, setTithes] = useState(initialTitheData);
    const [offerings, setOfferings] = useState(initialOfferingData);

    const monthlyTotal = useMemo(() => {
        const tithesTotal = tithes.reduce((sum, tithe) => sum + tithe.amount, 0);
        const offeringsTotal = offerings.reduce((sum, offering) => sum + offering.amount, 0);
        return tithesTotal + offeringsTotal;
    }, [tithes, offerings]);
    
    const tithesTotal = useMemo(() => tithes.reduce((sum, tithe) => sum + tithe.amount, 0), [tithes]);
    const offeringsTotal = useMemo(() => offerings.reduce((sum, offering) => sum + offering.amount, 0), [offerings]);

    const handleAddTithe = (titheData: { memberId: number, amount: number, date: string }) => {
        const member = initialMembersData.find(m => m.id === titheData.memberId);
        if (!member) return;

        const newTithe = {
            id: Date.now(),
            memberId: titheData.memberId,
            memberName: member.name,
            amount: titheData.amount,
            date: titheData.date,
        };
        setTithes(prev => [...prev, newTithe].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    
    const handleAddOffering = (offeringData: { service: string, amount: number, date: string }) => {
        const newOffering = {
            id: Date.now(),
            ...offeringData,
        };
        setOfferings(prev => [...prev, newOffering].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Financeiro</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Gerencie dízimos, ofertas e relatórios financeiros.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Total Arrecadado (Mês)" value={`R$ ${monthlyTotal.toFixed(2).replace('.', ',')}`} icon={<DollarSignIcon className="w-6 h-6" />} />
                <Card title="Dízimos (Mês)" value={`R$ ${tithesTotal.toFixed(2).replace('.', ',')}`} icon={<UsersIcon className="w-6 h-6" />} />
                <Card title="Ofertas (Mês)" value={`R$ ${offeringsTotal.toFixed(2).replace('.', ',')}`} icon={<BarChartIcon className="w-6 h-6" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <RegisterEntry members={initialMembersData} onAddTithe={handleAddTithe} onAddOffering={handleAddOffering} />
                </div>
                
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Relatório de Dízimos</h2>
                         <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                                    <tr>
                                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Dizimista</th>
                                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Valor</th>
                                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tithes.map(item => (
                                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-3 font-medium text-gray-800 dark:text-gray-100">{item.memberName}</td>
                                            <td className="p-3 text-gray-600 dark:text-gray-300">R$ {item.amount.toFixed(2).replace('.',',')}</td>
                                            <td className="p-3 text-gray-600 dark:text-gray-300">{new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Relatório de Ofertas</h2>
                         <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                                    <tr>
                                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Culto/Evento</th>
                                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Valor</th>
                                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offerings.map(item => (
                                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-3 font-medium text-gray-800 dark:text-gray-100">{item.service}</td>
                                            <td className="p-3 text-gray-600 dark:text-gray-300">R$ {item.amount.toFixed(2).replace('.',',')}</td>
                                            <td className="p-3 text-gray-600 dark:text-gray-300">{new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financial;
