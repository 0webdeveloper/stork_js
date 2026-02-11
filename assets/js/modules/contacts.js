export class ContactsModule {
    constructor(mapId) {
        this.mapId = mapId;
        this.map = null;
        this.activeTab = 'location'; // 'location' or 'sales'
        
        // Coordinates
        this.locationCenter = [52.597845, 39.600828];
        this.salesCenter = [52.61713913890672, 39.571818835582064];
        
        // Polygon Data (from Vue component)
        this.polygonsData = [
            {
                coords: [
                    [52.5850539937766, 39.58183752120879],
                    [52.58236977501127, 39.57905293722851],
                    [52.58148326583969, 39.57786381195455],
                    [52.58114940026856, 39.5760900231277],
                    [52.58278267719059, 39.574128754650616],
                    [52.58363957543687, 39.56738096380811],
                    [52.58466276089402, 39.565341517504834],
                    [52.58635413401435, 39.56227695840334],
                    [52.58809818927463, 39.55924810693226],
                    [52.5941694579882, 39.563211996532566],
                    [52.59561459126541, 39.565126536998825],
                    [52.598180840288904, 39.567994799559905],
                    [52.59914716080281, 39.56952400087047],
                    [52.59516488276911, 39.59453972472462],
                    [52.59634449945607, 39.59465601273247],
                    [52.5963653542631, 39.594707511669434],
                    [52.59321407608694, 39.5944808899924],
                ],
                options: { color: 'none', fillColor: '#8C96FA', fillOpacity: 0.8, tooltip: 'Жилой массив(многоэтажное строительство)' }
            },
            {
                coords: [
                    [52.598409316480364, 39.615117909398016],
                    [52.599798146330734, 39.61420033680436],
                    [52.60121400266971, 39.6140192750139],
                    [52.601951739245926, 39.61238398863662],
                    [52.60287174261491, 39.610979800623916],
                    [52.60379957634887, 39.60553920273048],
                    [52.60475870207666, 39.60174548656176],
                    [52.60742198059179, 39.60188013977867],
                    [52.60780734107203, 39.6031801666588],
                    [52.60780734107203, 39.6031801666588],
                    [52.60780734107203, 39.6031801666588],
                    [52.607969104125736, 39.60476615018017],
                    [52.607772907557624, 39.60351729239881],
                    [52.61098201874281, 39.60916125752226],
                    [52.61159075167297, 39.61141851815907],
                    [52.61129125152768, 39.61189122794428],
                    [52.61168054524927, 39.61314811510724],
                    [52.61450744046934, 39.61682163963616],
                    [52.61545355049452, 39.6187914605074],
                    [52.615463973151854, 39.62049090840117],
                    [52.6142028183735, 39.62107455865442],
                    [52.61268104607242, 39.621950030105275],
                    [52.61198268074322, 39.62311732799242],
                    [52.61146150538865, 39.62212169148223],
                    [52.60959564700216, 39.62146937772594],
                    [52.60872328129029, 39.622563813685076],
                    [52.60908123395597, 39.62603287405227],
                    [52.60619656183293, 39.62881377563374],
                    [52.60534244273503, 39.62976062275664],
                    [52.603017600782636, 39.62517726451586],
                    [52.601537143060135, 39.62629306346606],
                    [52.600213030073405, 39.626516223779966],
                    [52.59868034453456, 39.62146937772594],
                    [52.59749169534728, 39.61825931050078],
                    [52.59672009821585, 39.618963121884356],
                    [52.59641845194982, 39.617392615705434],
                ],
                options: { color: 'none', fillColor: '#34D399', fillOpacity: 0.8, tooltip: 'Рекреационная зона: парки, Зоопарк' }
            },
            {
                coords: [
                    [52.598211, 39.596515],
                    [52.599014, 39.596397],
                    [52.599798, 39.596944],
                    [52.600471, 39.598274],
                    [52.600576, 39.602115],
                    [52.600047, 39.602823],
                    [52.599433, 39.602974],
                    [52.598590, 39.602233],
                    [52.598270, 39.600002],
                    [52.598688, 39.596354],
                ],
                options: { color: 'none', fillColor: '#FCD34D', fillOpacity: 0.8, tooltip: 'Частный сектор и исторические здания' }
            },
            {
                coords: [
                    [52.60172882748033, 39.5739355779228],
                    [52.60289072687556, 39.57440630133571],
                    [52.60714464715404, 39.57931873111875],
                    [52.60703614859274, 39.58609076136493],
                    [52.60738441234136, 39.5928628127126],
                    [52.59962666928777, 39.59590075240108],
                    [52.59566959964696, 39.596027970912836],
                ],
                options: { color: 'none', fillColor: '#F87171', fillOpacity: 0.8, tooltip: 'Исторический и культурный центр' }
            }
        ];

        this.init();
    }

    init() {
        this.initTabs();
        this.initMap();
        // this.initPDFButton(); // Handled by global modal logic
    }

    initTabs() {
        const btnLocation = document.getElementById('tab-btn-location');
        const btnSales = document.getElementById('tab-btn-sales');
        const contentLocation = document.getElementById('tab-content-location');
        const contentSales = document.getElementById('tab-content-sales');

        if (!btnLocation || !btnSales) return;

        const switchTab = (tab) => {
            this.activeTab = tab;
            
            if (tab === 'location') {
                btnLocation.classList.replace('custom-tab-inactive', 'custom-tab-active');
                btnSales.classList.replace('custom-tab-active', 'custom-tab-inactive');
                
                contentLocation.classList.remove('hidden');
                contentSales.classList.add('hidden');
                
                this.updateMap(this.locationCenter);
            } else {
                btnSales.classList.replace('custom-tab-inactive', 'custom-tab-active');
                btnLocation.classList.replace('custom-tab-active', 'custom-tab-inactive');
                
                contentSales.classList.remove('hidden');
                contentLocation.classList.add('hidden');
                
                this.updateMap(this.salesCenter);
            }
        };

        btnLocation.addEventListener('click', () => switchTab('location'));
        btnSales.addEventListener('click', () => switchTab('sales'));
    }

    initMap() {
        const mapElement = document.getElementById(this.mapId);
        if (!mapElement) return;

        // Initialize map
        this.map = L.map(this.mapId, {
            attributionControl: false
        }).setView(this.locationCenter, 15);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; Ained Digital ' + new Date().getFullYear() + '. Все права защищены.'
        }).addTo(this.map);

        // Add custom icon
        // Note: Using a default marker for now or a custom divIcon if image is missing
        const myIcon = L.icon({
            iconUrl: './assets/image/Contacts4.svg', // Assuming this path, might need to fix if file not present
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Add marker
        this.marker = L.marker(this.locationCenter).addTo(this.map);
        
        // Add popup
        this.marker.bindPopup(`
            <div class="p-1 text-center">
                <h2 class="font-unbounded text-xl uppercase text-white">STORK</h2>
            </div>
        `, {
            closeButton: false,
            maxWidth: '250px',
            className: 'custom-popup'
        }).openPopup();

        // Add polygons
        this.polygonsData.forEach(item => {
            const polygon = L.polygon(item.coords, item.options).addTo(this.map);
            if (item.options.tooltip) {
                polygon.bindTooltip(item.options.tooltip, { permanent: false });
            }
        });
    }

    updateMap(center) {
        if (!this.map) return;
        
        this.map.flyTo(center, 15, {
            duration: 1.5
        });
        
        this.marker.setLatLng(center);
    }

    initPDFButton() {
        const btn = document.getElementById('download-pdf-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const url = btn.getAttribute('data-pdf-url') || './assets/image/stork_presentation.pdf';
                if (url) {
                    window.open(url, '_blank');
                } else {
                    alert('Не удалось найти файл PDF для скачивания.');
                }
            });
        }
    }
}
