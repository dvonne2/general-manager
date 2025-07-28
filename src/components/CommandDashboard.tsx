
import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { CriticalAlertsPanel } from './CriticalAlertsPanel';
import { RealTimeChart } from './RealTimeChart';
import { 
  ShoppingCart, 
  Shield, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  MapPin,
  Clock,
  MessageSquare,
  CreditCard,
  Ghost,
  AlertTriangle,
  Brain
} from 'lucide-react';

interface CommandDashboardProps {
  onModuleChange: (module: string) => void;
}

export const CommandDashboard: React.FC<CommandDashboardProps> = ({ onModuleChange }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    orders: 127,
    fraudAlerts: 3,
    stockAlerts: 5,
    revenue: 2.1,
    activeDA: 8,
    deliveryRate: 85,
    paidOrders: 89,
    otpDeliveries: 67,
    ghostedOrders: 22,
    paymentMismatches: 540,
    whatsappAlerts: 12
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        orders: prev.orders + Math.floor(Math.random() * 3),
        revenue: prev.revenue + (Math.random() * 0.1),
        deliveryRate: Math.max(80, Math.min(95, prev.deliveryRate + (Math.random() * 4 - 2))),
        whatsappAlerts: prev.whatsappAlerts + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: "Orders Received Today",
      value: liveMetrics.orders,
      trend: "+12%",
      prediction: `Est. ${liveMetrics.orders + 18} by EOD`,
      icon: ShoppingCart,
      color: "blue" as const,
      alert: false,
      onClick: () => onModuleChange('multistate')
    },
    {
      title: "Orders Paid (Confirmed)",
      value: liveMetrics.paidOrders,
      trend: "-3%",
      prediction: "Moniepoint verified",
      icon: CreditCard,
      color: "green" as const,
      alert: false,
      onClick: () => onModuleChange('financial')
    },
    {
      title: "OTP-Confirmed Deliveries",
      value: liveMetrics.otpDeliveries,
      trend: "+8%",
      prediction: "Target: 75 today",
      icon: Package,
      color: "purple" as const,
      alert: false,
      onClick: () => onModuleChange('multistate')
    },
    {
      title: "Ghosted Orders",
      value: liveMetrics.ghostedOrders,
      trend: "Critical",
      prediction: "Esther: 90% rate",
      icon: Ghost,
      color: "red" as const,
      alert: true,
      onClick: () => onModuleChange('fraud')
    },
    {
      title: "Overall Delivery Rate",
      value: `${liveMetrics.deliveryRate}%`,
      trend: "-5%",
      prediction: "Target: 85%",
      icon: TrendingUp,
      color: "yellow" as const,
      alert: false,
      onClick: () => onModuleChange('multistate')
    },
    {
      title: "Payment Mismatches",
      value: `₦${liveMetrics.paymentMismatches}k`,
      trend: "Urgent",
      prediction: "3hrs to resolve",
      icon: AlertTriangle,
      color: "orange" as const,
      alert: true,
      onClick: () => onModuleChange('fraud')
    },
    {
      title: "AI Fraud Alerts",
      value: liveMetrics.fraudAlerts,
      trend: "Critical",
      prediction: "₦180k at risk",
      icon: Shield,
      color: "red" as const,
      alert: true,
      onClick: () => onModuleChange('fraud')
    },
    {
      title: "WhatsApp Alerts Sent",
      value: liveMetrics.whatsappAlerts,
      trend: "Active",
      prediction: "GM notified",
      icon: MessageSquare,
      color: "cyan" as const,
      alert: false,
      onClick: () => onModuleChange('communication')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-4">Executive Command Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts */}
        <div className="lg:col-span-2">
          <CriticalAlertsPanel />
        </div>
        
        {/* Real-time Performance Chart */}
        <div>
          <RealTimeChart />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onModuleChange('fraud')}
            className="bg-red-500/20 border border-red-400/50 text-red-300 p-4 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <Shield className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Fraud Center</span>
          </button>
          <button 
            onClick={() => onModuleChange('communication')}
            className="bg-blue-500/20 border border-blue-400/50 text-blue-300 p-4 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <MessageSquare className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Send Alerts</span>
          </button>
          <button 
            onClick={() => onModuleChange('predictive')}
            className="bg-purple-500/20 border border-purple-400/50 text-purple-300 p-4 rounded-lg hover:bg-purple-500/30 transition-colors"
          >
            <TrendingUp className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Predictions</span>
          </button>
          <button 
            onClick={() => onModuleChange('multistate')}
            className="bg-green-500/20 border border-green-400/50 text-green-300 p-4 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            <MapPin className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">State Ops</span>
          </button>
        </div>
      </div>
    </div>
  );
};
