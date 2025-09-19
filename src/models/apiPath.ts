const BASE_URL = process.env.BASE_URL;
const API_PATH = process.env.API_PATH;

function apiUrl(endpoint: string) {
  return `${API_PATH}.${endpoint}`;
}

export function img(path?: string | null): string {
    if (!path) return BASE_URL || '';
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path}`;
}

export const api = {
    SiteSettings: apiUrl("site_settings.get_site_settings"),
};