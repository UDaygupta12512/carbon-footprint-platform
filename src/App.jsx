import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ActionCenter from './components/ActionCenter';
import Gamification from './components/Gamification';
import CarbonBudget from './components/CarbonBudget';
import WhatIfCalculator from './components/WhatIfCalculator';
import RewardStore from './components/RewardStore';
import RecycleGame from './components/RecycleGame';
import Analytics from './components/Analytics';
import { LayoutDashboard, Zap, ShieldAlert, Leaf, LogOut, Moon, Sun, Wallet, Calculator, ShoppingCart, Gamepad2, Coins, Home, PieChart } from 'lucide-react';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [appState, setAppState] = useState('loading');
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('carbonTheme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const saved = localStorage.getItem('carbonUserData');
    if (saved) {
      const parsedData = JSON.parse(saved);
      // Initialize new economy fields for existing users
      if (parsedData.ecoTokens === undefined) parsedData.ecoTokens = 150;
      if (!parsedData.purchasedItems) parsedData.purchasedItems = [];
      
      setUserData(parsedData);
      setAppState('app');
    } else {
      setAppState('home');
    }
  }, []);

  const toggleTheme = () => {
    const hasOcean = userData?.purchasedItems?.includes('ocean');
    let newTheme;
    if (theme === 'light') newTheme = 'dark';
    else if (theme === 'dark' && hasOcean) newTheme = 'ocean';
    else newTheme = 'light';

    setTheme(newTheme);
    localStorage.setItem('carbonTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleStartOnboarding = () => setAppState('onboarding');

  const handleOnboardingComplete = (data) => {
    const fullData = { ...data, ecoTokens: 150, purchasedItems: [] };
    setUserData(fullData);
    localStorage.setItem('carbonUserData', JSON.stringify(fullData));
    setAppState('app');
    setCurrentView('dashboard');
  };

  const handleUpdateScore = (newScore, actions) => {
    // Award 15 tokens per action randomly just for demo logic
    const newTokens = (userData.ecoTokens || 0) + 15;
    const newData = { ...userData, currentScore: newScore, actions, ecoTokens: newTokens };
    setUserData(newData);
    localStorage.setItem('carbonUserData', JSON.stringify(newData));
  };

  const handleUpdateTokens = (newTokens, purchasedItems) => {
    const newData = { ...userData, ecoTokens: newTokens, purchasedItems };
    setUserData(newData);
    localStorage.setItem('carbonUserData', JSON.stringify(newData));
  };

  const handleAwardGameTokens = (amount) => {
    const newData = { ...userData, ecoTokens: userData.ecoTokens + amount };
    setUserData(newData);
    localStorage.setItem('carbonUserData', JSON.stringify(newData));
  };

  const handleReset = () => {
    if(window.confirm("Are you sure you want to reset your data?")) {
      setUserData(null);
      localStorage.removeItem('carbonUserData');
      setAppState('home');
    }
  };

  if (appState === 'loading') return null;

  const NavButton = ({ view, icon: Icon, label }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => setCurrentView(view)}
        className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all ${isActive ? 'bg-primary text-white shadow-md scale-105' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 opacity-80 hover:opacity-100'}`}
      >
        <Icon size={18} /> <span>{label}</span>
      </button>
    );
  };

  const MobileNavButton = ({ view, icon: Icon, label }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => setCurrentView(view)}
        className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'opacity-70'}`}
        style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text)' }}
      >
        <Icon size={20} />
        <span className="text-[10px] font-medium tracking-tight">{label}</span>
      </button>
    );
  };

  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'var(--color-card-bg)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-card-border)',
            boxShadow: 'var(--shadow-md)',
            borderRadius: '12px',
            fontFamily: 'var(--font-main)',
            fontWeight: '600'
          }
        }} 
      />
      <div className="container relative z-10 min-h-screen flex flex-col">
        {/* Top Header Row (Logo + Stats/Settings) */}
        <header className="flex justify-between items-center py-6 px-4 md:px-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => appState === 'app' ? setCurrentView('dashboard') : setAppState('home')}
          >
            <div className="bg-primary text-white p-2 rounded-xl shadow-md flex-shrink-0">
              <Leaf size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl m-0 text-gradient">EcoTrack</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 md:gap-4"
          >
            {appState === 'app' && (
              <div className="flex items-center gap-4 mr-2">
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-bold uppercase opacity-60 tracking-widest flex items-center justify-end gap-1"><Coins size={10} /> Tokens</div>
                  <div className="font-bold text-yellow-600 dark:text-yellow-400 text-lg leading-tight">{userData.ecoTokens}</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Score</div>
                  <div className="font-bold text-primary-dark text-lg leading-tight">{userData.currentScore}</div>
                </div>
              </div>
            )}
            
            <button onClick={toggleTheme} className="p-2.5 md:p-3 rounded-xl card flex items-center justify-center hover:scale-105 transition-transform" title="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {appState === 'app' && (
              <>
                <button onClick={() => setAppState('home')} className="p-2.5 md:p-3 rounded-xl card flex items-center justify-center hover:scale-105 transition-transform text-primary" title="Go to Home">
                  <Home size={20} />
                </button>
                <button onClick={handleReset} className="p-2.5 md:p-3 rounded-xl card flex items-center justify-center hover:scale-105 transition-transform text-red-500 hover:bg-red-500 hover:text-white" title="Sign Out / Reset">
                  <LogOut size={20} />
                </button>
              </>
            )}
          </motion.div>
        </header>

        {/* Centered Desktop Navigation Dock */}
        {appState === 'app' && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex justify-center items-center flex-wrap gap-4 mb-10 mx-auto px-6 py-3 max-w-6xl card"
          >
            <NavButton view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavButton view="analytics" icon={PieChart} label="Analytics" />
            <NavButton view="actions" icon={Zap} label="Actions" />
            <NavButton view="badges" icon={ShieldAlert} label="Badges" />
            <NavButton view="budget" icon={Wallet} label="Budget" />
            <NavButton view="calculator" icon={Calculator} label="What If?" />
            <NavButton view="store" icon={ShoppingCart} label="Store" />
            <NavButton view="game" icon={Gamepad2} label="Play" />
          </motion.nav>
        )}

        {/* Mobile Navigation Dock (Only visible < 768px) */}
        {appState === 'app' && (
          <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 card p-2 flex overflow-x-auto hide-scrollbar gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <MobileNavButton view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <MobileNavButton view="analytics" icon={PieChart} label="Analytics" />
            <MobileNavButton view="actions" icon={Zap} label="Actions" />
            <MobileNavButton view="badges" icon={ShieldAlert} label="Badges" />
            <MobileNavButton view="budget" icon={Wallet} label="Budget" />
            <MobileNavButton view="calculator" icon={Calculator} label="What If?" />
            <MobileNavButton view="store" icon={ShoppingCart} label="Store" />
            <MobileNavButton view="game" icon={Gamepad2} label="Play" />
          </div>
        )}

        <main className="flex-1 pb-24 md:pb-12 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {appState === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.3 }} className="w-full">
                <LandingPage onStart={handleStartOnboarding} onResume={() => setAppState('app')} hasData={!!userData} />
              </motion.div>
            )}

            {appState === 'onboarding' && (
              <motion.div key="onboarding" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="w-full">
                <Onboarding onComplete={handleOnboardingComplete} />
              </motion.div>
            )}

            {appState === 'app' && (
              <motion.div key={currentView} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full max-w-5xl">
                {currentView === 'dashboard' && <Dashboard userData={userData} />}
                {currentView === 'analytics' && <Analytics userData={userData} />}
                {currentView === 'actions' && <ActionCenter userData={userData} onUpdate={handleUpdateScore} />}
                {currentView === 'badges' && <Gamification userData={userData} />}
                {currentView === 'budget' && <CarbonBudget userData={userData} />}
                {currentView === 'calculator' && <WhatIfCalculator userData={userData} />}
                {currentView === 'store' && <RewardStore userData={userData} onUpdateTokens={handleUpdateTokens} />}
                {currentView === 'game' && <RecycleGame userData={userData} onAwardTokens={handleAwardGameTokens} />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </>
  );
}

export default App;
