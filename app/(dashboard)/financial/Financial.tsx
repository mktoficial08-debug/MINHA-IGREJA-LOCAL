import React from 'react';

const titheData = [
    { id: 1, name: 'Carlos Alberto', cpf: '***.123.456-**', amount: 1200.00, last_contribution: '2024-07-05', status: 'Em dia' },
    { id: 2, name: 'Maria Oliveira', cpf: '***.789.012-**', amount: 850.50, last_contribution: '2024-07-03', status: 'Em dia' },
    { id: 4, name: 'Ana Paula', cpf: '***.345.678-**', amount: 300.00, last_contribution: '2024-07-10', status: 'Em dia' },
    { id: 6, name: 'João Batista', cpf: '***.901.234-**', amount: 0, last_contribution: '2024-06-08', status: 'Pendente' },
];

const Financial: React.FC = () => {

    const getStatusClass = (status: string) => {
        return status === 'Em dia' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Financeiro</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Relatórios de dízimos e ofertas.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Relatório de Dizimistas</h2>

                <div className="flex gap-4 mb-4">
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Julho</option>
                        <option>Junho</option>
                        <option>Maio</option>
                    </select>
                     <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Dizimista</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Valor Contribuído</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Última Contribuição</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {titheData.map(item => (
                                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-3 font-medium text-gray-800 dark:text-gray-100">{item.name}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">R$ {item.amount.toFixed(2).replace('.',',')}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{new Date(item.last_contribution).toLocaleDateString('pt-BR')}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Financial;
