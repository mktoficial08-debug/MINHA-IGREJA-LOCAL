import React, { useState } from 'react';
import PlusIcon from '../../../components/ui/icons/PlusIcon';
import AddEventModal from '../../../components/ui/AddEventModal';
import EventCard from './components/EventCard';
import type { Event } from '../../../types';

const initialEventsData: Event[] = [
    {
        id: 1,
        name: 'Acampadentro 2024',
        date: '2024-08-15T18:00',
        location: 'Salão Principal da Igreja',
        description: 'Um final de semana de comunhão, louvor e aprendizado para toda a juventude.',
        imageUrl: 'https://picsum.photos/seed/event1/600/400'
    },
    {
        id: 2,
        name: 'Jantar de Casais',
        date: '2024-09-12T20:00',
        location: 'Restaurante Sabor Divino',
        description: 'Uma noite especial para fortalecer os laços matrimoniais com um jantar romântico.',
        imageUrl: 'https://picsum.photos/seed/event2/600/400'
    },
    {
        id: 3,
        name: 'Festa das Crianças',
        date: '2024-10-12T14:00',
        location: 'Pátio da Igreja',
        description: 'Muitas brincadeiras, lanches e diversão para celebrar o dia das crianças.',
        imageUrl: 'https://picsum.photos/seed/event3/600/400'
    }
];

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(initialEventsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const handleOpenAddModal = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (event: Event) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
    };

    const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
        if (editingEvent) {
            // Update existing event
            setEvents(events.map(e => e.id === editingEvent.id ? { ...editingEvent, ...eventData } : e));
        } else {
            // Add new event
            const newEvent: Event = {
                id: Date.now(),
                ...eventData,
                imageUrl: eventData.imageUrl || `https://picsum.photos/seed/event${Date.now()}/600/400`
            };
            setEvents(prev => [newEvent, ...prev]);
        }
        handleCloseModal();
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Próximos Eventos</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Crie, edite e gerencie os eventos da sua igreja.</p>
                </div>
                <button 
                    onClick={handleOpenAddModal}
                    className="w-full sm:w-auto bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Novo Evento
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} onEdit={() => handleOpenEditModal(event)} />
                ))}
            </div>

            <AddEventModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveEvent}
                event={editingEvent}
            />
        </div>
    );
};

export default Events;
