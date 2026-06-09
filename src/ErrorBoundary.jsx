import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('PopX Error Boundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '100%', padding: '40px 28px',
          textAlign: 'center', gap: '16px'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="#6C4EF2" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '13px', color: '#7A7A7A', lineHeight: '1.6' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            style={{
              marginTop: '8px', padding: '12px 28px',
              background: '#6C4EF2', color: 'white',
              border: 'none', borderRadius: '8px',
              fontSize: '14px', fontWeight: '600',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Go back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
