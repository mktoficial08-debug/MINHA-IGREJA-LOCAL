import React from 'react';
import PlusIcon from '../../../components/ui/icons/PlusIcon';

const recentVisitors = [
  { id: 1, name: 'Fernanda Costa', phone: '(11) 98765-4321', visit_date: '2024-07-21', status: 'Pendente de Contato' },
  { id: 2, name: 'Lucas Martins', phone: '(21) 91234-5678', visit_date: '2024-07-21', status: 'Contatado' },
  { id: 3, name: 'Beatriz Almeida', phone: '(31) 99999-8888', visit_date: '2024-07-14', status: 'Contatado' },
];

const Visitors: React.FC = () => {

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Pendente de Contato':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'Contatado':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Controle de Visitantes</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Cadastre e acompanhe os visitantes da sua igreja.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Registrar Novo Visitante</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                            <input type="text" className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone (WhatsApp)</label>
                            <input type="tel" className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data da Visita</label>
                            <input type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <button type="submit" className="w-full bg-primary-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                            <PlusIcon className="w-5 h-5" />
                            Salvar Visitante
                        </button>
                    </form>
                </div>
                
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Visitantes Recentes</h2>
                    <div className="overflow-x-auto">
                         <table className="w-full text-left">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Nome</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Data da Visita</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentVisitors.map(visitor => (
                                    <tr key={visitor.id} className="border-b border-gray-100 dark:border-gray-700">
                                        <td className="p-3">
                                            <div className="font-medium text-gray-800 dark:text-gray-100">{visitor.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{visitor.phone}</div>
                                        </td>
                                        <td className="p-3 text-gray-600 dark:text-gray-300">{new Date(visitor.visit_date).toLocaleDateString('pt-BR')}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(visitor.status)}`}>
                                                {visitor.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {visitor.status === 'Pendente de Contato' && (
                                                <button className="text-primary-600 hover:text-primary-800 text-sm font-semibold">
                                                    Contatar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Visitors;
