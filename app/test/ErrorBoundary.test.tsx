import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../components/Error/ErrorBoundary'; 

interface ProblematicChildProps {
  shouldThrow: boolean;
}

const ProblematicChild = ({ shouldThrow }: ProblematicChildProps) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Child Component</div>;
};


describe('ErrorBoundary', () => {
  it('allows to reset error state', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ProblematicChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Caught an error/i)).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <ProblematicChild shouldThrow={false} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/Go Back/i));

    expect(screen.queryByText(/Caught an error/i)).not.toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
