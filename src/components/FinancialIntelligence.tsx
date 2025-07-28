
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const FinancialIntelligence: React.FC = () => {
  const [timeframe, setTimeframe] = useState('today');

  const financialMetrics = {
    dailyPL: {
      revenue: "₦2.1M",
      costs: "₦1.4M", 
      profit: "₦700K",
      margin: "33.3%"
    },
    productLinePL: [
      { product: "Shampoo", revenue: 850, margin: 35, trend: "up", cost: 553 },
      { product: "Pomade", revenue: 720, margin: 32, trend: "stable", cost: 490 },
      { product: "Conditioner", revenue: 530, margin: 28, trend: "down", cost: 382 }
    ],
    daEfficiency: [
      { da: "Chioma", revenue: 180, cost: 45, roi: 300, orders: 18, state: "Lagos" },
      { da: "Grace", revenue: 120, cost: 35, roi: 243, orders: 15, state: "Lagos" },
      { da: "Ahmed", revenue: 105, cost: 30, roi: 250, orders: 12, state: "Abuja" },
      { da: "Musa", revenue: 0, cost: 82, roi: -100, orders: 0, state: "Kano" }
    ]
  };

  const revenueData = [
    { time: '6AM', revenue: 120, cost: 80, profit: 40 },
    { time: '8AM', revenue: 280, cost: 180, profit: 100 },
    { time: '10AM', revenue: 450, cost: 290, profit: 160 },
    { time: '12PM', revenue: 680, cost: 420, profit: 260 },
    { time: '2PM', revenue: 920, cost: 580, profit: 340 },
    { time: '4PM', revenue: 1200, cost: 750, profit: 450 },
    { time: '6PM', revenue: 1580, cost: 980, profit: 600 },
    { time: '8PM', revenue: 1850, cost: 1200, profit: 650 },
    { time: 'Now', revenue: 2100, cost: 1400, profit: 700 }
  ];

  const getROIColor = (roi: number) => {
    if (roi >= 250) return 'text-green-400';
    if (roi >= 150) return 'text-yellow-400';
    if (roi > 0) return 'text-orange-400';
    return 'text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold flex items-center space-x-3">
          <DollarSign className="w-8 h-8 text-green-400" />
          <span>Financial Intelligence Module</span>
        </h2>
        <div className="flex items-center space-x-4">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <div className="bg-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-400 text-sm font-semibold">Profit: {financialMetrics.dailyPL.profit}</span>
          </div>
        </div>
      </div>

      {/* Real-time P&L Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span className="text-gray-300 font-medium">Revenue</span>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">{financialMetrics.dailyPL.revenue}</div>
          <div className="text-green-400 text-sm">+23% from yesterday</div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-6 h-6 text-red-400" />
            <span className="text-gray-300 font-medium">Costs</span>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-1">{financialMetrics.dailyPL.costs}</div>
          <div className="text-yellow-400 text-sm">+15% from yesterday</div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className="text-gray-300 font-medium">Profit</span>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-1">{financialMetrics.dailyPL.profit}</div>
          <div className="text-green-400 text-sm">+35% from yesterday</div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <PieChart className="w-6 h-6 text-purple-400" />
            <span className="text-gray-300 font-medium">Margin</span>
          </div>
          <div className="text-3xl font-bold text-purple-400 mb-1">{financialMetrics.dailyPL.margin}</div>
          <div className="text-green-400 text-sm">+2.1% improvement</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Revenue Chart */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Real-time P&L Tracking</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Live</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} name="Costs" />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Line Profitability */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Product Line Performance</h3>
          
          <div className="space-y-4">
            {financialMetrics.productLinePL.map((product, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-semibold">{product.product}</span>
                    <span className="text-2xl">{getTrendIcon(product.trend)}</span>
                  </div>
                  <span className="text-green-400 font-semibold">₦{product.revenue}K</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-400 text-xs">Revenue</span>
                    <div className="text-blue-400 font-semibold">₦{product.revenue}K</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Cost</span>
                    <div className="text-red-400 font-semibold">₦{product.cost}K</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Margin</span>
                    <div className="text-purple-400 font-semibold">{product.margin}%</div>
                  </div>
                </div>
                
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" 
                    style={{ width: `${product.margin}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DA ROI Analysis */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Delivery Agent ROI Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {financialMetrics.daEfficiency.map((da, index) => (
            <div 
              key={index} 
              className={`border rounded-lg p-4 ${
                da.roi < 0 ? 'border-red-500 bg-red-500/10' : 
                da.roi >= 250 ? 'border-green-500 bg-green-500/10' : 
                'border-yellow-500 bg-yellow-500/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{da.da}</h4>
                  <p className="text-gray-400 text-xs">{da.state}</p>
                </div>
                <div className={`text-lg font-bold ${getROIColor(da.roi)}`}>
                  {da.roi > 0 ? '+' : ''}{da.roi}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Revenue</span>
                  <span className="text-green-400 font-semibold">₦{da.revenue}K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Cost</span>
                  <span className="text-red-400 font-semibold">₦{da.cost}K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Orders</span>
                  <span className="text-blue-400 font-semibold">{da.orders}</span>
                </div>
              </div>
              
              {da.roi < 0 && (
                <div className="mt-3 p-2 bg-red-900/30 rounded text-xs text-red-300">
                  ⚠️ Loss-making DA - Immediate action required
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Financial Optimization Alerts</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li className="text-red-400">🚨 Musa is loss-making: -₦82K cost with ₦0 revenue</li>
            <li className="text-green-400">✅ Chioma is top performer: 300% ROI</li>
            <li className="text-yellow-400">⚠️ Focus Lagos market: 67% of total profit</li>
            <li className="text-blue-400">📈 Shampoo line most profitable at 35% margin</li>
          </ul>
        </div>
      </div>

      {/* Cost Optimization Suggestions */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">AI-Powered Cost Optimization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-blue-400 font-semibold">Immediate Actions (₦150K+ savings)</h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-300 font-semibold">Cut Musa's costs immediately</p>
                <p className="text-gray-300 text-sm">Save ₦82K/day by freezing Kano operations</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                <p className="text-yellow-300 font-semibold">Optimize conditioner pricing</p>
                <p className="text-gray-300 text-sm">Increase margin from 28% to 32% (+₦40K/day)</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-green-300 font-semibold">Scale Chioma's operations</p>
                <p className="text-gray-300 text-sm">Double her territory for +₦180K revenue</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-purple-400 font-semibold">Strategic Recommendations</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                <p className="text-blue-300 font-semibold">Focus on high-margin products</p>
                <p className="text-gray-300 text-sm">Shampoo line generates 40% of profits</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/50 rounded-lg">
                <p className="text-purple-300 font-semibold">DA performance-based pay</p>
                <p className="text-gray-300 text-sm">Reward top performers, cut underperformers</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-green-300 font-semibold">Market expansion timing</p>
                <p className="text-gray-300 text-sm">Lagos ready for 2 more DAs, high ROI potential</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
