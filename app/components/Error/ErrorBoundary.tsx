import { Component } from 'react';
import { ReactNode } from 'react';

interface ErrorBoundaryProps {
   children: ReactNode;
}
  
interface ErrorBoundaryState {
   hasError: boolean;
   error: undefined | string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error) {
    return { hasError: true, error: error.message };
  }

  handleGoBack = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
        <h1>Caught an error</h1>
        <button onClick={this.handleGoBack}>Go Back</button>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;