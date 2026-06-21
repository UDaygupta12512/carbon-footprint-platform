import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Gamification from './components/Gamification';

describe('Gamification Component', () => {
  it('renders badges with correct lock states', () => {
    const userData = { actions: [1, 2] }; // 2 actions
    render(<Gamification userData={userData} />);
    
    // Eco Starter needs 1 (should be unlocked)
    expect(screen.getByText('Eco Starter')).toBeInTheDocument();
    
    // Carbon Warrior needs 3 (locked)
    expect(screen.getByText(/Requires 3 quests/i)).toBeInTheDocument();
  });

  it('shows modal when clicking unlocked badge', () => {
    const userData = { actions: [1] };
    render(<Gamification userData={userData} />);
    
    const starterBadge = screen.getByText('Eco Starter').closest('div[role="button"]');
    fireEvent.click(starterBadge);
    
    expect(screen.getAllByText('Complete your first action to begin your journey.')[0]).toBeInTheDocument();
  });
});
