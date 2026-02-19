
import { fetchApi } from './state.js';

export class LotsModule {
    constructor(gridId, categoriesId) {
        this.gridContainer = document.getElementById(gridId);
        this.categoriesContainer = document.getElementById(categoriesId);
        this.filterContainer = document.getElementById('status-filter');
        this.loadMoreContainer = document.getElementById('load-more-container');
        this.loadMoreBtn = document.getElementById('load-more-btn');

        this.categories = [];
        this.currentCategoryId = null;
        
        // Data State
        this.allLots = [];      // All lots fetched for current category
        this.filteredLots = []; // Lots after status filter
        this.visibleLots = [];  // Lots currently shown (pagination)
        
        // Filter State
        this.currentStatus = 'all'; // 'all' or 'sale'
        
        // Pagination State
        this.currentPage = 1;
        this.itemsPerPage = 8;
        
        if (this.gridContainer && this.categoriesContainer) {
            this.init();
        }
    }

    async init() {
        console.log('Initializing Lots Module...');
        
        // Init Load More
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMore());
        }

        try {
            await this.fetchCategories();
        } catch (e) {
            console.error('Failed to init lots:', e);
            this.gridContainer.innerHTML = '<p class="text-red-500 text-center col-span-full">Ошибка загрузки данных</p>';
        }
    }

    async fetchCategories(queryParams = {}) {
        const params = { id: 0, ...queryParams };
        const data = await fetchApi('/categories', params);
        
        if (data && Array.isArray(data)) {
            this.categories = data;
            this.renderCategories();
            this.renderStatusFilter();
            
            // Select first category by default if any
            if (this.categories.length > 0) {
                // If we have a categoryMatch in URL or previous selection, handle it? 
                // For now just select first.
                this.selectCategory(this.categories[0].id);
            } else {
                // Clear grid if no categories
                this.categoriesContainer.innerHTML = '';
                this.gridContainer.innerHTML = '<p class="text-white text-center col-span-full font-unbounded">Нет категорий</p>';
            }
        }
    }

    renderCategories() {
        if (!this.categoriesContainer) return;

        this.categoriesContainer.innerHTML = this.categories.map(cat => `
            <button 
                class="category-btn whitespace-nowrap px-4 py-2 text-white border-b-2 border-transparent hover:text-gray-300 transition-colors"
                data-id="${cat.id}"
            >
                ${cat.name}
            </button>
        `).join('');

        this.categoriesContainer.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                this.selectCategory(id);
            });
        });
    }
    
    renderStatusFilter() {
        if (!this.filterContainer) return;
        
        // Simple toggle for "In Sale"
        this.filterContainer.innerHTML = `
            <label class="inline-flex items-center cursor-pointer gap-2">
                <span class="text-white text-sm font-medium">Только в продаже</span>
                <input type="checkbox" id="status-toggle" class="sr-only peer">
                <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
        `;
        
        const toggle = this.filterContainer.querySelector('#status-toggle');
        toggle.addEventListener('change', (e) => {
            this.currentStatus = e.target.checked ? 'sale' : 'all';
            this.applyFilters();
        });
    }

    selectCategory(id) {
        this.currentCategoryId = id;
        
        // Update UI active state
        const buttons = this.categoriesContainer.querySelectorAll('.category-btn');
        buttons.forEach(btn => {
            if (btn.dataset.id == id) {
                btn.classList.add('border-white');
                btn.classList.remove('border-transparent');
            } else {
                btn.classList.remove('border-white');
                btn.classList.add('border-transparent');
            }
        });

        // Reset and Fetch
        this.fetchSubcategories(id);
    }

    async fetchSubcategories(categoryId) {
        this.renderSkeleton();
        this.allLots = [];
        this.filteredLots = [];
        this.visibleLots = [];
        this.currentPage = 1;
        
        try {
            const data = await fetchApi('/categories', { id: categoryId });
            
            if (data && Array.isArray(data)) {
                this.allLots = data;
                this.applyFilters();
            } else {
                this.gridContainer.innerHTML = '<p class="text-white text-center col-span-full font-unbounded">Нет результатов</p>';
                this.updateLoadMore();
            }
        } catch (e) {
            console.error(e);
            this.gridContainer.innerHTML = '<p class="text-white text-center col-span-full font-unbounded">Ошибка загрузки</p>';
        }
    }
    
    applyFilters() {
        // Filter by status if needed
        if (this.currentStatus === 'sale') {
            // Assume 'status' object or field. 
            // In renderLot (detail.html), we saw lot.status?.name || 'В продаже'.
            // If the API returns status object, we check it.
            // If the lot has no status field, we might assume it's in sale?
            // Let's filter items that DON'T have "Sold" or "Reserved" status if possible.
            // Or if there is a status_id.
            // For now, let's filter based on typical conventions or just show all if unsure.
            // Let's assume there is a 'status' object.
            
            this.filteredLots = this.allLots.filter(lot => {
                const s = lot.status?.name?.toLowerCase();
                if (!s) return true; // Default to show
                return !s.includes('продан') && !s.includes('бронь');
            });
        } else {
            this.filteredLots = [...this.allLots];
        }
        
        // Reset Pagination
        this.currentPage = 1;
        this.updateVisibleLots();
    }
    
    updateVisibleLots() {
        const start = 0;
        const end = this.currentPage * this.itemsPerPage;
        this.visibleLots = this.filteredLots.slice(start, end);
        
        this.renderGrid();
        this.updateLoadMore();
    }
    
    loadMore() {
        this.currentPage++;
        this.updateVisibleLots();
    }
    
    updateLoadMore() {
        if (!this.loadMoreContainer) return;
        
        if (this.visibleLots.length < this.filteredLots.length) {
            this.loadMoreContainer.classList.remove('hidden');
        } else {
            this.loadMoreContainer.classList.add('hidden');
        }
    }

    renderSkeleton() {
        this.gridContainer.innerHTML = Array(4).fill(0).map(() => `
            <div class="aspect-[4/5] bg-gray-800 animate-pulse rounded-lg"></div>
        `).join('');
        if (this.loadMoreContainer) this.loadMoreContainer.classList.add('hidden');
    }

    renderGrid() {
        if (!this.visibleLots.length) {
            this.gridContainer.innerHTML = '<p class="text-white text-center col-span-full font-unbounded">Нет лотов</p>';
            return;
        }

        this.gridContainer.innerHTML = this.visibleLots.map(item => this.createCardHtml(item)).join('');
    }

    createCardHtml(card) {
        let imageHtml = '';
        const images = [];
        const title = this.formatTitle(card.name || card.category?.current_name || '');

        if (card.pictures && card.pictures.length > 0) {
             card.pictures.forEach(p => {
                 if (p.gallery) images.push(p.gallery);
             });
        }
        
        if (images.length === 0) {
            images.push('/storage/static/default_image.jpg');
        }

        if (images.length > 1) {
            // Slider
            const slides = images.map(src => `<div class="w-full h-full shrink-0"><img src="${src}" class="w-full h-full object-cover"></div>`).join('');
            imageHtml = `
                <div class="relative w-full h-full group slider-container" data-current-index="0" data-total="${images.length}">
                    <div class="slider-track flex w-full h-full transition-transform duration-300 ease-out" style="transform: translateX(0%);">
                        ${slides}
                    </div>
                    <button class="slider-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm" type="button">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button class="slider-next absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm" type="button">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-0.5 rounded-full text-white text-[10px]">
                        1/${images.length}
                    </div>
                </div>
            `;
        } else {
            imageHtml = `<img src="${images[0]}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${title}">`;
        }
        
        let areaText = '';
        if (card.min_area == card.max_area) {
            areaText = card.min_area;
        } else if (card.area) {
            areaText = card.area;
        } else {
            areaText = `${card.min_area || card.area} - ${card.max_area}`;
        }

        let floorText = '';
        if (card.requestCurrentFloor) {
            floorText = card.requestCurrentFloor;
        } else if (card.min_floor == card.max_floor) {
            floorText = card.min_floor;
        } else {
            floorText = `${card.min_floor || card.floor} - ${card.max_floor}`;
        }
        
        const blocks = Array.isArray(card.blocks) ? card.blocks : (card.block ? [card.block] : []);
        const blocksHtml = blocks.map(b => `<p class="text-sm text-gray-400 font-medium">блок ${b.name}</p>`).join('');

        const statusName = card.status?.name || '';
        const isSold = statusName.toLowerCase().includes('продан');
        const statusHtml = statusName ? `
            <div class="absolute top-4 right-4 z-20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${isSold ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'}">
                ${statusName}
            </div>
        ` : '';

        const abbreviation = card.abbreviation || (card.category ? card.category.abbreviation : '') || '';
        const abbrHtml = abbreviation ? `
            <div class="bg-[#902F2F] py-0.5 px-3 text-white rounded self-start text-sm font-bold uppercase mb-2 inline-block">
                ${abbreviation}
            </div>
        ` : '';

        const categoryId = card.category_id || card.category?.id || card.id;

        return `
            <div class="bg-white p-5 rounded-lg relative group cursor-pointer hover:shadow-xl transition-all duration-300">
                ${statusHtml}
                <div class="mb-5 relative aspect-[3/2.5] rounded-xl overflow-hidden bg-gray-200">
                    ${imageHtml}
                </div>

                <div class="flex items-start justify-between gap-4 flex-wrap">
                    <div class="flex flex-col gap-2.5">
                        ${abbrHtml}
                        <p class="font-unbounded text-2xl text-black leading-tight">${title}</p>
                        <p class="text-sm font-semibold text-gray-600">
                            ${areaText} m²
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-black">
                            ${floorText} этаж
                        </p>
                        ${blocksHtml}
                    </div>
                </div>
                
                <a href="../lots/detail.html?category_id=${categoryId}" class="absolute inset-0 z-10" onclick="if(event.target.closest('.slider-prev, .slider-next')) event.preventDefault();"></a>
            </div>
        `;
    }

    formatTitle(text) {
        if (!text) return '';
        text = text.toLowerCase();
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
