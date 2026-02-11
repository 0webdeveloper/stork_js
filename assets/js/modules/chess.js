// Chess Logic
import { state, fetchApi } from './state.js';

export class ChessModule {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentBlockId = null;
        this.blocks = [];
        this.chessData = [];
        
        if (this.container) {
            this.init();
        }
    }

    async init() {
        console.log('Initializing Chess...');
        this.renderSkeleton();
        
        try {
            await this.fetchTablets();
        } catch (e) {
            console.error('Failed to load chess data', e);
            this.container.innerHTML = '<p class="text-red-500">Ошибка загрузки данных</p>';
        }
    }

    renderSkeleton() {
        this.container.innerHTML = `
            <div class="animate-pulse">
                <div class="h-10 bg-gray-700 rounded mb-4 w-full"></div>
                <div class="space-y-3">
                    <div class="h-20 bg-gray-700 rounded w-full"></div>
                    <div class="h-20 bg-gray-700 rounded w-full"></div>
                    <div class="h-20 bg-gray-700 rounded w-full"></div>
                </div>
            </div>
        `;
    }

    async fetchTablets() {
        // Fetch blocks/categories
        const data = await fetchApi('/chess/tablet');
        if (data) {
            this.blocks = data.blocks;
            // Default to first block
            if (this.blocks.length > 0) {
                this.currentBlockId = this.blocks[0].id;
                this.renderBlockSelector();
                await this.fetchChess(this.currentBlockId);
            }
        }
    }

    async fetchChess(blockId) {
        this.container.querySelector('.chess-grid')?.remove();
        // Show loading/skeleton for grid
        
        const data = await fetchApi('/chess', { block_id: blockId });
        if (data) {
            this.chessData = data;
            this.renderGrid();
        }
    }

    renderBlockSelector() {
        // Find or create selector container
        let selector = document.getElementById('block-selector');
        if (!selector) {
            selector = document.createElement('div');
            selector.id = 'block-selector';
            selector.className = 'flex gap-4 mb-6 overflow-x-auto';
            this.container.prepend(selector);
        }

        selector.innerHTML = this.blocks.map(block => `
            <button 
                class="px-4 py-2 rounded-lg transition-colors ${block.id === this.currentBlockId ? 'bg-red-button text-white' : 'bg-back-white-sections text-black hover:bg-gray-200'}"
                data-id="${block.id}"
            >
                Блок ${block.name}
            </button>
        `).join('');

        selector.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (id !== this.currentBlockId) {
                    this.currentBlockId = id;
                    this.renderBlockSelector(); // Re-render to update active class
                    this.fetchChess(id);
                }
            });
        });
    }

    renderGrid() {
        // Remove existing grid
        const existingGrid = this.container.querySelector('.chess-grid');
        if (existingGrid) existingGrid.remove();

        const grid = document.createElement('div');
        grid.className = 'chess-grid flex flex-col gap-2.5 overflow-x-auto pb-4';

        this.chessData.forEach(floor => {
            const row = document.createElement('div');
            row.className = 'flex items-center relative min-w-max';
            
            // Floor number
            const floorNum = document.createElement('span');
            floorNum.className = `absolute text-white font-bold left-2 z-10`;
            floorNum.textContent = floor.floor;
            row.appendChild(floorNum);

            // Lots container
            const lotsContainer = document.createElement('div');
            lotsContainer.className = 'flex gap-2.5 pl-12';

            floor.lots.forEach(lot => {
                const lotEl = this.createLotElement(lot);
                lotsContainer.appendChild(lotEl);
            });

            row.appendChild(lotsContainer);
            grid.appendChild(row);
        });

        this.container.appendChild(grid);
    }

    createLotElement(lot) {
        const link = document.createElement('a');
        link.href = `/lots/detail.html?id=${lot.id}`; // Updated to standard query param
        link.className = 'block relative w-28 h-16 rounded-lg grid grid-cols-2 gap-0.5 p-2.5 transition-transform hover:scale-105';
        
        // Background color based on status/category
        let bgColor = '#DBDBDB'; // Default/Disabled
        if (lot.status.slug === 'svobodno') { // Verify slug from API response
             bgColor = lot.status.color ? lot.status.color + '80' : '#4ade80'; // Hex + alpha
        } else if (lot.status.slug === 'bron') {
             bgColor = '#fbbf24';
        } else if (lot.status.slug === 'prodan') {
             bgColor = '#f87171';
        }
        
        // Actually, logic from vue: 
        // if status == 'свободно' -> color + 50 (alpha?)
        // Let's rely on inline styles or classes.
        
        link.style.backgroundColor = lot.status.color || '#333';
        
        // Content
        link.innerHTML = `
            <div class="text-xs font-bold text-white/90" style="background-color: ${lot.category?.color}">${lot.sub_category?.abbreviation || lot.category?.abbreviation || '?'}</div>
            <div class="text-xs text-right text-white">${lot.number_object}</div>
            <div class="col-span-2 text-xs text-white truncate">${lot.category?.name}</div>
        `;

        // Tooltip logic (simple title for now, or custom)
        link.title = `Блок: ${lot.blocks?.[0]?.name}, Этаж: ${lot.floor}, Площадь: ${lot.area} м²`;

        // Add overlay if sold/reserved?
        if (lot.status.slug !== 'свободно' && lot.status.slug !== 'svobodno') { // Check both cyrillic and latin
             // Maybe disable link?
             // link.href = 'javascript:void(0)';
             // link.classList.add('cursor-not-allowed', 'opacity-70');
        }

        return link;
    }
}
