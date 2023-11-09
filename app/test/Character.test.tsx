import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Character from '../components/Result/Character/Character';

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
      <BrowserRouter>
        <Character {...dummyCharacter} />
      </BrowserRouter>
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

