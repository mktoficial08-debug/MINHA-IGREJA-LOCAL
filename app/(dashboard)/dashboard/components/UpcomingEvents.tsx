import React from 'react';
import CalendarIcon from '../../../../components/ui/icons/CalendarIcon';

const events = [
  { name: 'Culto de Oração', date: 'Quarta, 19:30', location: 'Templo Principal' },
  { name: 'Ensaio do Coral', date: 'Sexta, 20:00', location: 'Sala 3' },
  { name: 'Escola Bíblica Dominical', date: 'Domingo, 09:00', location: 'Salas Anexas' },
  { name: 'Culto de Celebração', date: 'Domingo, 10:30 e 18:00', location: 'Templo Principal' },
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Próximos Eventos</h3>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li key={index} className="flex items-start space-x-4">
            <div className="bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 p-2 rounded-lg mt-1">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{event.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
