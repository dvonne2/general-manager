
import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  Brain, 
  MessageSquare, 
  MapPin, 
  DollarSign
} from 'lucide-react';

interface NavigationProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeModule, onModuleChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'fraud', label: 'Fraud Detection', icon: Shield, badge: '3' },
    { id: 'predictive', label: 'Predictive Analytics', icon: Brain, badge: '5' },
    { id: 'communication', label: 'Communication Hub', icon: MessageSquare, badge: null },
    { id: 'multistate', label: 'Multi-State Ops', icon: MapPin, badge: '2' },
    { id: 'financial', label: 'Financial Intelligence', icon: DollarSign, badge: null }
  ];

  return (
    <nav className="w-64 bg-slate-800/30 backdrop-blur-sm border-r border-blue-400/30 min-h-screen p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onModuleChange(item.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              activeModule === item.id 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/50' 
                : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
