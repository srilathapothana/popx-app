import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="screen" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px', textAlign: 'center', gap: '16px'
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6C4EF2" strokeWidth="1.2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="12"/>
          <line x1="11" y1="16" x2="11.01" y2="16"/>
        </svg>
        <p style={{ fontSize: '56px', fontWeight: '800', color: '#6C4EF2', lineHeight: 1 }}>404</p>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A' }}>Page not found</h2>
        <p style={{ fontSize: '13px', color: '#7A7A7A', lineHeight: '1.6' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '8px', padding: '13px 32px',
            background: '#6C4EF2', color: 'white',
            border: 'none', borderRadius: '8px',
            fontSize: '14px', fontWeight: '600',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 14px rgba(108,78,242,0.25)'
          }}
        >
          Back to Home
        </button>
      </div>
    </PageTransition>
  );
}
