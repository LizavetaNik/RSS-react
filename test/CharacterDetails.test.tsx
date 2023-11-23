import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterDetails from '../src/components/CharacterDetails/CharacterDetails';

const mockCharacterData = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'url-to-rick-image',
  status: 'Alive',
  species: 'Human',
  type: '',
};

describe('CharacterDetails Component', () => {
  it('renders character information', () => {
    render(<CharacterDetails dataCharacter={mockCharacterData} onClose={() => {}} />);

    expect(screen.getByText(mockCharacterData.name)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockCharacterData.status}`)).toBeInTheDocument();
    expect(screen.getByText(`Species: ${mockCharacterData.species}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacterData.name)).toHaveAttribute('src', mockCharacterData.image);
  });

});
