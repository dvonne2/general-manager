
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const RealTimeChart: React.FC = () => {
  const [data, setData] = useState([
    { time: '9:00', orders: 45, revenue: 850 },
    { time: '9:30', orders: 52, revenue: 920 },
    { time: '10:00', orders: 68, revenue: 1100 },
    { time: '10:30', orders: 84, revenue: 1350 },
    { time: '11:00', orders: 97, revenue: 1580 },
    { time: '11:30', orders: 115, revenue: 1820 },
    { time: '12:00', orders: 127, revenue: 2100 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const lastEntry = prev[prev.length - 1];
        const newTime = new Date();
        const timeStr = newTime.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        const newEntry = {
          time: timeStr,
          orders: lastEntry.orders + Math.floor(Math.random() * 5),
          revenue: lastEntry.revenue + Math.floor(Math.random() * 200) + 50
        };
        
        return [...prev.slice(-6), newEntry];
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Real-Time Performance</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Live</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#3B82F6' }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#10B981' }}
              activeDot={{ r: 6, fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-600">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-blue-400 text-sm">Orders</span>
          </div>
          <span className="text-white font-semibold">{data[data.length - 1]?.orders || 0}</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-green-400 text-sm">Revenue (₦K)</span>
          </div>
          <span className="text-white font-semibold">{data[data.length - 1]?.revenue || 0}</span>
        </div>
      </div>
    </div>
  );
};
