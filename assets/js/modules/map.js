import L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/+esm';

// We don't import CSS here in vanilla JS, it must be in HTML <head>

export function initMap(containerId, lat, lng) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const map = L.map(containerId).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup('Stork Hotel')
        .openPopup();
}
