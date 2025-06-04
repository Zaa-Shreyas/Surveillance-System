import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#EAEFEF] p-8">
          <h1 className="text-3xl font-bold text-[#333446] mb-4">Something Went Wrong</h1>
          <p className="text-red-500 mb-4">{this.state.error?.message || 'An unknown error occurred.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#7F8CAA] text-white p-4 rounded-xl font-semibold"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;