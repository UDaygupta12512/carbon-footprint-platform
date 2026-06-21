import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, Zap, ShieldAlert, Leaf, LogOut, Moon, Sun, Wallet, Calculator, ShoppingCart, Gamepad2, Coins, Home, PieChart, Loader } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const LandingPage = lazy(() => import('./components/LandingPage'));
const Onboarding = lazy(() => import('./components/Onboarding'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const ActionCenter = lazy(() => import('./components/ActionCenter'));
const Gamification = lazy(() => import('./components/Gamification'));
const CarbonBudget = lazy(() => import('./components/CarbonBudget'));
const WhatIfCalculator = lazy(() => import('./components/WhatIfCalculator'));
const RewardStore = lazy(() => import('./components/RewardStore'));
const RecycleGame = lazy(() => import('./components/RecycleGame'));
const Analytics = lazy(() => import('./components/Analytics'));

const NavButton = ({ view, icon: Icon, label, currentView, setCurrentView }) => {
  const isActive = currentView === view;
  return (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all ${isActive ? 'bg-primary text-white shadow-md scale-105' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 opacity-80 hover:opacity-100'}`}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={18} aria-hidden="true" /> <span>{label}</span>
    </button>
  );
};

const MobileNavButton = ({ view, icon: Icon, label, currentView, setCurrentView }) => {
  const isActive = currentView === view;
  return (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'opacity-70'}`}
      style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text)' }}
      aria-label={`Navigate to ${label}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={20} aria-hidden="true" />
      <span className="text-[10px] font-medium tracking-tight">{label}</span>
    </button>
  );
};

function App() {
  const {
    userData,
    appState,
    currentView,
    theme,
    setAppState,
    setCurrentView,
    toggleTheme,
    handleReset
  } = useAppContext();

  if (appState === 'loading') return null;

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') { appState === 'app' ? setCurrentView('dashboard') : setAppState('home') } }}
            aria-label="Go to Home"
          >
            <div className="bg-primary text-white p-2 rounded-xl shadow-md flex-shrink-0" aria-hidden="true">
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
                  <div className="text-[10px] font-bold uppercase opacity-60 tracking-widest flex items-center justify-end gap-1"><Coins size={10} aria-hidden="true" /> Tokens</div>
                  <div className="font-bold text-yellow-600 dark:text-yellow-400 text-lg leading-tight" aria-live="polite">{userData.ecoTokens}</div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Score</div>
                  <div className="font-bold text-primary-dark text-lg leading-tight" aria-live="polite">{userData.currentScore}</div>
                </div>
              </div>
            )}
            
            <button onClick={toggleTheme} className="p-2.5 md:p-3 rounded-xl card flex items-center justify-center hover:scale-105 transition-transform" title="Toggle Theme" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </button>

            {appState === 'app' && (
              <>
                <button onClick={() => setAppState('home')} className="p-2.5 md:p-3 rounded-xl card flex items-center justify-center hover:scale-105 transition-transform text-primary" title="Go to Home" aria-label="Go to Home">
                  <Home size={20} aria-hidden="true" />
                </button>
                <button onClick={handleReset} className="p-2.5 md:p-3 rounded-xl card flex items-center justify-center hover:scale-105 transition-transform text-red-500 hover:bg-red-500 hover:text-white" title="Sign Out / Reset" aria-label="Sign Out / Reset">
                  <LogOut size={20} aria-hidden="true" />
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
            aria-label="Main Navigation"
          >
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="analytics" icon={PieChart} label="Analytics" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="actions" icon={Zap} label="Actions" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="badges" icon={ShieldAlert} label="Badges" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="budget" icon={Wallet} label="Budget" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="calculator" icon={Calculator} label="What If?" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="store" icon={ShoppingCart} label="Store" />
            <NavButton currentView={currentView} setCurrentView={setCurrentView} view="game" icon={Gamepad2} label="Play" />
          </motion.nav>
        )}

        {/* Mobile Navigation Dock (Only visible < 768px) */}
        {appState === 'app' && (
          <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 card p-2 flex overflow-x-auto hide-scrollbar gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} aria-label="Mobile Navigation">
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="analytics" icon={PieChart} label="Analytics" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="actions" icon={Zap} label="Actions" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="badges" icon={ShieldAlert} label="Badges" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="budget" icon={Wallet} label="Budget" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="calculator" icon={Calculator} label="What If?" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="store" icon={ShoppingCart} label="Store" />
            <MobileNavButton currentView={currentView} setCurrentView={setCurrentView} view="game" icon={Gamepad2} label="Play" />
          </nav>
        )}

        <main className="flex-1 pb-24 md:pb-12 w-full flex flex-col items-center" aria-live="polite">
          <Suspense fallback={<div className="flex items-center justify-center flex-1 h-full"><Loader className="animate-spin text-primary" size={32} /></div>}>
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
                  {currentView === 'dashboard' && <Dashboard />}
                  {currentView === 'analytics' && <Analytics userData={userData} />}
                  {currentView === 'actions' && <ActionCenter />}
                  {currentView === 'badges' && <Gamification userData={userData} />}
                  {currentView === 'budget' && <CarbonBudget userData={userData} />}
                  {currentView === 'calculator' && <WhatIfCalculator userData={userData} />}
                  {currentView === 'store' && <RewardStore userData={userData} onUpdateTokens={handleUpdateTokens} />}
                  {currentView === 'game' && <RecycleGame userData={userData} onAwardTokens={handleAwardGameTokens} />}
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
