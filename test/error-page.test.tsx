import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorDisplay from '../pages/error-page';

describe('ErrorDisplay Component', () => {
  it('displays the error message', () => {
    const testError = new Error('Test Error');
    render(<ErrorDisplay error={testError} />);

    expect(screen.getByText('Caught an error')).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    const testError = new Error('Test Error');
    render(<ErrorDisplay error={testError} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent('Go back to home');
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});

