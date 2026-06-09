/**
 * Simulated API layer — mimics real network latency with realistic timing.
 * Swap these functions for actual fetch() calls when a backend exists.
 */

function simulateNetwork(minMs = 600, maxMs = 1000) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function apiRegister({ fullName, email, phone, company, password }) {
  await simulateNetwork(700, 1100);
  // In a real app: return fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({...}) })
  return { success: true };
}

export async function apiLogin({ email, password }) {
  await simulateNetwork(500, 900);
  // In a real app: return fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({...}) })
  return { success: true };
}
