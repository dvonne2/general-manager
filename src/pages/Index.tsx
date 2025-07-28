
import React, { useState, useEffect } from 'react';
import { CommandDashboard } from '../components/CommandDashboard';
import { FraudDetectionCenter } from '../components/FraudDetectionCenter';
import { PredictiveAnalytics } from '../components/PredictiveAnalytics';
import { CommunicationHub } from '../components/CommunicationHub';
import { MultiStateCommand } from '../components/MultiStateCommand';
import { FinancialIntelligence } from '../components/FinancialIntelligence';
import { AlertBanner } from '../components/AlertBanner';
import { Navigation } from '../components/Navigation';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [criticalAlerts, setCriticalAlerts] = useState([
    {
      id: 1,
      type: "FRAUD_DETECTED",
      message: "Esther marked 3 orders paid - ₦0 Moniepoint match",
      action: "Auto-frozen payouts",
      smsStatus: "Sent to GM at 10:15 AM",
      severity: "critical",
      timestamp: new Date()
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add random alerts for demonstration
      const alertTypes = ['STOCK_PREDICTION', 'FRAUD_DETECTED', 'DA_PERFORMANCE'];
      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      
      if (Math.random() > 0.7) { // 30% chance of new alert every 5 seconds
        const newAlert = {
          id: Date.now(),
          type: randomType,
          message: getRandomAlertMessage(randomType),
          action: "Auto-action triggered",
          smsStatus: "SMS sent",
          severity: Math.random() > 0.5 ? "high" : "medium",
          timestamp: new Date()
        };
        
        setCriticalAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRandomAlertMessage = (type: string) => {
    const messages = {
      STOCK_PREDICTION: "Lagos Shampoo stock critical - 2 days remaining",
      FRAUD_DETECTED: "Suspicious payment pattern detected - Investigation triggered",
      DA_PERFORMANCE: "Musa - 5 days no movement, stock value ₦82,500"
    };
    return messages[type as keyof typeof messages];
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <CommandDashboard onModuleChange={setActiveModule} />;
      case 'fraud':
        return <FraudDetectionCenter />;
      case 'predictive':
        return <PredictiveAnalytics />;
      case 'communication':
        return <CommunicationHub />;
      case 'multistate':
        return <MultiStateCommand />;
      case 'financial':
        return <FinancialIntelligence />;
      default:
        return <CommandDashboard onModuleChange={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && criticalAlerts[0].severity === 'critical' && (
        <AlertBanner alert={criticalAlerts[0]} />
      )}
      
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-blue-400/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Vitalvida GM Command Center</h1>
              <p className="text-blue-300 text-sm">Real-time Operations • AI-Powered Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-500/20 px-3 py-1 rounded-full">
              <span className="text-green-400 text-sm font-semibold">● LIVE</span>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">General Manager</p>
              <p className="text-blue-300 text-sm">127 orders today</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Navigation Sidebar */}
        <Navigation activeModule={activeModule} onModuleChange={setActiveModule} />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
