import React from 'react';
import ClockIcon from '../../../../components/ui/icons/ClockIcon';
import UserIcon from '../../../../components/ui/icons/UserIcon';
import type { Cell } from '../../../../types';

interface CellCardProps {
    cell: Cell;
    onViewDetails: () => void;
    onRegisterMeeting: () => void;
}

const networkColors = {
    Jovens: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Casais: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    Crianças: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Geral: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
}

const CellCard: React.FC<CellCardProps> = ({ cell, onViewDetails, onRegisterMeeting }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{cell.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${networkColors[cell.network]}`}>
                        {cell.network}
                    </span>
                </div>
                
                <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span>Líder: <span className="font-medium text-gray-700 dark:text-gray-200">{cell.leader}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span>{cell.dayOfWeek}, às {cell.time}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                <button 
                    onClick={onViewDetails}
                    className="w-full text-sm text-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold">
                    Ver Detalhes
                </button>
                 <button 
                    onClick={onRegisterMeeting}
                    className="w-full text-sm text-center bg-primary-600 text-white px-3 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors font-semibold">
                    Registrar Reunião
                </button>
            </div>
        </div>
    );
};

export default CellCard;
