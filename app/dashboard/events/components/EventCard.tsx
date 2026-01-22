import React from 'react';
import CalendarIcon from '../../../../components/ui/icons/CalendarIcon';
import MapPinIcon from '../../../../components/ui/icons/MapPinIcon';
import PencilIcon from '../../../../components/ui/icons/PencilIcon';
import type { Event } from '../../../../types';

interface EventCardProps {
    event: Event;
    onEdit: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit }) => {
    
    const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(' ', ' - ').replace(',', '');

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden flex flex-col group transition-all hover:shadow-xl">
            <div className="relative">
                <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{event.name}</h3>
                <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300 flex-grow">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        <span>{formattedDate}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span>{event.location}</span>
                    </div>
                </div>
                 <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                     <button 
                        onClick={onEdit}
                        className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold transition-colors">
                        <PencilIcon className="w-4 h-4" /> Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
