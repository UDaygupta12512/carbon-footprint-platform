import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Check, Plus, Bike, Zap, Apple } from 'lucide-react';
import toast from 'react-hot-toast';

const actionsList = [
  { id: 1, title: 'Meatless Day', points: -50, category: 'Diet', icon: Apple },
  { id: 2, title: 'Bike to Work', points: -30, category: 'Transport', icon: Bike },
  { id: 3, title: 'Line Dry Clothes', points: -20, category: 'Energy', icon: Zap },
  { id: 4, title: 'Vegan Meal', points: -15, category: 'Diet', icon: Apple },
  { id: 5, title: 'Carpool', points: -25, category: 'Transport', icon: Bike },
  { id: 6, title: 'LED Bulbs', points: -10, category: 'Energy', icon: Zap },
];

const ActionCenter = ({ userData, onUpdate }) => {
  const [completedActions, setCompletedActions] = useState(userData.actions || []);
  const [filter, setFilter] = useState('All');

  const handleAction = (action) => {
    if (completedActions.includes(action.id)) return;
    
    const newActions = [...completedActions, action.id];
    setCompletedActions(newActions);
    const newScore = userData.currentScore + action.points;
    onUpdate(newScore, newActions);
    
    // Add micro-interaction feedback
    toast.success(`Quest Completed: ${action.title}!`, {
      icon: '🌱',
    });
  };

  const categories = ['All', 'Diet', 'Transport', 'Energy'];
  
  const filteredActions = actionsList.filter(a => filter === 'All' || a.category === filter);
  const activeActions = filteredActions.filter(a => !completedActions.includes(a.id));
  const finishedActions = filteredActions.filter(a => completedActions.includes(a.id));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="text-primary" size={28} />
        <h2 className="text-2xl m-0">Action Center</h2>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap border ${filter === cat ? 'bg-primary text-white border-primary shadow-sm' : 'bg-transparent border-gray-200 dark:border-zinc-800 hover:border-primary text-gray-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h3 className="text-sm uppercase tracking-widest opacity-50 font-bold mb-4">Active Quests</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <AnimatePresence>
          {activeActions.map(action => {
            const Icon = action.icon;
            return (
              <motion.div 
                key={action.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between p-4 card hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group border border-gray-200 dark:border-zinc-800"
                onClick={() => handleAction(action)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 dark:bg-primary/30 text-primary-dark dark:text-primary-light rounded-xl">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold m-0">{action.title}</h4>
                    <span className="text-xs opacity-60 font-bold">{action.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">{action.points} pts</span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Plus size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {activeActions.length === 0 && (
          <p className="opacity-50 text-sm p-4 text-center w-full col-span-full">No active quests in this category.</p>
        )}
      </div>

      {finishedActions.length > 0 && (
        <>
          <h3 className="text-sm uppercase tracking-widest opacity-50 font-bold mb-4">Completed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70">
            {finishedActions.map(action => {
              const Icon = action.icon;
              return (
                <motion.div 
                  key={`done-${action.id}`}
                  layout
                  className="flex items-center justify-between p-4 card bg-gray-50 dark:bg-zinc-900 border-dashed border-gray-200 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-500 rounded-xl">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold m-0 text-gray-600 dark:text-gray-400 line-through">{action.title}</h4>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
                    <Check size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ActionCenter;
