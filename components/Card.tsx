import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down';
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, trend }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
        </div>
        <div className="bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 p-3 rounded-full">
          {icon}
        </div>
      </div>
      {change && (
        <p className={`text-xs mt-3 ${trendColor}`}>{change}</p>
      )}
    </div>
  );
};

export default Card;
