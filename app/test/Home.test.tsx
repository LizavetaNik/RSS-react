import { render, fireEvent } from '@testing-library/react';
import Home from '../pages/Home/Home';

jest.mock('../components/Search/Search', () => () => <div>Search Component</div>);
jest.mock('../components/Result/Result', () => () => <div>Result Component</div>);

describe('Home Component', () => {
  it('triggers an error and calls ErrorBoundary when button is clicked', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const { getByText } = render(<Home />);

    try {
      fireEvent.click(getByText(/Emit error/i));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toMatch('ErrorBoundary worked!');
      }
    }

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    
  });
});