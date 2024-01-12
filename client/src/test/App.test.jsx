import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../path-to-your/App'; // Update the path based on your project structure

test('renders home page when navigating to /', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  // Check if the Home component is rendered
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

test('renders log-in page when navigating to /log-in', () => {
  render(
    <MemoryRouter initialEntries={['/log-in']}>
      <App />
    </MemoryRouter>
  );
  // Check if the LogIn component is rendered
  expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});

// Add similar tests for other routes...
