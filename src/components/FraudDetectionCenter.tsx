
import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Ban, Phone } from 'lucide-react';

export const FraudDetectionCenter: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);

  const fraudPatterns = [
    {
      id: 1,
      type: "PAYMENT_FRAUD",
      confidence: 97,
      description: "Esther: 3 orders marked paid, ₦0 Moniepoint match",
      riskAmount: "₦97,500",
      action: "Payouts frozen automatically",
      evidence: ["No OTP confirmations", "Same customer phone pattern", "Payment timing anomaly"],
      timestamp: "10:15 AM",
      staff: "Esther",
      status: "auto_blocked"
    },
    {
      id: 2,
      type: "DELIVERY_FRAUD", 
      confidence: 89,
      description: "Musa: Stock decreasing without OTP confirmations",
      riskAmount: "₦82,500",
      action: "Stock replenishment blocked",
      evidence: ["6 days no delivery photos", "Stock count inconsistency", "No customer OTP logs"],
      timestamp: "9:30 AM",
      staff: "Musa",
      status: "investigating"
    },
    {
      id: 3,
      type: "GHOST_ORDER_PATTERN",
      confidence: 93,
      description: "Phone number +234-XXX-1234 placed 4 orders, different names",
      riskAmount: "₦130,000",
      action: "Phone number auto-blocked",
      evidence: ["Same delivery address", "Instant payment claims", "No pickup attempts"],
      timestamp: "8:45 AM",
      staff: "Multiple",
      status: "blocked"
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-red-400 bg-red-500/20';
    if (confidence >= 85) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-blue-400 bg-blue-500/20';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'auto_blocked': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'investigating': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'blocked': return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold flex items-center space-x-3">
          <Shield className="w-8 h-8 text-red-400" />
          <span>AI Fraud Detection Engine</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-400 text-sm font-semibold">97% Accuracy Rate</span>
          </div>
          <div className="bg-red-500/20 px-4 py-2 rounded-lg">
            <span className="text-red-400 text-sm font-semibold">₦310K Protected Today</span>
          </div>
        </div>
      </div>

      {/* AI Confidence Panel */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Machine Learning Confidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">97%</div>
            <div className="text-gray-300 text-sm">Pattern Recognition</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">89%</div>
            <div className="text-gray-300 text-sm">Behavioral Analysis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
            <div className="text-gray-300 text-sm">Risk Assessment</div>
          </div>
        </div>
      </div>

      {/* Fraud Patterns Table */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Detected Fraud Patterns</h3>
        
        <div className="space-y-4">
          {fraudPatterns.map((pattern) => (
            <div key={pattern.id} className="border border-gray-600 rounded-lg p-4 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <h4 className="text-white font-semibold">{pattern.type.replace('_', ' ')}</h4>
                    <p className="text-gray-300 text-sm">{pattern.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full ${getConfidenceColor(pattern.confidence)}`}>
                    <span className="text-sm font-semibold">{pattern.confidence}%</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full border ${getStatusColor(pattern.status)}`}>
                    <span className="text-xs font-medium">{pattern.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-gray-400 text-xs">Risk Amount</span>
                  <div className="text-red-400 font-bold">{pattern.riskAmount}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Staff Involved</span>
                  <div className="text-white">{pattern.staff}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Detected</span>
                  <div className="text-white">{pattern.timestamp}</div>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-green-400 text-sm">✓ Auto-Action: {pattern.action}</span>
              </div>
              
              <details className="text-sm">
                <summary className="text-blue-400 cursor-pointer hover:text-blue-300">Evidence Details</summary>
                <ul className="mt-2 ml-4 space-y-1">
                  {pattern.evidence.map((item, index) => (
                    <li key={index} className="text-gray-300">• {item}</li>
                  ))}
                </ul>
              </details>
              
              <div className="flex space-x-2 mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Investigate</span>
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors flex items-center space-x-2">
                  <Ban className="w-4 h-4" />
                  <span>Block Staff</span>
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call GM</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* eBulkSMS Alert Status */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Alert Communication Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">SMS Alerts Sent Today</span>
              <span className="text-green-400 font-semibold">12 ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">WhatsApp Alerts</span>
              <span className="text-green-400 font-semibold">8 ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Average Response Time</span>
              <span className="text-blue-400 font-semibold">3.2 minutes</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">eBulkSMS API Status</span>
              <span className="text-green-400 font-semibold flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Connected</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Message Queue</span>
              <span className="text-blue-400 font-semibold">Empty</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Balance</span>
              <span className="text-yellow-400 font-semibold">₦45,230</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
