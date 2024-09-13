import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromProps() {
    return {
      hasError: true,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  override render(): React.ReactNode {
    if (this.state.error) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <p>
            Error:
            <span className="text-red-600">
              {this.state.errorInfo?.componentStack}
            </span>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
