import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminLogin } from '../api/client';
import styles from '../styles/components/admin.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/admin';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await adminLogin(email.trim(), password);
      login(token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminCard}>
        <h1 className={styles.adminTitle}>Admin Login</h1>
        <p className={styles.adminSubtitle}>KeystoDCity Reality Show</p>
        <form onSubmit={handleSubmit} className={styles.adminForm}>
          {error && <div className={styles.adminError} role="alert">{error}</div>}
          <label className={styles.adminLabel}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.adminInput}
              required
              autoComplete="email"
              autoFocus
            />
          </label>
          <label className={styles.adminLabel}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.adminInput}
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className={styles.adminButton} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
