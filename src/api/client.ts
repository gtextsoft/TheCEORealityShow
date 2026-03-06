const API_BASE = import.meta.env.VITE_API_URL || '';

function getAuthToken(): string | null {
  return localStorage.getItem('admin_token');
}

export async function submitApplication(formData: FormData): Promise<{ id: string }> {
  const res = await fetch(`${API_BASE}/api/applications`, {
    method: 'POST',
    body: formData,
    headers: {},
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to submit application');
  }
  return res.json();
}

export async function adminLogin(email: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Login failed');
  }
  return res.json();
}

export async function getApplications(): Promise<ApplicationRecord[]> {
  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_BASE}/api/admin/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error('Session expired');
    throw new Error('Failed to load applications');
  }
  return res.json();
}

export interface ApplicationRecord {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  age: number;
  occupation: string;
  experience: string;
  whyYou: string;
  socials: string;
  videoUrl: string | null;
  videoPublicId: string | null;
  referral: string;
  createdAt: string;
  updatedAt: string;
}
