import React from 'react';

const activities = [
  { user: 'Secretaria', action: 'adicionou um novo membro:', target: 'Ana Paula', time: '2 min atrás' },
  { user: 'Pr. João Silva', action: 'criou um novo evento:', target: 'Acampadentro 2024', time: '1 hora atrás' },
  { user: 'Tesouraria', action: 'registrou um novo dízimo de', target: 'Carlos Alberto', time: '3 horas atrás' },
  { user: 'Líder de Grupo', action: 'atualizou o grupo', target: 'Jovens Conectados', time: 'ontem' },
  { user: 'Secretaria', action: 'marcou o aniversário de', target: 'Maria Oliveira', time: 'ontem' },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Atividade Recente</h3>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-8 h-8 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-semibold text-primary-600 dark:text-primary-400">{activity.target}</span>.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;