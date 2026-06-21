/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { loadUserData, saveUserData, clearUserData } from '../utils/storage';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    return loadUserData();
  });
  
  const [appState, setAppState] = useState(() => {
    return loadUserData() ? 'app' : 'home';
  });
  
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('carbonTheme') || 'light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('carbonTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const hasOcean = userData?.purchasedItems?.includes('ocean');
      let newTheme = prevTheme === 'light' ? 'dark' : (prevTheme === 'dark' && hasOcean ? 'ocean' : 'light');
      localStorage.setItem('carbonTheme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  }, [userData?.purchasedItems]);

  const handleStartOnboarding = useCallback(() => setAppState('onboarding'), []);

  const handleOnboardingComplete = useCallback((data) => {
    const fullData = { ...data, ecoTokens: 150, purchasedItems: [] };
    setUserData(fullData);
    saveUserData(fullData);
    setAppState('app');
    setCurrentView('dashboard');
  }, []);

  const handleUpdateScore = useCallback((newScore, actions) => {
    setUserData(prev => {
      const newTokens = (prev.ecoTokens || 0) + 15;
      const newData = { ...prev, currentScore: newScore, actions, ecoTokens: newTokens };
      saveUserData(newData);
      return newData;
    });
  }, []);

  const handleUpdateTokens = useCallback((newTokens, purchasedItems) => {
    setUserData(prev => {
      const newData = { ...prev, ecoTokens: newTokens, purchasedItems };
      saveUserData(newData);
      return newData;
    });
  }, []);

  const handleAwardGameTokens = useCallback((amount) => {
    setUserData(prev => {
      const newData = { ...prev, ecoTokens: prev.ecoTokens + amount };
      saveUserData(newData);
      return newData;
    });
  }, []);

  const handleReset = useCallback(() => {
    if(window.confirm("Are you sure you want to reset your data?")) {
      setUserData(null);
      clearUserData();
      setAppState('home');
    }
  }, []);

  const value = useMemo(() => ({
    userData,
    appState,
    currentView,
    theme,
    setAppState,
    setCurrentView,
    toggleTheme,
    handleStartOnboarding,
    handleOnboardingComplete,
    handleUpdateScore,
    handleUpdateTokens,
    handleAwardGameTokens,
    handleReset
  }), [
    userData, appState, currentView, theme, 
    toggleTheme, handleStartOnboarding, handleOnboardingComplete, 
    handleUpdateScore, handleUpdateTokens, handleAwardGameTokens, handleReset
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
