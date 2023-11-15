jest.mock('../features/charactersApi', () => ({
    useFetchCharactersQuery: jest.fn().mockReturnValue({
        info: {
            count: 842,
            pages: 6,
        },
        results: [
        {
          id: '1',
          name: 'John Doe',
          image: 'https://example.com/image.jpg',
          status: 'Alive',
          species: 'Human',
          type: 'Genius',
        },
        {
            id: '2',
            name: 'John Doe2',
            image: 'https://example.com/image.jpg',
            status: 'Alive2',
            species: 'Human2',
            type: 'Genius2',
        },
        {
            id: '3',
            name: 'John Doe3',
            image: 'https://example.com/image.jpg',
            status: 'Alive3',
            species: 'Human3',
            type: 'Genius3',
        },
        ],
        isLoading: false,
        isError: false,
        error: null,
    }),
}));

jest.mock('../features/charApi', () => ({
    useFetchCharactersQuery: jest.fn().mockReturnValue({
      data: {
        id: '123',
        name: 'John Doe',
        image: 'https://example.com/image.jpg',
        status: 'Alive',
        species: 'Human',
        type: 'Genius',
      },
      isLoading: false,
      isError: false,
      error: null,
    }),
}));

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Result from '../components/Result/Result';

const mockStore = configureStore();
let store = mockStore({
    valueSearch: {
      search: {
        results: ''
      },
    },
    valueViewMode: {
      result: {
        idDetail: 1
      },
    },
});

describe('<Result />', () => {

  it('displays pagination controls', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>
    );
  
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('allows changing the quantity of characters', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>
    );
  
    const select = screen.getByLabelText('Change quantity') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '20' } });
    expect(select.value).toBe('20');
  });

  it('displays total elements and pages', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>
    );
  
    expect(screen.getByText(/Total elements : \d+ \/ Total pages : \d+ \/ Search :/)).toBeInTheDocument();
  });

  it('updates page number on pagination button click', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Result />
        </BrowserRouter>
      </Provider>
    );
  
    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);
  
    const pageNumberDiv = document.querySelector('.numberPage') as HTMLDivElement;
    console.log('Page number before waiting:', pageNumberDiv.textContent);
  
    await waitFor(() => {
      expect(pageNumberDiv.textContent).toBe('2');
    });
  });

});
