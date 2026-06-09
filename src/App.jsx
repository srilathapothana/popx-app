import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './UserContext';
import ErrorBoundary from './ErrorBoundary';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import NotFound from './NotFound';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="phone-shell">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
