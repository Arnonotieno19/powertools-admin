import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  let data = null;
  if (response.status !== 204) {
    data = contentType?.includes("application/json") ? await response.json() : await response.text();
  }
  if (!response.ok) {
    const error = new Error(data?.message || data?.error || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function apiFetch(endpoint, { method = "GET", body, headers = {}, auth = true, signal, ...options } = {}) {
  const token = auth ? useAuthStore.getState().accessToken : null;
  const requestHeaders = { Accept: "application/json", ...headers };
  if (body && !(body instanceof FormData)) requestHeaders["Content-Type"] = "application/json";
  if (token) requestHeaders.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: requestHeaders,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    signal,
    ...options,
  });
  if (response.status === 401 && typeof window !== "undefined") useAuthStore.getState().logout();
  return parseResponse(response);
}

export const api = {
  get: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) => apiFetch(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options = {}) => apiFetch(endpoint, { ...options, method: "PUT", body }),
  patch: (endpoint, body, options = {}) => apiFetch(endpoint, { ...options, method: "PATCH", body }),
  delete: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: "DELETE" }),
};
