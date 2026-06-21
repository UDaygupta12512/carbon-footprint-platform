import React from 'react';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon, TrendingDown, Activity, Info } from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#3b82f6', '#22c55e', '#eab308', '#ec4899'];

const historicalData = [
  { name: 'Jan', impact: 400 },
  { name: 'Feb', impact: 380 },
  { name: 'Mar', impact: 350 },
  { name: 'Apr', impact: 280 },
  { name: 'May', impact: 290 },
  { name: 'Jun', impact: 220 },
];

const categoryData = [
  { name: 'Transport', value: 45 },
  { name: 'Diet', value: 30 },
  { name: 'Home Energy', value: 15 },
  { name: 'Shopping', value: 10 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-xl">
        <p className="font-bold mb-1">{label || payload[0].name}</p>
        <p className="text-sm flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].fill || payload[0].color }}></span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {payload[0].value} {payload[0].name === 'impact' || !payload[0].name ? 'pts' : '%'}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  // If we had real historical data, we'd process userData here.
  // We're using realistic mock data to demonstrate the visual layout.
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="card p-6 md:p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 text-primary-dark rounded-xl shadow-inner">
            <PieChartIcon size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight m-0 text-gradient">Detailed Analytics</h2>
            <p className="text-sm opacity-60 font-medium mt-1">Deep dive into your carbon footprint data</p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pie Chart: Emissions Breakdown */}
        <div className="card p-6 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-primary" size={20} />
            <h3 className="font-bold text-lg">Emissions Breakdown</h3>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm font-semibold">
                <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="opacity-80">{entry.name}</span>
                <span className="ml-auto opacity-50">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: 6-Month Trend */}
        <div className="card p-6 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="text-green-500" size={20} />
            <h3 className="font-bold text-lg">6-Month Impact Trend</h3>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-card-border)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-text)', opacity: 0.5, fontSize: 12, fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-text)', opacity: 0.5, fontSize: 12, fontWeight: 600 }} 
                />
                <RechartsTooltip cursor={{ fill: 'var(--color-card-border)', opacity: 0.4 }} content={<CustomTooltip />} />
                <Bar dataKey="impact" radius={[6, 6, 0, 0]}>
                  {historicalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === historicalData.length - 1 ? 'var(--color-primary)' : 'var(--color-card-border)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-900/30 flex gap-3">
            <Info className="text-green-600 dark:text-green-400 shrink-0" size={20} />
            <p className="text-sm font-medium text-green-800 dark:text-green-300 m-0">
              Your impact has decreased by <strong>45%</strong> since January. Keep up the great work!
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Analytics;
