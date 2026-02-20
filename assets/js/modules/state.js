// State Management and API Utils
import mitt from 'https://cdn.jsdelivr.net/npm/mitt@3.0.1/+esm';

export const emitter = mitt();

const API_BASE = 'https://stork-hotels.ru/api'; // Direct API access

export const state = {
    user: null,
    // Add other global state here
};

export async function fetchApi(endpoint, params = {}) {
    const url = new URL(`${API_BASE}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            console.warn('API response not OK', response.status, url.toString());
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}
