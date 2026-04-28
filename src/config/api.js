const defaultApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const apiBaseUrl = defaultApiBaseUrl.replace(/\/+$/, "");
