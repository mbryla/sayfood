const API_BASE =
  window.location.hostname === 'localhost' ? 'http://localhost:5001/say-food/us-central1' : 'https://us-central1-say-food.cloudfunctions.net';

const JSON_MIME_TYPE = 'application/json';
const BASE_HEADERS = {
  'Content-Type': JSON_MIME_TYPE,
  Accept: JSON_MIME_TYPE,
};

const request = (resource: string, options: RequestInit) =>
  fetch(`${API_BASE}${resource}`, {
    ...options,
    headers: {
      ...BASE_HEADERS,
      ...options.headers,
    },
  }).then(async response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json();
    } else {
      const payload = (await response.json()) || {};
      throw new Error(payload?.result?.error || 'unexpected error');
    }
  });

export const get = (resource: string, options?: RequestInit) =>
  request(resource, {
    method: 'GET',
    ...options,
  });

export const post = (resource: string, body: object, options?: RequestInit) =>
  request(resource, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });

export const put = (resource: string, body: object, options?: RequestInit) =>
  request(resource, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });

export const patch = (resource: string, body: object, options?: RequestInit) =>
  request(resource, {
    method: 'PATCH',
    body: JSON.stringify(body),
    ...options,
  });
