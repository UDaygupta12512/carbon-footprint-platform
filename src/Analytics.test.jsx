import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Analytics from './components/Analytics';
import { AppContext } from './context/AppContext';

describe('Analytics Component', () => {
  const mockContextValue = {
    userData: {
      initialScore: 200,
      currentScore: 120,
    }
  };

  it('renders analytics metrics', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Analytics />
      </AppContext.Provider>
    );
    
    expect(screen.getByText('Detailed Analytics')).toBeInTheDocument();
    expect(screen.getByText('Emissions Breakdown')).toBeInTheDocument();
    expect(screen.getByText('6-Month Impact Trend')).toBeInTheDocument();
  });
});
