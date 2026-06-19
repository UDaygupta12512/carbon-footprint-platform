import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react';

const CarbonBudget = ({ userData }) => {
  const monthlyAllowance = 80; // Hardcoded allowance for demo purposes
  const currentUsage = userData.currentScore;
  const isOverBudget = currentUsage > monthlyAllowance;
  const percentageUsed = Math.min(100, (currentUsage / monthlyAllowance) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Wallet className="text-primary" size={28} />
        <h2 className="text-2xl m-0">Monthly Carbon Budget</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center mb-8 relative z-10">
        <div className="flex-1 w-full relative pt-12 pb-8 px-4 card border border-gray-200 dark:border-zinc-800 shadow-sm">
          {/* Progress Bar Container */}
          <div className="w-full h-10 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-700 relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentageUsed}%` }}
              transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
              className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-primary'}`}
            />
          </div>
          
          <div className="flex justify-between mt-4 text-xs font-extrabold uppercase tracking-widest opacity-60 px-2">
            <span>0 pts</span>
            <span>Allowance: {monthlyAllowance} pts</span>
          </div>

          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-2 transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${percentageUsed}%`, transition: 'left 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
          >
            <div className={`px-4 py-2 rounded-xl text-sm font-black text-white shadow-xl mb-1 ${isOverBudget ? 'bg-red-600' : 'bg-primary-dark'}`}>
              {currentUsage} pts
            </div>
            <div className={`w-3 h-3 rotate-45 ${isOverBudget ? 'bg-red-600' : 'bg-primary-dark'}`}></div>
          </motion.div>
        </div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`p-8 rounded-3xl border min-w-[280px] shadow-xl flex flex-col items-center text-center ${isOverBudget ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-500/30' : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-500/30'}`}
        >
          {isOverBudget ? (
            <>
              <AlertCircle className="text-red-500 mb-4" size={48} />
              <h3 className="text-2xl font-black text-red-700 dark:text-red-400 mb-2">Over Budget</h3>
              <p className="text-base font-medium text-red-600 dark:text-red-300 opacity-90 leading-relaxed">You are {currentUsage - monthlyAllowance} pts over allowance. Try completing actions!</p>
            </>
          ) : (
            <>
              <CheckCircle className="text-green-600 dark:text-green-400 mb-4" size={48} />
              <h3 className="text-2xl font-black text-green-700 dark:text-green-400 mb-2">Under Budget</h3>
              <p className="text-base font-medium text-green-600 dark:text-green-300 opacity-90 leading-relaxed">Great job! You have {monthlyAllowance - currentUsage} pts remaining this month.</p>
            </>
          )}
        </motion.div>
      </div>

      <div className="card p-6 border border-gray-200 dark:border-zinc-800 shadow-sm bg-gray-50 dark:bg-zinc-900/50">
        <h3 className="text-md font-bold mb-3 opacity-80">Tips to stay on track</h3>
        <ul className="list-disc pl-5 space-y-2 opacity-80 text-sm font-medium">
          <li>Check the <strong>Action Center</strong> daily to find high-impact quick wins.</li>
          <li>Plan your meals ahead of time to easily stick to "Meatless Mondays".</li>
          <li>Carpool or take public transit at least once a week to drastically reduce transport emissions.</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default CarbonBudget;
