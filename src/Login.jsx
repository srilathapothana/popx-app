import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { useToast } from './useToast';
import { apiLogin } from './api';
import PageTransition from './PageTransition';

function validate(form) {
  const errors = {};
  if (!form.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 6) errors.password = 'Minimum 6 characters';
  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const { loginWithCredentials } = useUser();
  const { showToast, ToastComponent } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setApiError('');
    if (touched[e.target.name]) setErrors(validate(updated));
  };

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setApiError('');

    try {
      // Simulate network call
      await apiLogin({ email: form.email, password: form.password });

      // Validate against registered accounts
      const ok = loginWithCredentials(form.email, form.password);
      if (!ok) {
        setApiError('Incorrect email or password. Please try again.');
        setLoading(false);
        return;
      }

      showToast('✓ Logged in successfully', 'success');
      setTimeout(() => navigate('/profile'), 600);
    } catch (err) {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (field) => {
    if (!touched[field]) return 'form-input';
    return `form-input ${errors[field] ? 'error' : 'success'}`;
  };

  return (
    <PageTransition>
      <div className="screen login">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <h1 className="login__title">Signin to your<br />PopX account</h1>
        <p className="login__subtitle">
          Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
        </p>

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <div className="form-input-wrapper">
              <input className={getInputClass('email')} type="email" name="email"
                placeholder="Enter email address" value={form.email}
                onChange={handleChange} onBlur={handleBlur} autoComplete="email" />
              {touched.email && (
                <span className={`input-icon ${errors.email ? 'error' : 'success'}`}>
                  {errors.email
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  }
                </span>
              )}
            </div>
            {touched.email && errors.email && <p className="field-error">⚠ {errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-wrapper">
              <input className={getInputClass('password')} type={showPassword ? 'text' : 'password'}
                name="password" placeholder="Enter password" value={form.password}
                onChange={handleChange} onBlur={handleBlur} autoComplete="current-password" />
              <span className="input-icon" onClick={() => setShowPassword(s => !s)} style={{ cursor: 'pointer' }}>
                {showPassword
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </span>
            </div>
            {touched.password && errors.password && <p className="field-error">⚠ {errors.password}</p>}
          </div>

          {/* API-level error (wrong credentials) */}
          {apiError && (
            <div className="api-error-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {apiError}
            </div>
          )}

          <button className="btn-primary login__submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Login'}
          </button>
        </form>

        <p className="login__footer">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>

        {ToastComponent}
      </div>
    </PageTransition>
  );
}
