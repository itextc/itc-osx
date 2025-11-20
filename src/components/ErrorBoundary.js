/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing
 * the entire application with a white screen.
 *
 * See: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * Update state so the next render will show the fallback UI
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Log error details to console (and could send to error reporting service)
   */
  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error);
    console.error('Error component stack:', errorInfo.componentStack);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // TODO: Send error to error reporting service (e.g., Sentry)
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, errorInfo);
    // }
  }

  /**
   * Reset error boundary state and reload the app
   */
  handleReload = () => {
    window.location.reload();
  };

  /**
   * Reset error state to try rendering again
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-message">
              We're sorry, but the application encountered an unexpected error.
            </p>

            {/* Show error details in development mode */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary-details">
                <summary>Error Details (Development Mode)</summary>
                <pre className="error-boundary-stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                className="error-boundary-button primary"
                onClick={this.handleReload}
              >
                Reload Application
              </button>
              <button
                className="error-boundary-button secondary"
                onClick={this.handleReset}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
