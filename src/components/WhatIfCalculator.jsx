import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Zap, Car, LeafyGreen, Settings2, TreePine } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from 'recharts';
import { useAppContext } from '../context/AppContext';

const scenarios = [
  { id: 'ev', title: 'Switch to Electric Vehicle', icon: Car, impact: 25 },
  { id: 'solar', title: 'Install Solar Panels', icon: Zap, impact: 30 },
  { id: 'vegan', title: 'Adopt a Vegan Diet', icon: LeafyGreen, impact: 20 },
];

const WhatIfCalculator = () => {
  const { userData } = useAppContext();
  const [activeScenarios, setActiveScenarios] = useState([]);
  const [drivingReduction, setDrivingReduction] = useState(0); // miles

  const toggleScenario = (id) => {
    if (activeScenarios.includes(id)) {
      setActiveScenarios(activeScenarios.filter(s => s !== id));
    } else {
      setActiveScenarios([...activeScenarios, id]);
    }
  };

  const currentScore = userData.currentScore;
  
  const togglesSavings = activeScenarios.reduce((acc, curr) => {
    const scenario = scenarios.find(s => s.id === curr);
    return acc + (scenario ? scenario.impact : 0);
  }, 0);
  
  // Calculate savings from driving slider (0.1 pt per mile reduced)
  const drivingSavings = Math.round(drivingReduction * 0.1);
  const totalProjectedSavings = togglesSavings + drivingSavings;
  const projectedScore = Math.max(0, currentScore - totalProjectedSavings);

  // Yearly projection logic: assuming 1 pt = 1 kg CO2/month.
  const yearlySavingsKg = totalProjectedSavings * 12;
  const treesEquivalent = Math.round(yearlySavingsKg / 22); // A mature tree absorbs ~22kg of CO2/year

  const chartData = [
    { name: 'Current', score: currentScore, color: 'var(--color-danger)' },
    { name: 'Projected', score: projectedScore, color: 'var(--color-primary)' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 overflow-hidden relative"
    >
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-2 bg-primary/20 text-primary-dark rounded-xl shadow-inner">
          <Calculator size={24} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight m-0 text-gradient">"What If" Calculator</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        <div className="flex-1 flex flex-col gap-6">
          <div className="card p-6">
            <h3 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-70 flex items-center gap-2">
              <Settings2 size={16} /> Fine-Tune Adjustments
            </h3>
            
            <div className="mb-2 flex justify-between items-end">
              <label htmlFor="driving-reduction" className="font-bold">Reduce Driving (Weekly)</label>
              <span className="font-black text-primary text-xl" aria-live="polite">{drivingReduction} mi</span>
            </div>
            <input 
              id="driving-reduction"
              type="range" 
              min="0" max="200" step="10" 
              value={drivingReduction} 
              onChange={(e) => setDrivingReduction(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs font-bold opacity-50 uppercase tracking-widest">
              <span>0 mi</span>
              <span>200 mi</span>
            </div>
            <AnimatePresence>
              {drivingSavings > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-primary/10 rounded-xl text-primary-dark dark:text-primary-light font-bold text-sm text-center"
                >
                  Saves ~{drivingSavings} pts/month
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-4">
            {scenarios.map((scenario, idx) => {
              const isActive = activeScenarios.includes(scenario.id);
              const Icon = scenario.icon;
              return (
                <motion.button
                  key={scenario.id}
                  role="listitem"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => toggleScenario(scenario.id)}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all shadow-sm relative overflow-hidden group ${isActive ? 'bg-primary/10 border-primary' : 'bg-transparent border-gray-200 dark:border-zinc-800 hover:border-primary'}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeScenarioBg"
                      className="absolute inset-0 bg-primary/5 pointer-events-none"
                    />
                  )}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-3 rounded-full transition-colors ${isActive ? 'bg-primary text-white shadow-lg' : 'bg-black/5 dark:bg-white/10 opacity-70 group-hover:bg-black/10 dark:group-hover:bg-white/20'}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className={`font-extrabold text-lg transition-colors ${isActive ? 'text-primary-dark dark:text-primary-light' : ''}`}>{scenario.title}</h4>
                      <p className="text-xs font-bold opacity-60 uppercase tracking-widest mt-1">Saves {scenario.impact} pts</p>
                    </div>
                  </div>
                  
                  {/* Custom Toggle Switch */}
                  <div className={`w-14 h-8 rounded-full relative transition-colors shadow-inner relative z-10 ${isActive ? 'bg-primary' : 'bg-black/20 dark:bg-white/20'}`}>
                    <motion.div 
                      layout
                      className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md flex items-center justify-center"
                      initial={false}
                      animate={{ left: isActive ? '30px' : '4px' }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-primary rounded-full" />}
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 card p-8 flex flex-col">
          <h3 className="text-sm uppercase tracking-widest font-bold mb-8 opacity-70 text-center">Impact Projection</h3>
          
          <div className="w-full flex-1 min-h-[300px] relative">
            {totalProjectedSavings > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 z-10 bg-green-500 text-white px-4 py-2 rounded-full font-black text-lg shadow-xl border-2 border-white"
              >
                -{totalProjectedSavings} pts!
              </motion.div>
            )}
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 40, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.15)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 16, fill: 'var(--color-text)', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', opacity: 0.5, fontWeight: 'bold' }} dx={-10} />
                <RechartsTooltip cursor={{fill: 'var(--color-card-border)', opacity: 0.2}} contentStyle={{borderRadius: '12px', border: '1px solid var(--color-card-border)', boxShadow: 'var(--shadow-lg)', background: 'var(--color-card-bg)', color: 'var(--color-text)', fontWeight: 'bold'}} itemStyle={{ color: 'var(--color-text)' }} />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} maxBarSize={100} animationDuration={1000}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="score" position="top" fill="var(--color-text)" fontWeight="black" fontSize={20} dy={-10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 text-center bg-black/5 dark:bg-white/5 p-6 rounded-2xl">
            {totalProjectedSavings > 0 ? (
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold text-lg text-primary m-0">Your actions can make a huge difference.</p>
                <div className="flex items-center gap-2 mt-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">
                  <TreePine size={16} /> Over a year, this equals planting ~{treesEquivalent} trees!
                </div>
              </div>
            ) : (
              <p className="opacity-60 text-sm font-bold m-0 uppercase tracking-widest">Adjust settings to see projection.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhatIfCalculator;
