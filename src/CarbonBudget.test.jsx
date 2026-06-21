import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CarbonBudget from './components/CarbonBudget';

describe('CarbonBudget Component', () => {
  it('renders budget progress and messages', () => {
    const userData = { currentScore: 50 }; // Very good score
    render(<CarbonBudget userData={userData} />);
    
    // Check component rendering
    expect(screen.getByText('Monthly Carbon Budget')).toBeInTheDocument();
    
    // Check score formatting
    expect(screen.getByText('50 pts')).toBeInTheDocument();
    
    // Since 50 is less than 50% of the standard max 200, it should be Great!
    expect(screen.getByText(/Great job!/i)).toBeInTheDocument();
  });

  it('renders warning when budget is exceeded', () => {
    const userData = { currentScore: 250 }; // High score
    render(<CarbonBudget userData={userData} />);
    
    // Check warning message
    expect(screen.getByText(/You are 170 pts over allowance/i)).toBeInTheDocument();
  });
});
