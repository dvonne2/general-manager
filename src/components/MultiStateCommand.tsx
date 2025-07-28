
import React, { useState } from 'react';
import { MapPin, Users, Package, TrendingUp, Phone, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const MultiStateCommand: React.FC = () => {
  const [selectedState, setSelectedState] = useState('Lagos');

  const stateData = [
    {
      state: "Lagos",
      orders: 45,
      das: 3,
      deliveryRate: 85,
      revenue: "₦1.2M",
      prediction: "Shampoo shortage in 2 days",
      alerts: ["Chioma performing excellently", "VI area saturated"],
      trend: "up",
      dasDetails: [
        { name: "Chioma", orders: 18, revenue: "₦540K", performance: 95, status: "excellent" },
        { name: "Grace", orders: 15, revenue: "₦450K", performance: 88, status: "good" },
        { name: "Ifeanyi", orders: 12, revenue: "₦210K", performance: 72, status: "average" }
      ],
      demographics: {
        highIncome: 40,
        middleIncome: 45,
        budget: 15
      }
    },
    {
      state: "Kano", 
      orders: 28,
      das: 0,
      deliveryRate: 0,
      revenue: "-₦420K",
      prediction: "Critical - needs 2 DAs by Friday",
      alerts: ["Zero coverage", "Musa non-responsive"],
      trend: "critical",
      dasDetails: [
        { name: "Musa", orders: 0, revenue: "₦0K", performance: 0, status: "non-responsive" }
      ],
      demographics: {
        highIncome: 20,
        middleIncome: 50,
        budget: 30
      }
    },
    {
      state: "Abuja",
      orders: 32,
      das: 2,
      deliveryRate: 70,
      revenue: "₦680K",
      prediction: "Need 1 additional DA",
      alerts: ["Growing demand", "Weekend coverage gap"],
      trend: "up",
      dasDetails: [
        { name: "Ahmed", orders: 20, revenue: "₦420K", performance: 82, status: "good" },
        { name: "Sarah", orders: 12, revenue: "₦260K", performance: 75, status: "average" }
      ],
      demographics: {
        highIncome: 55,
        middleIncome: 35,
        budget: 10
      }
    }
  ];

  const selectedStateData = stateData.find(state => state.state === selectedState);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400 bg-green-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'down': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-400';
    if (performance >= 75) return 'text-yellow-400';
    if (performance > 0) return 'text-orange-400';
    return 'text-red-400';
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold flex items-center space-x-3">
          <MapPin className="w-8 h-8 text-green-400" />
          <span>Multi-State Operations Command</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
            <span className="text-blue-400 text-sm font-semibold">3 States Active</span>
          </div>
          <div className="bg-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-400 text-sm font-semibold">5 DAs Online</span>
          </div>
        </div>
      </div>

      {/* State Selection & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stateData.map((state) => (
          <div 
            key={state.state}
            onClick={() => setSelectedState(state.state)}
            className={`bg-slate-800/30 backdrop-blur-sm border cursor-pointer rounded-xl p-6 transition-all duration-200 hover:scale-105 ${
              selectedState === state.state ? 'border-blue-400 ring-2 ring-blue-400/50' : 'border-blue-400/30'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">{state.state}</h3>
              <div className={`px-3 py-1 rounded-full ${getTrendColor(state.trend)}`}>
                <span className="text-xs font-semibold">{state.trend.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{state.orders}</div>
                <div className="text-gray-300 text-xs">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{state.das}</div>
                <div className="text-gray-300 text-xs">Active DAs</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Delivery Rate</span>
                <span className={`text-sm font-semibold ${state.deliveryRate > 80 ? 'text-green-400' : 'text-red-400'}`}>
                  {state.deliveryRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300 text-sm">Revenue</span>
                <span className={`text-sm font-semibold ${state.revenue.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                  {state.revenue}
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
              <p className="text-yellow-400 text-xs font-semibold">📊 {state.prediction}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed State Analysis */}
      {selectedStateData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DA Performance Breakdown */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">
              {selectedState} - DA Performance Analysis
            </h3>
            
            <div className="space-y-4">
              {selectedStateData.dasDetails.map((da, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">{da.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${getPerformanceColor(da.performance)}`}>
                        {da.performance}%
                      </span>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                        <Phone className="w-3 h-3 inline mr-1" />
                        Call
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-400 text-xs">Orders</span>
                      <div className="text-white font-semibold">{da.orders}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Revenue</span>
                      <div className="text-green-400 font-semibold">{da.revenue}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Status</span>
                      <div className={`text-sm font-semibold ${
                        da.status === 'excellent' ? 'text-green-400' :
                        da.status === 'good' ? 'text-blue-400' :
                        da.status === 'average' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {da.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Demographics & Market Analysis */}
          <div className="space-y-6">
            {/* Demographics Chart */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Customer Demographics</h3>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'High Income', value: selectedStateData.demographics.highIncome },
                        { name: 'Middle Income', value: selectedStateData.demographics.middleIncome },
                        { name: 'Budget', value: selectedStateData.demographics.budget }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'High Income', value: selectedStateData.demographics.highIncome },
                        { name: 'Middle Income', value: selectedStateData.demographics.middleIncome },
                        { name: 'Budget', value: selectedStateData.demographics.budget }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-around mt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <span className="text-blue-400 text-sm">High Income</span>
                  </div>
                  <span className="text-white font-semibold">{selectedStateData.demographics.highIncome}%</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span className="text-green-400 text-sm">Middle Income</span>
                  </div>
                  <span className="text-white font-semibold">{selectedStateData.demographics.middleIncome}%</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span className="text-yellow-400 text-sm">Budget</span>
                  </div>
                  <span className="text-white font-semibold">{selectedStateData.demographics.budget}%</span>
                </div>
              </div>
            </div>

            {/* State Alerts & Predictions */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
              <h3 className="text-white text-lg font-semibold mb-4">State Alerts & Insights</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Prediction</span>
                  </div>
                  <p className="text-white text-sm">{selectedStateData.prediction}</p>
                </div>
                
                {selectedStateData.alerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-400 font-semibold text-sm">Alert</span>
                    </div>
                    <p className="text-white text-sm">{alert}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors">
                  Send WhatsApp Update to {selectedState} Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cross-State Comparison */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Cross-State Performance Comparison</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="state" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Bar dataKey="orders" fill="#3B82F6" name="Orders" />
              <Bar dataKey="deliveryRate" fill="#10B981" name="Delivery Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Regional Optimization Suggestions</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Redistribute 1 DA from Lagos to Kano immediately</li>
            <li>• Focus recruitment on Abuja and Kano markets</li>
            <li>• Lagos showing signs of market saturation in VI area</li>
            <li>• Emergency protocol: Kano needs intervention within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
