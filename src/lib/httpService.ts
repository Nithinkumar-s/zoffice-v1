const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function get(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    ...options,
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function post(endpoint: string, data: any, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    body: JSON.stringify(data),
    ...options,
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
