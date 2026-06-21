import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Gamepad2, Trash2, Recycle, Leaf } from 'lucide-react';
import toast from 'react-hot-toast';

const gameItems = [
  { id: 1, name: 'Greasy Pizza Box', type: 'trash', tip: 'Grease ruins paper recycling. Throw the greasy part in the trash!' },
  { id: 2, name: 'Clean Cardboard', type: 'recycle', tip: 'Perfect for the blue bin. Make sure it is flattened.' },
  { id: 3, name: 'Banana Peel', type: 'compost', tip: 'Organic waste goes to compost to create rich soil.' },
  { id: 4, name: 'Plastic Bottle', type: 'recycle', tip: 'Recycle this! Remember to empty any liquids first.' },
  { id: 5, name: 'Used Napkin', type: 'compost', tip: 'Food-soiled paper can usually be composted.' },
  { id: 6, name: 'Styrofoam Cup', type: 'trash', tip: 'Styrofoam is very hard to recycle. Throw it in the trash.' },
  { id: 7, name: 'Glass Jar', type: 'recycle', tip: 'Glass is infinitely recyclable! Rinse it out first.' },
];

const RecycleGame = ({ onAwardTokens }) => {
  const [items, setItems] = useState(() => [...gameItems].sort(() => Math.random() - 0.5));

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100;
    const currentItem = items[0];
    
    let guessedType = null;
    if (info.offset.x > swipeThreshold) guessedType = 'recycle'; // Swipe Right
    else if (info.offset.x < -swipeThreshold) guessedType = 'trash'; // Swipe Left
    else if (info.offset.y < -swipeThreshold) guessedType = 'compost'; // Swipe Up

    if (guessedType) {
      if (guessedType === currentItem.type) {
        onAwardTokens(5);
        toast.success('Correct! +5 Tokens', { icon: '✅' });
      } else {
        toast.error(`Oops! ${currentItem.tip}`, { icon: '❌', duration: 4000 });
      }
      
      setItems(items.slice(1));
    }
  };

  const handleReset = () => {
    setItems([...gameItems].sort(() => Math.random() - 0.5));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card p-6 flex flex-col items-center"
    >
      <div className="flex items-center gap-3 mb-2 w-full justify-center md:justify-start">
        <Gamepad2 className="text-primary" size={28} />
        <h2 className="text-2xl m-0">Swipe-to-Sort</h2>
      </div>
      <p className="opacity-80 mb-10 text-center max-w-lg text-sm md:text-base font-medium">
        Swipe Right to <b className="text-blue-500">Recycle</b>, Left for <b className="text-gray-500">Trash</b>, or Up for <b className="text-green-500">Compost</b>. Earn tokens for correct answers!
      </p>

      <div className="relative w-full max-w-md h-[450px] flex items-center justify-center bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-inner">

        {items.length > 0 ? (
          <motion.div
            style={{ x, y, rotate }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
            className="absolute w-64 h-80 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 border border-gray-200 dark:border-zinc-700 cursor-grab active:cursor-grabbing z-10"
          >
            <div className="text-7xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{items[0].name}</h3>
            <p className="text-xs opacity-50 mt-8 uppercase tracking-widest font-bold text-gray-600 dark:text-gray-400 flex flex-col items-center gap-2">
              <span>Swipe Me!</span>
            </p>
          </motion.div>
        ) : (
          <div className="text-center p-8 card border-gray-200 dark:border-zinc-800 shadow-sm z-10">
            <h3 className="text-xl font-bold mb-2">Out of items!</h3>
            <p className="opacity-70 mb-6 text-sm">You've sorted all the trash for today.</p>
            <button onClick={handleReset} className="btn btn-primary">
              Play Again
            </button>
          </div>
        )}

        {/* Drop zones indicators */}
        <div className="absolute inset-y-0 left-4 flex items-center opacity-30 pointer-events-none">
          <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <Trash2 size={40} />
            <span className="text-[10px] font-bold mt-1 tracking-widest">TRASH</span>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-16 flex justify-center opacity-30 pointer-events-none">
          <div className="flex flex-col items-center text-green-600 dark:text-green-400">
            <Leaf size={40} />
            <span className="text-[10px] font-bold mt-1 tracking-widest">COMPOST</span>
          </div>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center opacity-30 pointer-events-none">
          <div className="flex flex-col items-center text-blue-600 dark:text-blue-400">
            <Recycle size={40} />
            <span className="text-[10px] font-bold mt-1 tracking-widest">RECYCLE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecycleGame;
