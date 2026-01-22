import React from 'react';
import UserIcon from '../../../components/ui/icons/UserIcon';
import ClockIcon from '../../../components/ui/icons/ClockIcon';
import MapPinIcon from '../../../components/ui/icons/MapPinIcon';

// Mock Data for demonstration
const mockCellData = {
    name: 'Célula Gênesis',
    leader: 'João e Maria Silva',
    address: 'Rua das Flores, 123',
    dayOfWeek: 'Quinta-feira',
    time: '20:00'
};

const MyCellGroup: React.FC = () => {
    // In a real app, this data would be fetched based on the logged-in user
    const cell = mockCellData;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Minha Célula: {cell.name}</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span>Líder: <span className="font-medium text-gray-700 dark:text-gray-200">{cell.leader}</span></span>
                </div>
                 <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span>{cell.dayOfWeek}, às {cell.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    <span>{cell.address}</span>
                </div>
            </div>
        </div>
    );
};

export default MyCellGroup;
