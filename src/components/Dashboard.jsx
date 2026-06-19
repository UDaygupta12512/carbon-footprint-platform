import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Activity, Globe, Target, Award, Share2 } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return controls.stop;
  }, [value]);

  return <span>{displayValue}</span>;
};

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Dashboard = ({ userData }) => {
  const avgScore = 100;
  
  const transportScore = 30;
  const dietScore = 40;
  const energyScore = Math.max(10, userData.currentScore - 70);

  const breakdownData = [
    { name: 'Transport', value: transportScore, color: '#0ea5e9' }, // sky blue
    { name: 'Diet', value: dietScore, color: '#10b981' }, // emerald
    { name: 'Energy', value: energyScore, color: '#f59e0b' }, // amber
  ];

  // Simulated history data converging on current score
  const historyData = [
    { month: 'Jan', score: userData.currentScore + 40 },
    { month: 'Feb', score: userData.currentScore + 30 },
    { month: 'Mar', score: userData.currentScore + 25 },
    { month: 'Apr', score: userData.currentScore + 15 },
    { month: 'May', score: userData.currentScore + 5 },
    { month: 'Jun', score: userData.currentScore },
  ];

  const getStatusText = () => {
    if (userData.currentScore <= 60) return "Excellent! You're an eco-warrior.";
    if (userData.currentScore <= 100) return "Good job! But there's room for improvement.";
    return "Your footprint is higher than average. Let's reduce it!";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My EcoTrack Score',
        text: `I just checked my carbon footprint on EcoTrack and my score is ${userData.currentScore}! Can you beat it?`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Score copied to clipboard!");
      navigator.clipboard.writeText(`My EcoTrack score is ${userData.currentScore}!`);
    }
  };

  // Progress ring calculations
  const maxScore = 300;
  const ringProgress = Math.min((userData.currentScore / maxScore) * 100, 100);
  const circumference = 2 * Math.PI * 80; // r=80
  const strokeDashoffset = circumference - (ringProgress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card p-6 overflow-hidden relative"
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 text-primary-dark rounded-xl shadow-inner">
            <Activity size={24} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight m-0 text-gradient">Your Dashboard</h2>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="btn btn-outline py-2.5 px-5 text-sm flex items-center gap-2 rounded-xl shadow-sm"
        >
          <Share2 size={16} /> <span className="hidden sm:inline font-bold">Share Score</span>
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 mb-8 relative z-10">
        <div className="flex-1 flex flex-col gap-6">
          <TiltCard className="p-8 card text-center flex-1 flex flex-col justify-center items-center relative overflow-hidden">
            <h3 className="text-sm uppercase tracking-widest opacity-70 mb-6 font-bold z-10">Carbon Footprint</h3>
            
            {/* Animated SVG Progress Ring */}
            <div className="relative w-48 h-48 flex flex-col items-center justify-center z-10">
              <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle 
                  cx="100" cy="100" r="80" 
                  fill="none" stroke="currentColor" strokeWidth="12" 
                  className="text-black/5 dark:text-white/5"
                />
                {/* Foreground Animated Ring */}
                <motion.circle 
                  cx="100" cy="100" r="80" 
                  fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round"
                  className={userData.currentScore <= 60 ? "text-green-500" : userData.currentScore <= 100 ? "text-yellow-500" : "text-red-500"}
                  initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              <div className="text-6xl font-black text-gradient"><AnimatedNumber value={userData.currentScore} /></div>
              <div className="text-xs font-bold uppercase opacity-60 tracking-widest mt-1">Points</div>
            </div>

            <p className="font-bold text-sm mt-6 z-10" style={{ color: 'var(--color-text)', opacity: 0.8 }}>{getStatusText()}</p>
          </TiltCard>
          
          <div className="grid grid-cols-2 gap-6 h-36">
            <TiltCard className="p-4 card flex flex-col items-center justify-center relative overflow-hidden" style={{ borderRadius: '16px' }}>
              <div className="absolute top-0 right-0 p-4 opacity-5"><Globe size={64} /></div>
              <Globe className="text-blue-500 mb-2 relative z-10" size={28} />
              <span className="text-sm opacity-80 text-center font-bold relative z-10">Avg: {avgScore}</span>
            </TiltCard>
            <TiltCard className="p-4 card flex flex-col items-center justify-center relative overflow-hidden" style={{ borderRadius: '16px' }}>
              <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={64} /></div>
              <Target className="text-red-500 mb-2 relative z-10" size={28} />
              <span className="text-sm opacity-80 text-center font-bold relative z-10">Target: &lt;60</span>
            </TiltCard>
          </div>
        </div>

        <TiltCard className="flex-1 card p-8 flex flex-col items-center min-h-[350px] relative z-10">
          <h3 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-70">Emission Breakdown</h3>
          <div className="w-full flex-1 h-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '16px', border: '1px solid var(--glass-panel-border)', boxShadow: 'var(--shadow-lg)', background: 'var(--glass-panel-bg)', color: 'var(--color-text)'}} itemStyle={{ color: 'var(--color-text)', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-6">
            {breakdownData.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-sm font-bold opacity-80">
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: item.color }}></div>
                {item.name}
              </div>
            ))}
          </div>
        </TiltCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 relative z-10">
        {/* Progress History Chart */}
        <div className="lg:col-span-2 p-8 card">
          <h3 className="text-sm uppercase tracking-widest font-bold mb-8 opacity-70">6-Month Trend</h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.15)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', opacity: 0.5, fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text)', opacity: 0.5, fontWeight: 'bold' }} dx={-10} />
                <RechartsTooltip contentStyle={{borderRadius: '16px', border: '1px solid var(--glass-panel-border)', boxShadow: 'var(--shadow-lg)', background: 'var(--glass-panel-bg)', color: 'var(--color-text)', fontWeight: 'bold'}} itemStyle={{ color: 'var(--color-text)' }} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--color-primary)" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: 'var(--color-primary)', strokeWidth: 3, stroke: 'var(--glass-panel-bg)' }} 
                  activeDot={{ r: 8, strokeWidth: 0 }} 
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Community Leaderboard */}
        <div className="p-8 card flex flex-col">
          <h3 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-70 flex items-center gap-2 m-0">
            <Award className="text-yellow-500" size={18} /> Global Rank
          </h3>
          <div className="space-y-3 flex-1">
            {[
              { name: 'Sarah J.', score: 45, isUser: false },
              { name: 'You', score: userData.currentScore, isUser: true },
              { name: 'Mike T.', score: 85, isUser: false },
              { name: 'Emma W.', score: 92, isUser: false }
            ].sort((a,b) => a.score - b.score).map((person, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
                className={`flex justify-between items-center p-4 rounded-xl transition-all hover:-translate-y-1 ${person.isUser ? 'bg-primary text-white font-bold shadow-md' : 'card hover:shadow-md border border-gray-100 dark:border-zinc-800'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="opacity-50 font-mono w-5 text-right text-sm">{idx + 1}</span>
                  <span className="font-bold">{person.name}</span>
                </div>
                <span className={`font-black tracking-tight ${person.isUser ? '' : 'opacity-70'}`}><AnimatedNumber value={person.score} /></span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
