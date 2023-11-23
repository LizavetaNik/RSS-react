import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../src/components/Search/Search';

describe('Search Component', () => {
  it('should render and allow input and submission', () => {
    const mockSubmit = jest.fn();
    const testQuery = 'Rick';

    render(<Search onSearchSubmit={mockSubmit} defaultQuery={testQuery} />);

    // Check if input is rendered with default value
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(testQuery);

    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: 'Morty' } });
    expect(inputElement).toHaveValue('Morty');

    // Simulate form submission
    fireEvent.submit(inputElement);

    // Check if mockSubmit function is called with the right argument
    expect(mockSubmit).toHaveBeenCalledWith('Morty');
  });
});
