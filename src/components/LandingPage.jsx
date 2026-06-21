import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Users, TrendingDown, PlayCircle } from 'lucide-react';



const LandingPage = ({ onStart, onResume, hasData }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-12 px-4 mt-8 md:mt-12 overflow-hidden">
      
      {/* Hero Section */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="text-center mb-24 relative z-10 w-full"
      >
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center p-5 card mb-8 text-primary shadow-sm"
        >
          <Leaf size={56} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
        >
          Welcome to the <br />
          <span className="text-gradient">Carbon Footprint Awareness Platform</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl opacity-70 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Track your carbon footprint, discover simple ways to reduce it, and join a community dedicated to a greener future.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {hasData ? (
            <motion.button 
              onClick={onResume}
              className="btn btn-primary text-lg px-10 py-5 w-full sm:w-auto justify-center"
            >
              Resume Journey <PlayCircle size={24} />
            </motion.button>
          ) : (
            <motion.button 
              onClick={onStart}
              className="btn btn-primary text-lg px-10 py-5 w-full sm:w-auto justify-center"
            >
              Calculate My Footprint <ArrowRight size={24} />
            </motion.button>
          )}
          
          {hasData && (
            <motion.button 
              onClick={onStart}
              className="btn btn-outline text-lg px-10 py-5 w-full sm:w-auto justify-center"
            >
              Start Over <ArrowRight size={20} />
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Features Showcase */}
      <motion.div 
        style={{ y: y2 }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-10 w-full relative z-10"
      >
        {[
          { icon: TrendingDown, title: 'Track & Reduce', desc: 'Get a detailed breakdown of your emissions and see your score drop as you commit to eco-friendly habits.' },
          { icon: Shield, title: 'Earn Badges', desc: 'Gamify your journey. Unlock exclusive achievements as you hit new sustainability milestones.' },
          { icon: Users, title: 'Community Driven', desc: 'Compare your progress on our live leaderboard and get inspired by what others are doing.' }
        ].map((feature, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -5 }}
            className="card p-8 md:p-10 text-center flex flex-col items-center relative group"
          >
            <div className="mx-auto w-20 h-20 card flex items-center justify-center mb-8 text-primary group-hover:scale-105 transition-transform duration-300 z-10 shadow-sm border border-gray-100 dark:border-zinc-800">
              <feature.icon size={36} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold mb-4 z-10">{feature.title}</h3>
            <p className="opacity-70 text-base font-medium leading-relaxed z-10">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Mock Live Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 card w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 overflow-hidden shadow-md relative z-10 p-0"
      >
        <div className="text-center w-full flex flex-col items-center justify-center p-12 md:border-r border-black/5 dark:border-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-5xl lg:text-6xl font-black text-gradient mb-3 relative z-10"
          >
            12,450
          </motion.div>
          <div className="text-sm uppercase tracking-widest opacity-60 font-bold relative z-10">Active Users</div>
        </div>
        <div className="text-center w-full flex flex-col items-center justify-center p-12 border-t md:border-t-0 md:border-r border-black/5 dark:border-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-5xl lg:text-6xl font-black text-gradient mb-3 relative z-10"
          >
            8,402
          </motion.div>
          <div className="text-sm uppercase tracking-widest opacity-60 font-bold relative z-10">Badges Earned</div>
        </div>
        <div className="text-center w-full flex flex-col items-center justify-center p-12 border-t md:border-t-0 border-black/5 dark:border-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="text-5xl lg:text-6xl font-black text-gradient mb-3 relative z-10"
          >
            45.2 <span className="text-3xl">t</span>
          </motion.div>
          <div className="text-sm uppercase tracking-widest opacity-60 font-bold relative z-10">CO₂ Reduced</div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
