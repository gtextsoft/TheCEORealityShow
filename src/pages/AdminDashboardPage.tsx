import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApplications, type ApplicationRecord } from '../api/client';
import styles from '../styles/components/admin.module.css';

const REFERRAL_LABELS: Record<string, string> = {
  social: 'Social Media',
  email: 'Email / Newsletter',
  tv: 'TV / Radio',
  friend: 'Friend / Family / Colleague',
  event: 'Event / Training',
  other: 'Other',
};

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getApplications()
      .then((data) => {
        if (!cancelled) setApplications(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load');
          if (err instanceof Error && err.message === 'Session expired') {
            logout();
            navigate('/admin/login', { replace: true });
          }
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  if (loading) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.adminCard}>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.adminCard}>
          <p className={styles.adminError}>{error}</p>
          <button type="button" className={styles.adminButton} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminDashboard}>
        <header className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>Applications</h1>
          <p className={styles.adminSubtitle}>{applications.length} total</p>
          <button type="button" className={styles.adminButtonSecondary} onClick={handleLogout}>
            Sign out
          </button>
        </header>

        <div className={styles.adminTableWrap}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>State</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.firstName} {app.lastName}</td>
                  <td><a href={`mailto:${app.email}`}>{app.email}</a></td>
                  <td><a href={`tel:${app.phone}`}>{app.phone}</a></td>
                  <td>{app.state}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.adminRowToggle}
                      onClick={() => setExpandedId(expandedId === app._id ? null : app._id)}
                      aria-expanded={expandedId === app._id}
                    >
                      {expandedId === app._id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.map((app) => expandedId === app._id && (
          <section key={app._id} className={styles.adminDetail} aria-label="Application details">
            <h2>{app.firstName} {app.lastName}</h2>
            <dl className={styles.adminDetailList}>
              <dt>Email</dt><dd><a href={`mailto:${app.email}`}>{app.email}</a></dd>
              <dt>Phone</dt><dd><a href={`tel:${app.phone}`}>{app.phone}</a></dd>
              <dt>State</dt><dd>{app.state}</dd>
              <dt>Age</dt><dd>{app.age}</dd>
              <dt>Occupation</dt><dd>{app.occupation}</dd>
              <dt>Experience</dt><dd>{app.experience}</dd>
              <dt>Why you</dt><dd>{app.whyYou}</dd>
              <dt>Socials</dt><dd><a href={app.socials} target="_blank" rel="noopener noreferrer">{app.socials}</a></dd>
              <dt>Referral</dt><dd>{REFERRAL_LABELS[app.referral] ?? app.referral}</dd>
              <dt>Submitted</dt><dd>{new Date(app.createdAt).toLocaleString()}</dd>
              {app.videoUrl && (
                <>
                  <dt>Video</dt>
                  <dd><a href={app.videoUrl} target="_blank" rel="noopener noreferrer">Watch video</a></dd>
                </>
              )}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
