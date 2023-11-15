import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Character from '../components/Result/Character/Character';

const mockStore = configureStore();
const store = mockStore({id: 1});

describe('<Character />', () => {
  it('displays character data correctly', () => {
    const dummyCharacter = {
      key: '1',
      name: 'John Doe',
      image: 'https://example.com/image.jpg',
      characterId: '123',
      pageNumber: '1',
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Character {...dummyCharacter} />
        </BrowserRouter>
      </Provider>
    );

    const nameElement = screen.getByRole('heading', { name: dummyCharacter.name });
    const imageElement = screen.getByRole('img', { name: '' });
    const buttonElement = screen.getByRole('button', { name: /more\.\.\./i });

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', dummyCharacter.image);
    expect(buttonElement).toBeInTheDocument();
  });
});


