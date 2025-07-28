
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, Phone, MessageSquare } from 'lucide-react';

interface Alert {
  id: number;
  type: string;
  message: string;
  action: string;
  smsStatus: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium';
}

export const CriticalAlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "FRAUD_DETECTED",
      message: "Esther marked 3 orders paid - ₦0 Moniepoint match",
      action: "Auto-frozen payouts",
      smsStatus: "Sent to GM at 10:15 AM",
      timestamp: new Date(Date.now() - 900000), // 15 mins ago
      severity: "critical"
    },
    {
      id: 2,
      type: "STOCK_PREDICTION",
      message: "Lagos Shampoo stock critical - 2 days remaining",
      action: "Auto-SMS sent to suppliers",
      smsStatus: "WhatsApp sent to DAs",
      timestamp: new Date(Date.now() - 1800000), // 30 mins ago
      severity: "high"
    },
    {
      id: 3,
      type: "DA_PERFORMANCE",
      message: "Musa - 5 days no movement, stock value ₦82,500",
      action: "Stock redistribution initiated",
      smsStatus: "Call reminder scheduled",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      severity: "medium"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-yellow-500 bg-yellow-500/10';
      case 'medium': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'high': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'medium': return <CheckCircle className="w-5 h-5 text-blue-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Critical Alerts & Auto-Actions</h3>
        <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
          {alerts.filter(a => a.severity === 'critical').length} Critical
        </span>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-white font-semibold text-sm">
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{alert.message}</p>
                  <div className="flex flex-col space-y-1">
                    <span className="text-green-400 text-xs">✓ {alert.action}</span>
                    <span className="text-blue-400 text-xs">📱 {alert.smsStatus}</span>
                  </div>
                </div>
              </div>
              
              {alert.severity === 'critical' && (
                <div className="flex space-x-2 ml-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>Escalate</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">eBulkSMS Status</span>
          <span className="text-green-400 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Connected • 24ms latency</span>
          </span>
        </div>
      </div>
    </div>
  );
};
