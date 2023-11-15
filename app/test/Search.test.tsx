import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';
import 'jest-localstorage-mock';

describe('Search Component', () => {
  it('should save input value to localStorage when Search button is clicked', () => {

    render(
      <Search />
    );

    // Simulate typing into the input field
    const inputElement = screen.getByPlaceholderText('Enter text');
    const inputValue = 'Test Search Value';
    fireEvent.change(inputElement, { target: { value: inputValue } });

    // Simulate clicking the Search button
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Check if the input value is saved in localStorage
    const savedSearchQuery = localStorage.getItem('searchQuery');
    expect(savedSearchQuery).toBe(inputValue);
  });

  it('should display saved value from localStorage in the input field on component mount', () => {

    const testValue = 'Saved Search Value';
    localStorage.setItem('searchQuery', testValue); // Set a value in localStorage before rendering

    render(
      <Search />
    );

    // Check if the input value matches the value retrieved from localStorage
    const inputElement = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(inputElement.value).toBe(testValue); // Assert that the input value is the same as the localStorage value
  });
});
