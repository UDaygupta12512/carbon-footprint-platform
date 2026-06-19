import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Coins, TreePine, Droplets, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const storeItems = [
  { id: 'tree', title: 'Plant a Real Tree', desc: 'Donate tokens to plant a tree in the Amazon.', cost: 50, icon: TreePine, color: 'text-green-500' },
  { id: 'ocean', title: 'Ocean Theme', desc: 'Unlock the exclusive deep-sea dashboard theme.', cost: 100, icon: Droplets, color: 'text-blue-500' },
  { id: 'border', title: 'Golden Avatar', desc: 'Show off with a premium golden profile border.', cost: 200, icon: Sparkles, color: 'text-yellow-500' }
];

const RewardStore = ({ userData, onUpdateTokens }) => {
  const [purchased, setPurchased] = useState(userData.purchasedItems || []);
  const [loadingItemId, setLoadingItemId] = useState(null);

  const handlePurchase = (item) => {
    if (purchased.includes(item.id)) return;
    
    if (userData.ecoTokens >= item.cost) {
      setLoadingItemId(item.id);
      
      // Simulate network request with skeleton/loading state
      setTimeout(() => {
        const newTokens = userData.ecoTokens - item.cost;
        const newPurchased = [...purchased, item.id];
        setPurchased(newPurchased);
        onUpdateTokens(newTokens, newPurchased);
        setLoadingItemId(null);
        toast.success(`Successfully purchased: ${item.title}!`, { icon: '🎉' });
      }, 800);
      
    } else {
      toast.error("Not enough Eco-Tokens!");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="text-primary" size={28} />
          <h2 className="text-2xl m-0">Reward Store</h2>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full font-bold shadow-sm">
          <Coins size={18} />
          <span>{userData.ecoTokens} Tokens</span>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storeItems.map(item => {
          const isPurchased = purchased.includes(item.id);
          const isLoading = loadingItemId === item.id;
          const canAfford = userData.ecoTokens >= item.cost;
          const Icon = item.icon;

          return (
            <motion.div 
              key={item.id}
              whileHover={!isPurchased && !isLoading ? { scale: 1.02 } : {}}
              className={`p-6 rounded-2xl border flex flex-col items-center text-center transition-all ${isPurchased ? 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 opacity-70 border-dashed' : 'card shadow-sm border-gray-200 dark:border-zinc-800'}`}
            >
              <div className={`p-4 rounded-full bg-gray-50 dark:bg-zinc-800 shadow-sm mb-4 border border-gray-100 dark:border-zinc-700 ${item.color}`}>
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="opacity-70 text-sm mb-6 flex-1">{item.desc}</p>
              
              <button 
                onClick={() => handlePurchase(item)}
                disabled={isPurchased || isLoading}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isPurchased ? 'bg-gray-200 dark:bg-zinc-800 text-gray-500 cursor-not-allowed' : isLoading ? 'bg-primary/50 text-white cursor-wait' : canAfford ? 'bg-primary text-white hover:bg-primary-dark shadow-md' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:bg-gray-200 cursor-not-allowed'}`}
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : isPurchased ? (
                  'Purchased'
                ) : (
                  <>
                    <Coins size={16} /> {item.cost}
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RewardStore;
