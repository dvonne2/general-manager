
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Package, Users, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const PredictiveAnalytics: React.FC = () => {
  const predictions = [
    {
      id: 1,
      category: "INVENTORY",
      prediction: "Lagos Shampoo stockout in 2.3 days",
      confidence: 94,
      impact: "₦420k revenue at risk",
      recommendation: "Order 200 units immediately",
      autoAction: "Supplier SMS sent at 9:45 AM",
      priority: "critical",
      data: [
        { day: 'Today', current: 45, predicted: 45, required: 80 },
        { day: 'Tomorrow', current: 25, predicted: 28, required: 80 },
        { day: 'Day 3', current: 5, predicted: 8, required: 80 },
        { day: 'Day 4', current: 0, predicted: 0, required: 80 }
      ]
    },
    {
      id: 2,
      category: "STAFFING",
      prediction: "Kano needs 2 DAs by Friday",
      confidence: 87,
      impact: "28 orders will fail delivery",
      recommendation: "Emergency recruitment activated",
      autoAction: "WhatsApp sent to recruitment team",
      priority: "high",
      data: [
        { day: 'Mon', demand: 25, capacity: 20, gap: -5 },
        { day: 'Tue', demand: 30, capacity: 20, gap: -10 },
        { day: 'Wed', demand: 35, capacity: 20, gap: -15 },
        { day: 'Thu', demand: 42, capacity: 20, gap: -22 },
        { day: 'Fri', demand: 50, capacity: 20, gap: -30 }
      ]
    },
    {
      id: 3,
      category: "PERFORMANCE",
      prediction: "Chuka's ghost rate trending to 65%",
      confidence: 91,
      impact: "₦85k weekly revenue loss",
      recommendation: "Schedule training session",
      autoAction: "Performance review scheduled",
      priority: "medium",
      data: [
        { week: 'W1', rate: 45, trend: 50 },
        { week: 'W2', rate: 52, trend: 55 },
        { week: 'W3', rate: 58, trend: 60 },
        { week: 'W4', rate: 62, trend: 65 }
      ]
    }
  ];

  const [selectedPrediction, setSelectedPrediction] = useState(predictions[0]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-yellow-500 bg-yellow-500/10';
      case 'medium': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold flex items-center space-x-3">
          <Brain className="w-8 h-8 text-purple-400" />
          <span>Predictive Analytics Dashboard</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="bg-purple-500/20 px-4 py-2 rounded-lg">
            <span className="text-purple-400 text-sm font-semibold">ML Engine Active</span>
          </div>
          <div className="bg-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-400 text-sm font-semibold">91% Average Accuracy</span>
          </div>
        </div>
      </div>

      {/* ML Confidence Indicators */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Machine Learning Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">94%</div>
            <div className="text-gray-300 text-sm">Inventory Predictions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">87%</div>
            <div className="text-gray-300 text-sm">Staffing Forecasts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">91%</div>
            <div className="text-gray-300 text-sm">Performance Trends</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">24hr</div>
            <div className="text-gray-300 text-sm">Prediction Horizon</div>
          </div>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {predictions.map((prediction) => (
          <div 
            key={prediction.id}
            onClick={() => setSelectedPrediction(prediction)}
            className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${getPriorityColor(prediction.priority)} ${
              selectedPrediction.id === prediction.id ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {prediction.category === 'INVENTORY' && <Package className="w-5 h-5 text-blue-400" />}
                {prediction.category === 'STAFFING' && <Users className="w-5 h-5 text-green-400" />}
                {prediction.category === 'PERFORMANCE' && <TrendingUp className="w-5 h-5 text-purple-400" />}
                <span className="text-white font-semibold text-sm">{prediction.category}</span>
              </div>
              <div className={`px-2 py-1 rounded-full ${getConfidenceColor(prediction.confidence)}`}>
                <span className="text-xs font-bold">{prediction.confidence}%</span>
              </div>
            </div>
            
            <h4 className="text-white font-semibold mb-2">{prediction.prediction}</h4>
            <p className="text-red-400 text-sm mb-2">Impact: {prediction.impact}</p>
            <p className="text-blue-400 text-sm mb-2">📋 {prediction.recommendation}</p>
            <p className="text-green-400 text-xs">✓ {prediction.autoAction}</p>
          </div>
        ))}
      </div>

      {/* Detailed Prediction Chart */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">Prediction Analysis: {selectedPrediction.category}</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-sm">Real-time ML Analysis</span>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {selectedPrediction.category === 'INVENTORY' ? (
              <LineChart data={selectedPrediction.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} name="Current Stock" />
                <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                <Line type="monotone" dataKey="required" stroke="#EF4444" strokeWidth={2} name="Required Level" />
              </LineChart>
            ) : selectedPrediction.category === 'STAFFING' ? (
              <BarChart data={selectedPrediction.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Bar dataKey="demand" fill="#EF4444" name="Demand" />
                <Bar dataKey="capacity" fill="#10B981" name="Current Capacity" />
              </BarChart>
            ) : (
              <LineChart data={selectedPrediction.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Line type="monotone" dataKey="rate" stroke="#F59E0B" strokeWidth={2} name="Current Rate" />
                <Line type="monotone" dataKey="trend" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Predicted Trend" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
            <div>
              <h4 className="text-white font-semibold mb-2">AI Recommendation</h4>
              <p className="text-gray-300 text-sm mb-2">{selectedPrediction.recommendation}</p>
              <p className="text-green-400 text-sm">✓ Automated Action: {selectedPrediction.autoAction}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Actions Log */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Automated Actions Triggered Today</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <span className="text-white font-medium">Lagos Stock Alert</span>
              <p className="text-gray-400 text-sm">Supplier SMS sent automatically</p>
            </div>
            <span className="text-green-400 text-sm">9:45 AM ✓</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <span className="text-white font-medium">Kano Recruitment Alert</span>
              <p className="text-gray-400 text-sm">WhatsApp sent to HR team</p>
            </div>
            <span className="text-green-400 text-sm">10:30 AM ✓</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <span className="text-white font-medium">Performance Review</span>
              <p className="text-gray-400 text-sm">Training session scheduled for Chuka</p>
            </div>
            <span className="text-blue-400 text-sm">11:15 AM ⏳</span>
          </div>
        </div>
      </div>
    </div>
  );
};
