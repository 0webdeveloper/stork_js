import Lenis from 'https://unpkg.com/lenis@1.3.17/dist/lenis.mjs';

export class ExpandingButtonModule {
    constructor() {
        this.buttons = document.querySelectorAll('.button');
        this.overlay = document.querySelector('.stork-overflow');
        this.openedBtn = null;
        this.lenis = window.lenis || new Lenis();
        
        // Cache for API responses to avoid re-fetching
        this.cache = {
            facade: {},
            categories: {}
        };

        this.init();
    }

    init() {
        if (!this.buttons.length) return;

        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e));
        });

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.close-expanded-btn')) {
                this.close();
            }
        });

        // Event delegation for slider navigation
        document.addEventListener('click', (e) => {
            const prevBtn = e.target.closest('.slider-prev');
            const nextBtn = e.target.closest('.slider-next');
            
            if (prevBtn) {
                this.handleSliderNav(prevBtn, -1);
            } else if (nextBtn) {
                this.handleSliderNav(nextBtn, 1);
            }
        });
    }

    async handleButtonClick(e) {
        // Prevent if clicking inside already opened content (unless it's a floor button handled separately)
        if (e.target.closest('.expanded-content')) return;

        const btn = e.target.closest('.button');
        if (!btn || btn.classList.contains('open')) return;

        this.openedBtn = btn;
        const blockId = btn.getAttribute('data-block-id');
        
        // Stop Lenis
        if (this.lenis) this.lenis.stop();

        // Calculate viewport size
        const vw = window.innerWidth || document.documentElement.clientWidth;
        const vh = window.innerHeight || document.documentElement.clientHeight;

        // Set size
        btn.style.maxWidth = Math.floor(vw * 0.9) + 'px';
        btn.style.maxHeight = Math.floor(vh * 0.9) + 'px';

        btn.classList.add('open');
        if (this.overlay) this.overlay.classList.add('open');
        
        document.body.style.overflow = 'hidden';

        // Render Loading State
        this.renderLoading(btn);

        // Fetch and Render Data
        try {
            const facadeData = await this.fetchFacadeData(blockId);
            if (facadeData && facadeData.data) {
                this.renderBlockData(btn, facadeData.data);
            } else {
                this.renderError(btn, "Ошибка загрузки данных блока");
            }
        } catch (error) {
            console.error('Error fetching facade data:', error);
            this.renderError(btn, "Не удалось загрузить данные");
        }

        // Center
        requestAnimationFrame(() => {
            this.centerToButton(btn);
        });

        // Show content
        const content = btn.querySelector('.expanded-content');
        if (content) {
            setTimeout(() => {
                content.classList.remove('hidden');
                content.classList.add('opacity-100');
            }, 500);
        }
    }

    async fetchFacadeData(blockId) {
        if (this.cache.facade[blockId]) return this.cache.facade[blockId];

        const response = await fetch(`https://stork-hotels.ru/api/facade?block_id=${blockId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        this.cache.facade[blockId] = data;
        return data;
    }

    async fetchCategoriesData(blockId, floor) {
        const key = `${blockId}-${floor}`;
        if (this.cache.categories[key]) return this.cache.categories[key];

        const response = await fetch(`https://stork-hotels.ru/api/facade/categories?block_id=${blockId}&floor=${floor}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        this.cache.categories[key] = data;
        return data;
    }

    renderLoading(btn) {
        // Optional: Add loading spinner or skeleton
    }

    renderError(btn, message) {
        const headerContainer = btn.querySelector('.block-header');
        if (headerContainer) {
            headerContainer.innerHTML = `<div class="p-8 text-white">${message}</div>`;
        }
    }

    renderBlockData(btn, data) {
        const block = data.block;
        const floors = data.floors_collection;

        // Header
        const headerContainer = btn.querySelector('.block-header');
        if (headerContainer && block) {
            // Find a photo for background
            const bgImage = block.pictures.find(p => p.type === 'photo')?.path || '';
            
            headerContainer.innerHTML = `
                <img src="${bgImage}" class="w-full h-full object-cover" alt="Block Image">
                <div class="absolute inset-0 bg-black/40 p-4 md:p-12 flex flex-col justify-start text-white">
                    <div class="bg-white text-black text-xs md:text-sm font-bold px-3 py-1 rounded-full w-max mb-4">Блок ${block.title} • ${floors ? floors.length : 0} этажей</div>
                    <h3 class="font-unbounded text-xl md:text-3xl lg:text-4xl uppercase max-w-4xl leading-tight">Высоколиквидные инвестиции. Пространство для комфортного проживания</h3>
                </div>
            `;
        }

        // Floors
        const floorsContainer = btn.querySelector('.floors-nav');
        if (floorsContainer && floors) {
            this.renderFloors(floorsContainer, floors, btn, block.id);
        }

        // Initial Apartments (first available floor)
        const firstAvailableFloor = floors.find(f => f.count > 0);
        if (firstAvailableFloor) {
            // Mark the first available floor as active in UI
            const firstBtn = floorsContainer.querySelector(`button[data-floor="${firstAvailableFloor.idx}"]`);
            if (firstBtn) {
                 // Reset others
                 floorsContainer.querySelectorAll('button:not(:disabled)').forEach(b => {
                    b.className = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-pointer';
                });
                firstBtn.className = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-black text-white';
            }
            this.loadAndRenderCategories(btn, block.id, firstAvailableFloor.idx);
        }
    }

    renderFloors(container, floors, btn, blockId) {
        // Create scrollable container
        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'flex items-center space-x-2 overflow-x-auto p-4 md:px-8 hide-scrollbar';
        
        floors.forEach((floor) => {
            const floorBtn = document.createElement('button');
            floorBtn.setAttribute('data-floor', floor.idx);
            
            // Initial styling (inactive by default)
            floorBtn.className = `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-pointer`;
            
            if (floor.count === 0) {
                floorBtn.classList.remove('hover:bg-gray-200');
                floorBtn.classList.add('opacity-50');
                floorBtn.disabled = true;
            }

            floorBtn.textContent = floor.idx;
            
            floorBtn.addEventListener('click', () => {
                if (floor.count === 0) return;

                // Update active state
                container.querySelectorAll('button:not(:disabled)').forEach(b => {
                    b.className = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-pointer';
                });
                floorBtn.className = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-black text-white';
                
                // Render categories
                this.loadAndRenderCategories(btn, blockId, floor.idx);
            });

            scrollContainer.appendChild(floorBtn);
        });

        container.innerHTML = '';
        container.appendChild(scrollContainer);
    }

    async loadAndRenderCategories(btn, blockId, floorIdx) {
        const container = btn.querySelector('.apartments-list');
        if (!container) return;

        container.innerHTML = '<div class="h-40 flex items-center justify-center"><div class="animate-pulse text-gray-400">Загрузка...</div></div>';

        try {
            const categories = await this.fetchCategoriesData(blockId, floorIdx);
            this.renderCategories(container, categories, floorIdx, blockId);
        } catch (error) {
            console.error(error);
            container.innerHTML = '<div class="text-red-500 p-4">Ошибка загрузки данных</div>';
        }
    }

    renderCategories(container, categories, floorIdx, blockId) {
        if (!categories || categories.length === 0) {
            container.innerHTML = `
                <div class="h-full flex items-center justify-center text-gray-400">
                    <p>На этом этаже нет свободных лотов</p>
                </div>
            `;
            return;
        }

        let html = `
            <h4 class="font-unbounded text-xl mb-6">Лоты <span class="text-gray-400 text-base ml-2">${floorIdx} этаж</span></h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        `;

        categories.forEach(cat => {
            // Get images (prefer gallery property as requested)
            const images = [];
            if (cat.pictures && cat.pictures.length > 0) {
                cat.pictures.forEach(p => {
                    if (p.gallery) {
                        images.push(p.gallery);
                    }
                });
            }
            
            // Fallback image if no gallery images found
            if (images.length === 0) {
                images.push('/storage/static/default_image.jpg');
            }

            // Image Area HTML
            let imageHtml = '';
            if (images.length > 1) {
                // Slider
                const slides = images.map(src => `<div class="w-full h-full shrink-0"><img src="${src}" class="w-full h-full object-cover"></div>`).join('');
                imageHtml = `
                    <div class="relative w-full h-full group slider-container" data-current-index="0" data-total="${images.length}">
                        <div class="slider-track flex w-full h-full transition-transform duration-300 ease-out" style="transform: translateX(0%);">
                            ${slides}
                        </div>
                        <button class="slider-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm" type="button">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button class="slider-next absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm" type="button">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-0.5 rounded-full text-white text-[10px]">
                            1/${images.length}
                        </div>
                    </div>
                `;
            } else {
                // Single Image
                imageHtml = `<img src="${images[0]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${cat.name || 'Лот'}">`;
            }

            // Area text
            let areaText = '';
            if (parseFloat(cat.min_area) === parseFloat(cat.max_area)) {
                areaText = `${cat.min_area}`;
            } else {
                areaText = `${cat.min_area} - ${cat.max_area}`;
            }

            // Name formatting
            const name = cat.name || cat.current_name || 'Лот';
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

            // Status Badge
            const statusName = cat.status?.name || '';
            const isSold = statusName.toLowerCase().includes('продан');
            const statusHtml = statusName ? `
                <div class="absolute top-4 right-4 z-20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${isSold ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'}">
                    ${statusName}
                </div>
            ` : '';

            // Abbreviation
            const abbreviation = cat.abbreviation || (cat.category ? cat.category.abbreviation : '') || '';
            const abbrHtml = abbreviation ? `
                <div class="bg-[#902F2F] py-0.5 px-3 text-white rounded self-start text-sm font-bold uppercase mb-2 inline-block">
                    ${abbreviation}
                </div>
            ` : '';

            // Block ID
            const currentBlockId = blockId || (cat.block ? cat.block.name : '');

            html += `
                <div class="bg-white p-5 rounded-lg relative group cursor-pointer hover:shadow-xl transition-all duration-300">
                    ${statusHtml}
                    <div class="mb-5 relative aspect-[3/2.5] rounded-xl overflow-hidden bg-gray-200">
                        ${imageHtml}
                    </div>

                    <div class="flex items-start justify-between gap-4 flex-wrap">
                        <div class="flex flex-col gap-2.5">
                            ${abbrHtml}
                            <p class="font-unbounded text-2xl text-black leading-tight">${formattedName}</p>
                            <p class="text-sm font-semibold text-gray-600">
                                ${areaText} m²
                            </p>
                        </div>
                        <div class="text-left">
                            <p class="font-bold text-black">
                                ${floorIdx} этаж
                            </p>
                            <p class="text-sm text-gray-400 font-medium">блок ${currentBlockId}</p>
                        </div>
                    </div>
                    
                    <!-- Link Overlay -->
                    <a href="lots/detail.html?id=${cat.id}" class="absolute inset-0 z-10" onclick="if(event.target.closest('.slider-prev, .slider-next')) event.preventDefault();"></a>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    handleSliderNav(btn, direction) {
        const container = btn.closest('.slider-container');
        if (!container) return;

        const track = container.querySelector('.slider-track');
        let currentIndex = parseInt(container.getAttribute('data-current-index') || '0');
        const total = parseInt(container.getAttribute('data-total') || '1');

        currentIndex += direction;

        if (currentIndex < 0) currentIndex = total - 1;
        if (currentIndex >= total) currentIndex = 0;

        container.setAttribute('data-current-index', currentIndex);
        
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Update counter if exists
        const counter = container.querySelector('.absolute.bottom-2');
        if (counter) {
            counter.textContent = `${currentIndex + 1}/${total}`;
        }
    }

    centerToButton(btn) {
        const rect = btn.getBoundingClientRect();
        const btnCenterY = rect.top + rect.height / 2;
        const viewportCenterY = window.innerHeight / 2;
        const scrollOffset = btnCenterY - viewportCenterY;

        window.scrollBy({
            top: scrollOffset,
            behavior: 'smooth'
        });
    }

    close() {
        if (!this.openedBtn) return;

        const content = this.openedBtn.querySelector('.expanded-content');
        if (content) {
            content.classList.add('hidden');
            content.classList.remove('opacity-100');
        }

        this.openedBtn.classList.remove('open');
        this.openedBtn.style.maxWidth = '';
        this.openedBtn.style.maxHeight = '';

        if (this.overlay) this.overlay.classList.remove('open');
        
        document.body.style.overflow = '';
        
        // Resume Lenis
        if (this.lenis) this.lenis.start();
        
        this.openedBtn = null;
    }
}
