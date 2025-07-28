
import React, { useState } from 'react';
import { MessageSquare, Send, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export const CommunicationHub: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('CRITICAL_FRAUD');

  const alertTemplates = {
    CRITICAL_FRAUD: {
      name: "Critical Fraud Alert",
      sms: "🚨 FRAUD ALERT: {staffName} - {amount} mismatch. Action needed immediately. Login: vitalvida.com/gm",
      whatsapp: "🚨 *CRITICAL FRAUD DETECTED*\n\nStaff: {staffName}\nAmount: {amount}\nAction: {autoAction}\n\nView details: {portalLink}",
      priority: "critical",
      recipients: ["GM_PRIMARY", "COO_BACKUP"]
    },
    STOCK_CRITICAL: {
      name: "Stock Emergency",
      sms: "📦 STOCK ALERT: {location} {product} runs out in {days} days. Revenue risk: {amount}",
      whatsapp: "📦 *STOCK EMERGENCY*\n\nLocation: {location}\nProduct: {product}\nDays left: {days}\nRevenue at risk: {amount}\n\nTake action now!",
      priority: "high",
      recipients: ["GM_PRIMARY", "SUPPLY_TEAM"]
    },
    DA_STAGNANT: {
      name: "DA Performance Issue",
      sms: "⚠️ DA ALERT: {daName} no movement {days} days. Stock: {amount}. Call immediately.",
      whatsapp: "⚠️ *DA PERFORMANCE ISSUE*\n\nDA: {daName}\nNo movement: {days} days\nStock value: {amount}\n\n📞 Call now or auto-redistribute?",
      priority: "medium",
      recipients: ["GM_PRIMARY"]
    }
  };

  const recentMessages = [
    {
      id: 1,
      type: "SMS",
      template: "CRITICAL_FRAUD",
      recipient: "+234-XXX-1234 (GM)",
      status: "delivered",
      timestamp: "10:15 AM",
      response: "Acknowledged - Taking action"
    },
    {
      id: 2,
      type: "WhatsApp",
      template: "STOCK_CRITICAL",
      recipient: "+234-XXX-5678 (Supply Team)",
      status: "delivered",
      timestamp: "9:45 AM",
      response: "Order placed - ETA 6 hours"
    },
    {
      id: 3,
      type: "SMS",
      template: "DA_STAGNANT",
      recipient: "+234-XXX-9012 (GM)",
      status: "pending",
      timestamp: "9:30 AM",
      response: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-yellow-500 bg-yellow-500/10';
      case 'medium': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold flex items-center space-x-3">
          <MessageSquare className="w-8 h-8 text-blue-400" />
          <span>eBulkSMS Communication Hub</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-400 text-sm font-semibold">● Connected</span>
          </div>
          <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
            <span className="text-blue-400 text-sm font-semibold">Balance: ₦45,230</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Templates */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Alert Templates Manager</h3>
          
          <div className="space-y-4">
            {Object.entries(alertTemplates).map(([key, template]) => (
              <div 
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${getPriorityColor(template.priority)} ${
                  selectedTemplate === key ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{template.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(template.priority)}`}>
                    {template.priority.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">
                    <span className="text-blue-400 font-medium">SMS:</span> {template.sms.substring(0, 80)}...
                  </div>
                  <div className="text-gray-300 text-sm">
                    <span className="text-green-400 font-medium">WhatsApp:</span> {template.whatsapp.split('\n')[0]}...
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    Recipients: {template.recipients.join(', ')}
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                    Edit Template
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-600">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send Test Alert</span>
            </button>
          </div>
        </div>

        {/* Recent Messages & Status */}
        <div className="space-y-6">
          {/* API Status Panel */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">eBulkSMS API Status</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">99.8%</div>
                <div className="text-gray-300 text-sm">Uptime Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">24ms</div>
                <div className="text-gray-300 text-sm">Avg Latency</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">SMS Delivery Rate</span>
                <span className="text-green-400 font-semibold">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">WhatsApp Delivery Rate</span>
                <span className="text-green-400 font-semibold">99.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Queue Status</span>
                <span className="text-blue-400 font-semibold">Empty</span>
              </div>
            </div>
          </div>

          {/* Recent Messages Log */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Recent Messages</h3>
            
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {message.type === 'SMS' ? (
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Phone className="w-4 h-4 text-green-400" />
                      )}
                      <span className="text-white font-medium">{message.type}</span>
                      <span className="text-gray-400 text-sm">{alertTemplates[message.template as keyof typeof alertTemplates].name}</span>
                    </div>
                    <span className={`text-sm flex items-center space-x-1 ${getStatusColor(message.status)}`}>
                      {message.status === 'delivered' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      <span>{message.status}</span>
                    </span>
                  </div>
                  
                  <div className="text-gray-300 text-sm mb-2">
                    To: {message.recipient}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{message.timestamp}</span>
                    {message.response && (
                      <span className="text-green-400 text-xs">💬 {message.response}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Escalation Rules */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Auto-Escalation Rules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="border border-gray-600 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Critical Fraud Alert</h4>
              <p className="text-gray-300 text-sm mb-2">If GM doesn't respond within 15 minutes</p>
              <p className="text-yellow-400 text-sm">{'->'} Auto-escalate to COO via SMS + WhatsApp</p>
            </div>
            
            <div className="border border-gray-600 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Stock Emergency</h4>
              <p className="text-gray-300 text-sm mb-2">If no action within 1 hour</p>
              <p className="text-yellow-400 text-sm">{'->'} Call GM directly + Escalate to COO</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-600 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">DA Performance Issue</h4>
              <p className="text-gray-300 text-sm mb-2">If no response within 2 hours</p>
              <p className="text-yellow-400 text-sm">{'->'} Auto-redistribute 50% of DA stock</p>
            </div>
            
            <div className="border border-gray-600 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">System Down</h4>
              <p className="text-gray-300 text-sm mb-2">If portal offline {'>'} 5 minutes</p>
              <p className="text-red-400 text-sm">{'->'} Emergency SMS to GM + COO + CTO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
