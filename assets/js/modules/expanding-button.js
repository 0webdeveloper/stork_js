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
                <div class="absolute inset-0 bg-black/40 p-4 md:p-12 flex flex-col justify-end text-white">
                    <div class="bg-white text-black text-xs md:text-sm font-bold px-3 py-1 rounded-full w-max mb-4">Блок ${block.title}</div>
                    <h3 class="font-unbounded text-xl md:text-3xl lg:text-4xl uppercase max-w-4xl leading-tight">${block.description || ''}</h3>
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
                 floorsContainer.querySelectorAll('button').forEach(b => {
                    b.className = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-gray-100 text-gray-400 hover:bg-gray-200';
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
            floorBtn.className = `w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-gray-100 text-gray-400 hover:bg-gray-200`;
            
            if (floor.count === 0) {
                floorBtn.classList.add('opacity-50', 'cursor-not-allowed');
                floorBtn.disabled = true;
            }

            floorBtn.textContent = floor.idx;
            
            floorBtn.addEventListener('click', () => {
                if (floor.count === 0) return;

                // Update active state
                container.querySelectorAll('button').forEach(b => {
                    b.className = 'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors shrink-0 bg-gray-100 text-gray-400 hover:bg-gray-200';
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
            this.renderCategories(container, categories, floorIdx);
        } catch (error) {
            console.error(error);
            container.innerHTML = '<div class="text-red-500 p-4">Ошибка загрузки данных</div>';
        }
    }

    renderCategories(container, categories, floorIdx) {
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
            // Get image
            let imagePath = '/storage/static/default_image.jpg';
            if (cat.pictures && cat.pictures.length > 0) {
                // Try to find one with path
                const pic = cat.pictures.find(p => p.path) || cat.pictures[0];
                if (pic && pic.path) imagePath = pic.path;
                else if (pic && pic.gallery) imagePath = pic.gallery;
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

            html += `
                <div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div class="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                        <img src="${imagePath}" class="w-full h-full object-cover" alt="${formattedName}">
                    </div>
                    <div class="mb-2">
                        <h5 class="font-bold text-lg leading-tight">${formattedName}</h5>
                    </div>
                    <div class="text-sm text-gray-500 mb-4">${areaText} m²</div>
                    
                    <div class="mt-auto pt-4 border-t border-gray-100">
                         <div class="text-xs text-gray-400 mb-1">${floorIdx} этаж</div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
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
