import React, { useState } from 'react';
import PlusIcon from '../../../../components/ui/icons/PlusIcon';
import type { Member } from '../../../../types';

interface RegisterEntryProps {
    members: Omit<Member, 'roleId'| 'status'>[];
    onAddTithe: (data: { memberId: number; amount: number; date: string }) => void;
    onAddOffering: (data: { service: string; amount: number; date: string }) => void;
}

const RegisterEntry: React.FC<RegisterEntryProps> = ({ members, onAddTithe, onAddOffering }) => {
    const [activeTab, setActiveTab] = useState<'tithe' | 'offering'>('tithe');

    const [titheData, setTitheData] = useState({
        memberId: members.length > 0 ? members[0].id : '',
        amount: '',
        date: new Date().toISOString().substring(0, 10),
    });

    const [offeringData, setOfferingData] = useState({
        service: 'Culto de Domingo',
        amount: '',
        date: new Date().toISOString().substring(0, 10),
    });

    const handleTitheSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!titheData.memberId || !titheData.amount || !titheData.date) return;
        onAddTithe({
            memberId: Number(titheData.memberId),
            amount: parseFloat(titheData.amount),
            date: titheData.date,
        });
        setTitheData(prev => ({ ...prev, amount: '' }));
    };

    const handleOfferingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!offeringData.service || !offeringData.amount || !offeringData.date) return;
        onAddOffering({
            service: offeringData.service,
            amount: parseFloat(offeringData.amount),
            date: offeringData.date,
        });
        setOfferingData(prev => ({...prev, amount: ''}));
    };

    const TabButton: React.FC<{ tabName: 'tithe' | 'offering', label: string }> = ({ tabName, label }) => (
        <button
            type="button"
            onClick={() => setActiveTab(tabName)}
            className={`w-1/2 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === tabName
                    ? 'bg-primary-600 text-white shadow'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Registrar Entrada</h2>
            
            <div className="flex mb-4 rounded-lg overflow-hidden">
                <TabButton tabName="tithe" label="Dízimo" />
                <TabButton tabName="offering" label="Oferta" />
            </div>

            {activeTab === 'tithe' && (
                <form className="space-y-4" onSubmit={handleTitheSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Membro Dizimista</label>
                        <select 
                            value={titheData.memberId}
                            onChange={(e) => setTitheData({...titheData, memberId: e.target.value})}
                            required
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            {members.map(member => <option key={member.id} value={member.id}>{member.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Valor (R$)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            placeholder="0,00"
                            value={titheData.amount}
                            onChange={(e) => setTitheData({...titheData, amount: e.target.value})}
                            required
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data da Contribuição</label>
                        <input 
                            type="date"
                            value={titheData.date}
                            onChange={(e) => setTitheData({...titheData, date: e.target.value})}
                            required
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <button type="submit" className="w-full bg-primary-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                        <PlusIcon className="w-5 h-5" />
                        Registrar Dízimo
                    </button>
                </form>
            )}

            {activeTab === 'offering' && (
                <form className="space-y-4" onSubmit={handleOfferingSubmit}>
                     <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Culto / Evento</label>
                        <select 
                            value={offeringData.service}
                            onChange={(e) => setOfferingData({...offeringData, service: e.target.value})}
                            required
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option>Culto de Domingo</option>
                            <option>Culto de Oração</option>
                            <option>Escola Bíblica</option>
                            <option>Evento Especial</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Valor da Oferta (R$)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            placeholder="0,00"
                            value={offeringData.amount}
                            onChange={(e) => setOfferingData({...offeringData, amount: e.target.value})}
                            required
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data da Arrecadação</label>
                        <input 
                            type="date"
                            value={offeringData.date}
                            onChange={(e) => setOfferingData({...offeringData, date: e.target.value})}
                            required
                            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <button type="submit" className="w-full bg-primary-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                        <PlusIcon className="w-5 h-5" />
                        Registrar Oferta
                    </button>
                </form>
            )}
        </div>
    );
};

export default RegisterEntry;
