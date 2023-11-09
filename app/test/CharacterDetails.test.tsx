import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterDetails from '../components/Result/CharacterDetails/CharacterDetails';

describe('<CharacterDetails />', () => {
  it('displays detailed character information correctly', () => {
    const dummyDataCharacter = {
      id: '123',
      name: 'Rick Sanchez',
      image: 'https://example.com/image.jpg',
      status: 'Alive',
      species: 'Human',
      type: 'Genius',
    };

    const dummyPageNumber = '1';

    render(
      <BrowserRouter>
        <CharacterDetails pageNumber={dummyPageNumber} dataCharacter={dummyDataCharacter} />
      </BrowserRouter>
    );

    const nameElement = screen.getByRole('heading', { name: dummyDataCharacter.name });
    const imageElement = screen.getByRole('img', { name: '' });
    const statusElement = screen.getByText(/status:/i);
    const speciesElement = screen.getByText(/species:/i);
    const typeElement = screen.getByText(/type:/i);
    const closeButton = screen.getByRole('button', { name: /close/i });

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', dummyDataCharacter.image);
    expect(statusElement).toHaveTextContent(`Status: ${dummyDataCharacter.status}`);
    expect(speciesElement).toHaveTextContent(`Species: ${dummyDataCharacter.species}`);
    expect(typeElement).toHaveTextContent(`Type: ${dummyDataCharacter.type}`);
    expect(closeButton).toBeInTheDocument();
  });
});