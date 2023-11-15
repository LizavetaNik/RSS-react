import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Character from '../components/Result/Character/Character';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

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
      <MemoryRouter>
        <Character {...dummyCharacter} />
      </MemoryRouter>
    );

    const nameElement = screen.getByRole('heading', { name: dummyCharacter.name });
    const imageElement = screen.getByRole('img', { name: `Character ${dummyCharacter.name}` });
    const buttonElement = screen.getByRole('button', { name: /more\.\.\./i });

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', dummyCharacter.image);
    expect(buttonElement).toBeInTheDocument();
  });
});

