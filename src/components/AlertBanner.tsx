
import React from 'react';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface AlertBannerProps {
  alert: {
    type: string;
    message: string;
    action: string;
    smsStatus: string;
    severity: string;
  };
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alert }) => {
  return (
    <div className="bg-red-600 text-white p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="w-8 h-8" />
          <div>
            <p className="font-bold text-lg">🚨 CRITICAL FRAUD ALERT</p>
            <p className="text-red-100">{alert.message}</p>
            <p className="text-xs text-red-200 mt-1">{alert.action} • {alert.smsStatus}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call GM</span>
          </button>
          <button className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Escalate COO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
