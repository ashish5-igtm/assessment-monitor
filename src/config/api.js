const defaultApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "https://ashish5-igtm-assessment-monitor-backend-production.up.railway.app/";

export const apiBaseUrl = defaultApiBaseUrl.replace(/\/+$/, "");
