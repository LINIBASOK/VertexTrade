import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';

interface AuthResponse {
  token: string;
  username: string;
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation
  const validateForm = (): boolean => {
    if (!username.trim()) {
      setFormError('Username is required');
      return false;
    }
    if (!password.trim()) {
      setFormError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }

    setFormError(''); 
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setFormError('Invalid username or password');
        return;
      }

      const data: AuthResponse = await res.json();

      if (!data.token) {
        setFormError('Invalid username or password');
        return;
      }

      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('username', data.username);

      navigate('/dashboard');
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Sales Management System</h1>
          <p>Enter your credentials to access the system</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {formError && <p className="error-message">{formError}</p>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials:</p>
          <p className="demo-text">Username: admin | Password: password123</p>
        </div>
      </div>
    </div>
  );
}
