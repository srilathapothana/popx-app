import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from './UserContext';
import { useToast } from './useToast';
import PageTransition from './PageTransition';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { showToast, ToastComponent } = useToast();

  // Guard: redirect if not logged in
  if (!user) {
    navigate('/', { replace: true });
    return null;
  }

  const initials = user.fullName
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully');
    setTimeout(() => navigate('/'), 700);
  };

  const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <PageTransition>
      <div className="screen profile">
        <div className="profile__header-bar">
          <h2 className="profile__header-title">Account Settings</h2>
        </div>

        <motion.div variants={stagger} initial="initial" animate="animate">
          <motion.div variants={fadeUp} className="profile__card">
            <div className="profile__user-section">
              <div className="profile__avatar-wrapper">
                <div className="profile__avatar">
                  <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
                    <circle cx="34" cy="34" r="34" fill="#D4C5F9"/>
                    <circle cx="34" cy="27" r="13" fill="#9B7FF0"/>
                    <ellipse cx="34" cy="58" rx="21" ry="15" fill="#9B7FF0"/>
                    <text x="34" y="31" textAnchor="middle" dominantBaseline="middle"
                      fontSize="15" fontWeight="700" fill="white" fontFamily="Inter,sans-serif">
                      {initials}
                    </text>
                  </svg>
                </div>
                <div className="profile__avatar-badge"
                  onClick={() => showToast('Photo upload coming soon')}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </div>
              </div>
              <div className="profile__user-info">
                <p className="profile__user-name">{user.fullName}</p>
                <p className="profile__user-email">{user.email}</p>
              </div>
            </div>

            <div className="profile__bio-section">
              <p className="profile__bio-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
              </p>
            </div>

            {(user.phone || user.company) && (
              <div className="profile__details">
                {user.phone && (
                  <div className="profile__detail-row">
                    <span className="profile__detail-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="profile__detail-label">Phone</p>
                      <p className="profile__detail-value">{user.phone}</p>
                    </div>
                  </div>
                )}
                {user.company && (
                  <div className="profile__detail-row">
                    <span className="profile__detail-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </span>
                    <div>
                      <p className="profile__detail-label">Company</p>
                      <p className="profile__detail-value">{user.company}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.button variants={fadeUp} className="profile__logout-btn" onClick={handleLogout}>
            Log out
          </motion.button>
        </motion.div>

        {ToastComponent}
      </div>
    </PageTransition>
  );
}
