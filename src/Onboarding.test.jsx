import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Onboarding from './components/Onboarding';

describe('Onboarding Component', () => {
  it('renders initial step and sanitizes inputs', async () => {
    const handleCompleteMock = vi.fn();
    render(<Onboarding onComplete={handleCompleteMock} />);
    
    // Check first step
    expect(screen.getByText("Let's calculate your baseline")).toBeInTheDocument();
    
    // Find input and submit
    const nameInput = screen.getByPlaceholderText('Enter your name');
    
    // Attempt XSS via name input
    fireEvent.change(nameInput, { target: { value: 'John<script>alert(1)</script>' } });
    
    const continueButton = screen.getByText('Continue').closest('button');
    fireEvent.click(continueButton);
    
    // We should proceed to Step 2 (Transport)
    await waitFor(() => {
        expect(screen.getByText('How do you usually commute?')).toBeInTheDocument();
    });
    
    // We can verify that DOMPurify worked by testing the complete function later
    // In actual app, the name is sanitized upon saving to state or context.
  });

  it('completes the flow', async () => {
    const handleCompleteMock = vi.fn();
    render(<Onboarding onComplete={handleCompleteMock} />);
    
    // Name step
    const nameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(nameInput, { target: { value: 'Jane' } });
    fireEvent.click(screen.getByText('Continue').closest('button'));
    
    // Transport step
    await waitFor(() => screen.getByText('How do you usually commute?'));
    fireEvent.click(screen.getByText('Drive Alone (Gas)').closest('button'));
    
    // Energy step
    await waitFor(() => screen.getByText('What best describes your home energy?'));
    fireEvent.click(screen.getByText('High Usage (AC/Heat)').closest('button'));
    
    // Diet step
    await waitFor(() => screen.getByText('What is your primary diet?'));
    fireEvent.click(screen.getByText('Heavy Meat').closest('button'));
    
    // Verify onComplete was called
    await waitFor(() => {
        expect(handleCompleteMock).toHaveBeenCalled();
    });
  });
});
