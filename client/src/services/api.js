const API_BASE = '/api';

export async function fetchNav() {
  try {
    const res = await fetch(`${API_BASE}/nav`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch navigation:', err);
    return null;
  }
}

export async function fetchPageContent(page) {
  try {
    const res = await fetch(`${API_BASE}/content/${page}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch content for ${page}:`, err);
    return null;
  }
}

export async function submitContactForm(formData) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error('Failed to submit contact form:', err);
    return { ok: false, data: { errors: ['Network error. Please try again.'] } };
  }
}
