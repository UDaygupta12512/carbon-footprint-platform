import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Award, Star, Zap, Leaf, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

const badges = [
  { id: 'starter', title: 'Eco Starter', desc: 'Complete your first action to begin your journey.', icon: Leaf, requirement: 1, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  { id: 'warrior', title: 'Carbon Warrior', desc: 'Complete 3 actions to prove your dedication.', icon: ShieldAlert, requirement: 3, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 'master', title: 'Efficiency Master', desc: 'Complete 5 actions and optimize your lifestyle.', icon: Zap, requirement: 5, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { id: 'hero', title: 'Earth Hero', desc: 'Complete 10 actions to become a true Earth Hero.', icon: Star, requirement: 10, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' }
];

const Gamification = ({ userData }) => {
  const actionsCount = userData.actions ? userData.actions.length : 0;
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Find next milestone
  const nextBadge = badges.find(b => actionsCount < b.requirement);
  const nextMilestone = nextBadge ? nextBadge.requirement : null;
  const progressToNext = nextMilestone ? (actionsCount / nextMilestone) * 100 : 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#eab308']
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl">
          <Award size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight m-0 text-gradient">Trophy Room</h2>
          <p className="text-sm opacity-60 font-medium">Your collection of eco-achievements</p>
        </div>
      </div>

      {/* Next Milestone Tracker */}
      <div className="card p-6 border-2 border-primary/20 dark:border-primary/10 shadow-md bg-gradient-to-br from-primary/5 to-transparent mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Next Milestone</h3>
            <div className="text-2xl font-black text-gray-800 dark:text-gray-100">
              {nextBadge ? nextBadge.title : "All Unlocked!"}
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-primary">{actionsCount}</span>
            <span className="text-sm font-bold opacity-50"> / {nextMilestone || actionsCount} Quests</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden shadow-inner relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressToNext}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="bg-primary h-full rounded-full relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-white/20" style={{ transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }}></div>
          </motion.div>
        </div>
      </div>

      {/* Trophy Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, idx) => {
          const isUnlocked = actionsCount >= badge.requirement;
          const Icon = badge.icon;

          return (
            <motion.div 
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => {
                if (isUnlocked) {
                  setSelectedBadge(badge);
                  triggerConfetti();
                }
              }}
              className={`relative overflow-hidden cursor-pointer group card border transition-all duration-300 ${isUnlocked ? 'border-gray-200 dark:border-zinc-800 shadow-lg hover:border-primary/50' : 'border-gray-100 dark:border-zinc-800/50 bg-gray-50 dark:bg-zinc-900/50 opacity-75'}`}
            >
              {/* Pedestal Top/Glow for unlocked */}
              {isUnlocked && (
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${badge.bg}`}></div>
              )}

              <div className="p-6 flex flex-col items-center text-center h-full relative z-10">
                <div className="relative mb-6">
                  {/* The Trophy Icon */}
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-inner transition-transform duration-500 ${isUnlocked ? `${badge.bg} group-hover:rotate-12` : 'bg-gray-200 dark:bg-zinc-800'}`}>
                    <Icon size={48} className={isUnlocked ? badge.color : 'text-gray-400'} />
                  </div>
                  
                  {/* Status Indicator */}
                  {isUnlocked ? (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (idx * 0.1), type: "spring" }}
                      className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-800 rounded-full p-1 shadow-sm"
                    >
                      <CheckCircle2 className="text-green-500" size={24} />
                    </motion.div>
                  ) : (
                    <div className="absolute -bottom-2 -right-2 bg-gray-100 dark:bg-zinc-800 rounded-full p-1.5 shadow-sm border border-gray-200 dark:border-zinc-700">
                      <Lock className="text-gray-400" size={16} />
                    </div>
                  )}
                </div>

                <h3 className={`font-bold text-lg mb-2 ${isUnlocked ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-500'}`}>
                  {badge.title}
                </h3>
                <p className="text-xs opacity-60 font-medium mb-4 flex-1">
                  {isUnlocked ? badge.desc : `Requires ${badge.requirement} quests`}
                </p>

                {isUnlocked && (
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to Inspect
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="card w-full max-w-sm p-8 text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${selectedBadge.bg}`}></div>
              
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl ${selectedBadge.bg}`}>
                <selectedBadge.icon size={64} className={selectedBadge.color} />
              </div>
              
              <h2 className="text-3xl font-black mb-2">{selectedBadge.title}</h2>
              <p className="opacity-70 mb-8">{selectedBadge.desc}</p>
              
              <button 
                className="w-full py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl font-bold transition-colors"
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </motion.div>
  );
};

export default Gamification;
