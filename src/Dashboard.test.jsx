import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Dashboard from './components/Dashboard';
import { AppContext } from './context/AppContext';

describe('Dashboard Component', () => {
  const mockContextValue = {
    userData: {
      name: 'John',
      currentScore: 120,
      initialScore: 150,
      actions: []
    }
  };

  it('renders dashboard with user name and score', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Dashboard />
      </AppContext.Provider>
    );
    expect(screen.getByText("John's Dashboard")).toBeInTheDocument();
  });

  it('calculates average and target correctly', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Dashboard />
      </AppContext.Provider>
    );
    expect(screen.getByText('Avg: 100')).toBeInTheDocument();
    expect(screen.getByText('Target: <60')).toBeInTheDocument();
  });
});
