import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ActionCenter from './ActionCenter';
import * as AppContextModule from '../context/AppContext';

// Mock the context
vi.mock('../context/AppContext', () => ({
  useAppContext: vi.fn()
}));

describe('ActionCenter Component', () => {
  it('renders Action Center and filters correctly', async () => {
    const handleUpdateScoreMock = vi.fn();
    
    AppContextModule.useAppContext.mockReturnValue({
      userData: { currentScore: 100, actions: [] },
      handleUpdateScore: handleUpdateScoreMock
    });

    render(<ActionCenter />);
    
    // Check if the component renders the title
    expect(screen.getByText('Action Center')).toBeTruthy();
    
    // Check if a specific action exists
    expect(screen.getByText('Meatless Day')).toBeTruthy();
    
    // Filter by Diet
    const dietButton = screen.getByRole('button', { name: 'Diet' });
    fireEvent.click(dietButton);
    
    // Meatless Day should still be there
    expect(screen.getByText('Meatless Day')).toBeTruthy();
    
    // LED Bulbs (Energy) should NOT be there (wait for animation)
    const { waitFor } = await import('@testing-library/react');
    await waitFor(() => expect(screen.queryByText('LED Bulbs')).toBeNull());
  });

  it('calls handleUpdateScore when an action is clicked', () => {
    const handleUpdateScoreMock = vi.fn();
    
    AppContextModule.useAppContext.mockReturnValue({
      userData: { currentScore: 100, actions: [] },
      handleUpdateScore: handleUpdateScoreMock
    });

    render(<ActionCenter />);
    
    // Click the Meatless Day action
    const meatlessDayAction = screen.getByText('Meatless Day').closest('button');
    fireEvent.click(meatlessDayAction);

    // Should call mock
    expect(handleUpdateScoreMock).toHaveBeenCalled();
  });
});
