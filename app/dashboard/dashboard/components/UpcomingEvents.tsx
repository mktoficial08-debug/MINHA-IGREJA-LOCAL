import React from 'react';
import type { Event } from '../../../../types';

// Using a richer data structure that includes images, consistent with the Events page.
const upcomingEventsData: Pick<Event, 'id' | 'name' | 'date' | 'location' | 'imageUrl'>[] = [
    {
        id: 1,
        name: 'Acampadentro 2024',
        date: '2024-08-15T18:00',
        location: 'Salão Principal da Igreja',
        imageUrl: 'https://picsum.photos/seed/event1/600/400'
    },
    {
        id: 2,
        name: 'Jantar de Casais',
        date: '2024-09-12T20:00',
        location: 'Restaurante Sabor Divino',
        imageUrl: 'https://picsum.photos/seed/event2/600/400'
    },
    {
        id: 3,
        name: 'Festa das Crianças',
        date: '2024-10-12T14:00',
        location: 'Pátio da Igreja',
        imageUrl: 'https://picsum.photos/seed/event3/600/400'
    }
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Próximos Eventos</h3>
      <ul className="space-y-4">
        {upcomingEventsData.map((event) => {
           const date = new Date(event.date);
           const formattedDate = date.toLocaleDateString('pt-BR', {
               weekday: 'short',
               day: '2-digit',
               month: 'short',
           });
           const formattedTime = date.toLocaleTimeString('pt-BR', {
               hour: '2-digit',
               minute: '2-digit'
           });

           return (
              <li key={event.id} className="flex items-center space-x-4">
                <img src={event.imageUrl} alt={event.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-grow">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 leading-tight">{event.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formattedDate} às {formattedTime}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
                </div>
              </li>
           )
        })}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
