import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { Suspense } from 'react';
import App from './App';
import { AppProvider } from './context/AppContext';

describe('App Component', () => {
  it('renders without crashing', () => {
    // Wrap with Suspense and AppProvider since App now uses context and lazy loading
    const { container } = render(
      <AppProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </AppProvider>
    );
    expect(container).toBeTruthy();
  });
});
