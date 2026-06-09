import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { useToast } from './useToast';
import { apiRegister } from './api';
import PageTransition from './PageTransition';

function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#EF4444', '#F97316', '#EAB308', '#22C55E'];

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Full name is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\d{10,}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid phone number';
  if (!form.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 6) errors.password = 'Minimum 6 characters';
  return errors;
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

export default function Signup() {
  const navigate = useNavigate();
  const { registerAccount } = useUser();
  const { showToast, ToastComponent } = useToast();
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', password: '', company: '', isAgency: 'yes',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const strength = getStrength(form.password);

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

  const getInputClass = (field) => {
    if (!touched[field]) return 'form-input';
    return `form-input ${errors[field] ? 'error' : 'success'}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { fullName: true, phone: true, email: true, password: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please fix the errors above', 'error');
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      await apiRegister(form); // simulate network
      registerAccount(form);   // save to in-memory DB
      showToast('✓ Account created!', 'success');
      setTimeout(() => navigate('/profile'), 600);
    } catch (err) {
      // Catches duplicate email or any thrown error
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="screen signup">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <h1 className="signup__title">Create your<br />PopX account</h1>

        <form className="signup__form" onSubmit={handleSubmit} noValidate>
          {[
            { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your name', required: true },
            { name: 'phone', label: 'Phone number', type: 'tel', placeholder: 'Enter phone number', required: true },
            { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', required: true },
          ].map(({ name, label, type, placeholder, required }) => (
            <div className="form-group" key={name}>
              <label className="form-label">
                {label}{required && <span style={{ color: 'var(--red)' }}>*</span>}
              </label>
              <div className="form-input-wrapper">
                <input className={getInputClass(name)} type={type} name={name}
                  placeholder={placeholder} value={form[name]}
                  onChange={handleChange} onBlur={handleBlur} />
                {touched[name] && (
                  <span className={`input-icon ${errors[name] ? 'error' : 'success'}`}>
                    {errors[name] ? <XIcon /> : <CheckIcon />}
                  </span>
                )}
              </div>
              {touched[name] && errors[name] && <p className="field-error">⚠ {errors[name]}</p>}
            </div>
          ))}

          {/* Password with strength */}
          <div className="form-group">
            <label className="form-label">Password<span style={{ color: 'var(--red)' }}>*</span></label>
            <div className="form-input-wrapper">
              <input className={getInputClass('password')} type={showPassword ? 'text' : 'password'}
                name="password" placeholder="Min. 6 characters" value={form.password}
                onChange={handleChange} onBlur={handleBlur} />
              <span className="input-icon" onClick={() => setShowPassword(s => !s)} style={{ cursor: 'pointer' }}>
                {showPassword
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </span>
            </div>
            {form.password && (
              <>
                <div className="strength-bar">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="strength-segment"
                      style={{ background: i <= strength ? strengthColors[strength] : undefined }} />
                  ))}
                </div>
                <p className="strength-label" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </p>
              </>
            )}
            {touched.password && errors.password && <p className="field-error">⚠ {errors.password}</p>}
          </div>

          {/* Company */}
          <div className="form-group">
            <label className="form-label">Company name</label>
            <input className="form-input" type="text" name="company"
              placeholder="Optional" value={form.company} onChange={handleChange} />
          </div>

          {/* Agency */}
          <div>
            <p className="radio-group-label">
              Are you an Agency?<span style={{ color: 'var(--red)' }}>*</span>
            </p>
            <div className="radio-group">
              {['yes', 'no'].map(val => (
                <label key={val} className="radio-option">
                  <input type="radio" name="isAgency" value={val}
                    checked={form.isAgency === val} onChange={handleChange} />
                  <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {apiError && (
            <div className="api-error-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {apiError}
            </div>
          )}

          <button className="btn-primary signup__submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>
        </form>

        {ToastComponent}
      </div>
    </PageTransition>
  );
}
