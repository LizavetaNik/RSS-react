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
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CharacterDetails from '../components/Result/CharacterDetails/CharacterDetails';

const mockStore = configureStore();
const store = mockStore({
  someReducer: {
    isLoading: false,
    error: null,
    characterDetails: {
      id: '123',
      name: 'John Doe',
      status: 'Alive',
      species: 'Human',
      type: 'Genius',
    },
  },
});

describe('<CharacterDetails />', () => {

  it('displays detailed character information correctly', () => {
    const dummyCharacter = {
      key: '1',
      name: 'John Doe',
      image: 'https://example.com/image.jpg',
      characterId: '123',
      status: 'Alive',
      species: 'Human',
      type: 'Genius',
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails pageNumber="1" id={dummyCharacter.characterId} />
        </BrowserRouter>
      </Provider>
    );

    const nameElement = screen.getByRole('heading', { name: dummyCharacter.name });
    const imageElement = screen.getByAltText(dummyCharacter.name);
    const statusElement = screen.getByText(/status:/i);
    const speciesElement = screen.getByText(/species:/i);
    const typeElement = screen.getByText(/type:/i);
    const closeButton = screen.getByRole('button', { name: /close/i });

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', dummyCharacter.image);
    expect(statusElement).toHaveTextContent('Status: Alive');
    expect(speciesElement).toHaveTextContent('Species: Human');
    expect(typeElement).toHaveTextContent('Type: Genius');
    expect(closeButton).toBeInTheDocument();
  });
});