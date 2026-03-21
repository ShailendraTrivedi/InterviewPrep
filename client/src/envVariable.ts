const DEFAULT_API_BASE_URL = 'http://localhost:5000';

/**
 * Backend API base URL from `VITE_API_URL` in `.env`, or {@link DEFAULT_API_BASE_URL}.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || DEFAULT_API_BASE_URL;
