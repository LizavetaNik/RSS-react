import { Component, ErrorInfo } from 'react';
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
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ErrorBoundary caught error!');
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
        <h1>Caught an error</h1>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;