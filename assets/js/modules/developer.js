export class DeveloperModule {
    constructor(mapId) {
        this.mapId = mapId;
        this.map = null;
        
        // Coordinates from devsProjects.js
        this.coordinates = [
            { coordinate: [52.603384, 39.570806], title: 'улица Ульяны Громовой, 2А' },
            { coordinate: [52.621894, 39.559452], title: 'улица Гагарина, 131А' },
            { coordinate: [52.602908, 39.510754], title: 'улица С.С. Бехтеева, 1' },
            { coordinate: [52.604030, 39.508715], title: 'улица С.С. Бехтеева, 4' },
            { coordinate: [52.607043, 39.502193], title: 'улица А.Д. Белянского, 12' },
            { coordinate: [52.607524, 39.503046], title: 'улица А.Д. Белянского, 14' },
            { coordinate: [52.605309, 39.509658], title: 'Политехническая улица, 3' },
            { coordinate: [52.606879, 39.508724], title: 'Политехническая улица, 7' },
            { coordinate: [52.606283, 39.507268], title: 'улица Н.Г. Славянова, 3' },
            { coordinate: [52.603209, 39.598537], title: 'Первомайская улица, 3' },
            { coordinate: [52.605348, 39.501968], title: 'улица Е.И. Замятина, 3' },
            { coordinate: [52.613146, 39.568021], title: 'улица Валентины Терешковой, 32/3' },
            { coordinate: [52.621631, 39.569647], title: 'улица Валентины Терешковой, 1/2' },
            { coordinate: [52.617640, 39.575289], title: 'улица Космонавтов, 16' },
            { coordinate: [52.617591, 39.574507], title: 'улица Космонавтов, 18' },
            { coordinate: [52.617553, 39.573564], title: 'улица Космонавтов, 20' },
            { coordinate: [52.617460, 39.571839], title: 'улица Космонавтов, 24' },
            { coordinate: [52.617438, 39.571031], title: 'улица Космонавтов, 26' },
            { coordinate: [52.612758, 39.594270], title: 'улица Зегеля, 13А' },
            { coordinate: [52.607989, 39.597109], title: 'Кузнечная улица, 4Б' },
            { coordinate: [52.602558, 39.598977], title: 'ЖК UnderSun' },
            { coordinate: [52.636253, 38.459330], title: 'ЖК Адмирал' },
            { coordinate: [52.462893, 38.953394], title: 'Отель-клуб Донской лес' },
            { coordinate: [52.043917, 39.735674], title: 'Дом культуры' },
            { coordinate: [52.589080, 39.463278], title: 'ЖК Мелодия' },
            { coordinate: [52.595119, 39.581757], title: 'ЖК Азбука' },
            { coordinate: [52.613851, 39.596202], title: 'ЖК Версаль' },
            { coordinate: [52.602974, 39.510035], title: 'ЖК Виктория' },
            { coordinate: [52.593768, 39.490218], title: 'ЖК Горизонт' },
            { coordinate: [52.621949, 39.577849], title: 'ЖК Интер' },
            { coordinate: [52.582120, 39.541674], title: 'ЖК Карамель' },
            { coordinate: [52.618450, 39.587102], title: 'ЖК Континент' },
            { coordinate: [52.620046, 39.624827], title: 'ЖК Парус' },
            { coordinate: [52.622074, 39.581299], title: 'ЖК Аист Тауэр' },
            { coordinate: [52.528632, 39.457699], title: 'Город-спутник Romanovo City' },
            { coordinate: [52.597220, 39.599292], title: 'Инвестиционный проект Stork Hotel' },
            { coordinate: [52.613906, 39.752697], title: 'Клубный посёлок Lipchanka Forestvill' }
        ];

        this.init();
        this.initAnimations();
    }

    init() {
        const mapElement = document.getElementById(this.mapId);
        if (!mapElement) return;

        // Initialize map
        this.map = L.map(this.mapId, {
            attributionControl: false,
            zoomControl: true,
            scrollWheelZoom: false
        }).setView(this.coordinates[0].coordinate, 11);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; Ained Digital ' + new Date().getFullYear() + '. Все права защищены.'
        }).addTo(this.map);

        // Add markers
        const myIcon = L.icon({
            iconUrl: './assets/image/Contacts4.svg',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        this.coordinates.forEach(item => {
            const popupContent = `
                <div class="p-1 min-w-[200px]">
                    <h2 class="font-bold text-sm uppercase text-black font-unbounded text-center">${item.title}</h2>
                </div>
            `;
            
            L.marker(item.coordinate, { icon: myIcon })
                .addTo(this.map)
                .bindPopup(popupContent, {
                    closeButton: false,
                    maxWidth: 250,
                    className: 'custom-popup'
                });
        });

        // Add attribution control manually to match Vue
        L.control.attribution({
            position: 'bottomright',
            prefix: ''
        }).addTo(this.map);
    }

    initAnimations() {
        // Simple intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.dev-img').forEach((el, index) => {
            // Add initial state styles if not present in CSS
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            
            // Add animation class logic
            el.classList.add('opacity-0', 'translate-y-12'); // Tailwind utilities for initial state
            
            observer.observe(el);
        });
        
        // Handle custom animation class
        const style = document.createElement('style');
        style.textContent = `
            .animate-fade-in-up {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            .leaflet-popup-content-wrapper {
                background: white;
                border-radius: 4px;
            }
            .leaflet-popup-tip {
                background: white;
            }
        `;
        document.head.appendChild(style);
    }
}
