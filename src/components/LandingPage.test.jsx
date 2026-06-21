import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LandingPage from './LandingPage';

// Mock IntersectionObserver which is used by Framer Motion
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverMock;

describe('LandingPage Component', () => {
  it('renders main heading correctly', () => {
    render(<LandingPage hasData={false} onStart={() => {}} onResume={() => {}} />);
    
    // Check if the platform text exists
    expect(screen.getByText(/Carbon Footprint Awareness Platform/i)).toBeTruthy();
  });
});
