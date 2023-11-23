import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Result from '../src/components/Result/Result';

interface CharacterItem {
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    type: string;
}

const mockCharactersArr = [
    { id: '1', name: 'Rick', image: 'url-to-rick-image', status: 'Alive', species: 'Human', type: 'Scientist' },
    { id: '2', name: 'Morty', image: 'url-to-morty-image', status: 'Alive', species: 'Human', type: 'Student' },
    { id: '3', name: 'Rick', image: 'url-to-rick-image', status: 'Alive', species: 'Human', type: 'Scientist' },
    { id: '4', name: 'Morty', image: 'url-to-morty-image', status: 'Alive', species: 'Human', type: 'Student' },
    { id: '5', name: 'Rick', image: 'url-to-rick-image', status: 'Alive', species: 'Human', type: 'Scientist' },
    { id: '6', name: 'Morty', image: 'url-to-morty-image', status: 'Alive', species: 'Human', type: 'Student' },
    { id: '7', name: 'Rick', image: 'url-to-rick-image', status: 'Alive', species: 'Human', type: 'Scientist' },
    { id: '8', name: 'Morty', image: 'url-to-morty-image', status: 'Alive', species: 'Human', type: 'Student' },
    { id: '9', name: 'Rick', image: 'url-to-rick-image', status: 'Alive', species: 'Human', type: 'Scientist' },
    { id: '10', name: 'Morty', image: 'url-to-morty-image', status: 'Alive', species: 'Human', type: 'Student' },
];
  
const mockProps = {
    searchQuery: 'Rick',
    pageNumber: 1,
    quantity: 5,
    characterId: '',
    totalPages: '10',
    totalCharacters: '50',
    charactersArr: mockCharactersArr,
    onPageChange: jest.fn(),
    onQuantityChange: jest.fn(),
    onCharacterSelect: jest.fn(),
};

describe('Result Component', () => {
  it('renders correctly', () => {
    render(<Result {...mockProps} />);

    expect(screen.getByText(/Total elements\s*:\s*50/)).toBeInTheDocument();

  });

  it('handles page change correctly', () => {
    render(<Result {...mockProps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('handles quantity change correctly', () => {
    render(<Result {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/Change quantity/), { target: { value: 10 } });
    expect(mockProps.onQuantityChange).toHaveBeenCalledWith(10);
  });

  it('displays the correct number of characters', () => {
    render(<Result {...mockProps} />);
    const characterElements = screen.getAllByText(/More.../);
    expect(characterElements.length).toBe(mockProps.quantity);
  });

  it('handles character selection correctly', () => {
    render(<Result {...mockProps} />);
    const firstCharacterButton = screen.getAllByText(/More.../)[0];
    fireEvent.click(firstCharacterButton);
    expect(mockProps.onCharacterSelect).toHaveBeenCalledWith(mockCharactersArr[0].id);
  });
});
