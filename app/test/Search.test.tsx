import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';
import 'jest-localstorage-mock';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Search Component', () => {
  it('should save input value to localStorage when Search button is clicked', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    render(
      <Provider store={store}> {}
        <Search />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText('Enter text');
    const inputValue = 'Test Search Value';
    fireEvent.change(inputElement, { target: { value: inputValue } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    const savedSearchQuery = localStorage.getItem('searchQuery');
    expect(savedSearchQuery).toBe(inputValue);
  });

  it('should display saved value from localStorage in the input field on component mount', () => {
    const mockStore = configureStore();
    const store = mockStore({});

    const testValue = 'Saved Search Value';
    localStorage.setItem('searchQuery', testValue);

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(inputElement.value).toBe(testValue);
  });
});
