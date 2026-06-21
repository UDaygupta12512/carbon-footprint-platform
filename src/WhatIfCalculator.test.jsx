import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import WhatIfCalculator from './components/WhatIfCalculator';
import { AppContext } from './context/AppContext';

describe('WhatIfCalculator Component', () => {
  const mockContextValue = {
    userData: {
      currentScore: 150
    }
  };

  it('renders calculator', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <WhatIfCalculator />
      </AppContext.Provider>
    );
    expect(screen.getByText('"What If" Calculator')).toBeInTheDocument();
  });

  it('toggles scenarios correctly', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <WhatIfCalculator />
      </AppContext.Provider>
    );
    
    // Find the EV scenario button
    const evButton = screen.getByText('Switch to Electric Vehicle').closest('button');
    fireEvent.click(evButton);
    
    // Check if savings is shown
    expect(screen.getByText('-25 pts!')).toBeInTheDocument();
  });
});
