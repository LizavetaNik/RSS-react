import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../pages/404';

describe('ErrorDisplay Component', () => {
  it('contains a link to the home page', () => {
    render(<NotFound/>);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent('Go back to home');
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});