
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: string;
  prediction: string;
  icon: LucideIcon;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
  alert: boolean;
  onClick: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  prediction,
  icon: Icon,
  color,
  alert,
  onClick
}) => {
  const colorVariants = {
    blue: 'border-blue-400/50 bg-blue-500/10',
    red: 'border-red-400/50 bg-red-500/10',
    green: 'border-green-400/50 bg-green-500/10',
    yellow: 'border-yellow-400/50 bg-yellow-500/10',
    purple: 'border-purple-400/50 bg-purple-500/10'
  };

  const iconColorVariants = {
    blue: 'text-blue-400',
    red: 'text-red-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400'
  };

  return (
    <div 
      onClick={onClick}
      className={`${colorVariants[color]} border backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-200 ${
        alert ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${iconColorVariants[color]}`} />
        {alert && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            ALERT
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-white text-3xl font-bold">{value}</span>
          <span className={`text-sm ${
            trend.includes('+') ? 'text-green-400' : 
            trend.includes('Critical') || trend.includes('Warning') ? 'text-red-400' : 
            'text-gray-400'
          }`}>
            {trend}
          </span>
        </div>
        <p className="text-gray-400 text-xs">{prediction}</p>
      </div>
    </div>
  );
};
