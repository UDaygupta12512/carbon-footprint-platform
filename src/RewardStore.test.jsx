import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import RewardStore from './components/RewardStore';

describe('RewardStore Component', () => {
  it('renders store items', () => {
    const userData = { ecoTokens: 150, purchasedItems: [] };
    render(<RewardStore userData={userData} onUpdateTokens={vi.fn()} />);
    
    expect(screen.getByText('Plant a Real Tree')).toBeInTheDocument();
    expect(screen.getByText('Ocean Theme')).toBeInTheDocument();
  });

  it('disables items user cannot afford', () => {
    const userData = { ecoTokens: 10, purchasedItems: [] };
    render(<RewardStore userData={userData} onUpdateTokens={vi.fn()} />);
    
    // Golden Avatar costs 200, user has 10. The button should have visually disabled state.
    const treeItemCost = screen.getByText('50').closest('button');
    expect(treeItemCost).toHaveClass('cursor-not-allowed');
  });
});
