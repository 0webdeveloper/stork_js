// Chess Logic
import { state, fetchApi } from './state.js';

export class ChessModule {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentBlockId = null;
        this.blocks = [];
        this.chessData = [];
        
        // Colors configuration
        this.colors = {
            status: {
                'svobodno': { bg: '#22C55E', text: '#ffffff', label: 'свободно' },
                'bron': { bg: '#78350f', text: '#ffffff', label: 'бронь' },
                'prodan': { bg: '#7f1d1d', text: '#ffffff', label: 'продан' }
            },
            type: {
                'A': { bg: '#7c3aed', label: 'Апартаменты' },
                'K': { bg: '#06b6d4', label: 'Келлер' },
                'KP': { bg: '#ea580c', label: 'Коммерческие Помещения' },
                'H': { bg: '#dc2626', label: 'Номера' },
                'P': { bg: '#2563eb', label: 'Парковка' }
            }
        };

        if (this.container) {
            this.injectStyles();
            this.createTooltip();
            this.init();
        }
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'fixed bg-white text-black text-xs p-3 rounded shadow-xl z-[9999] hidden pointer-events-none transition-opacity duration-200 opacity-0 border border-gray-100';
        document.body.appendChild(this.tooltip);
    }

    showTooltip(lot, x, y) {
        if (!this.tooltip) return;

        this.tooltip.innerHTML = `
            <div class="font-bold text-sm mb-1">Лот №${lot.number_object}</div>
            <div class="flex justify-between mb-0.5 gap-4"><span>Этаж:</span> <span class="font-medium">${lot.floor}</span></div>
            <div class="flex justify-between mb-0.5 gap-4"><span>Площадь:</span> <span class="font-medium">${lot.area} м²</span></div>
            ${lot.price ? `<div class="flex justify-between font-bold text-red-600 mt-1 gap-4"><span>Цена:</span> <span>${Number(lot.price).toLocaleString('ru-RU')} ₽</span></div>` : ''}
            <div class="text-gray-500 mt-1 italic text-[10px]">Нажмите для деталей</div>
        `;

        this.tooltip.classList.remove('hidden');
        
        // Calculate position to keep tooltip on screen
        const rect = this.tooltip.getBoundingClientRect();
        let left = x - rect.width / 2;
        let top = y - rect.height - 10;

        // Prevent overflow
        if (left < 10) left = 10;
        if (left + rect.width > window.innerWidth - 10) left = window.innerWidth - rect.width - 10;
        if (top < 10) top = y + 20; // Show below if not enough space above

        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
        
        requestAnimationFrame(() => {
            this.tooltip.classList.remove('opacity-0');
        });
    }

    hideTooltip() {
        if (!this.tooltip) return;
        this.tooltip.classList.add('opacity-0');
        setTimeout(() => {
            if (this.tooltip.classList.contains('opacity-0')) {
                this.tooltip.classList.add('hidden');
            }
        }, 200);
    }

    injectStyles() {
        if (!document.getElementById('chess-custom-styles')) {
            const style = document.createElement('style');
            style.id = 'chess-custom-styles';
            style.textContent = `
                .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #2d2d2d; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #4b5563 #2d2d2d; }
            `;
            document.head.appendChild(style);
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
            <div class="animate-pulse p-4">
                <div class="h-10 bg-gray-700 rounded mb-4 w-1/4"></div>
                <div class="space-y-3">
                    <div class="h-20 bg-gray-700 rounded w-full"></div>
                    <div class="h-20 bg-gray-700 rounded w-full"></div>
                    <div class="h-20 bg-gray-700 rounded w-full"></div>
                </div>
            </div>
        `;
    }

    async fetchTablets() {
        const data = await fetchApi('/chess/tablet');
        if (data) {
            this.blocks = data.blocks;
            if (this.blocks.length > 0) {
                this.currentBlockId = this.blocks[0].id;
                this.renderLayout();
                await this.fetchChess(this.currentBlockId);
            }
        }
    }

    async fetchChess(blockId) {
        const gridContainer = this.container.querySelector('#chess-grid-container');
        if (gridContainer) {
            gridContainer.innerHTML = `
                <div class="animate-pulse space-y-4">
                    <div class="h-16 bg-gray-700/50 rounded w-full"></div>
                    <div class="h-16 bg-gray-700/50 rounded w-full"></div>
                    <div class="h-16 bg-gray-700/50 rounded w-full"></div>
                </div>
            `;
        }
        
        const data = await fetchApi('/chess', { block_id: blockId });
        if (data) {
            this.chessData = data;
            this.renderGrid();
        }
    }

    renderLayout() {
        this.container.innerHTML = '';
        this.container.className = 'flex flex-col md:flex-row min-h-[600px] text-white';

        // Sidebar
        const sidebar = document.createElement('div');
        sidebar.className = 'w-full md:w-64 flex-shrink-0 bg-[#1D1D1D] p-4 border-r border-gray-800 flex flex-col gap-6';
        
        // 1. Block Selector
        const blockSelector = document.createElement('div');
        blockSelector.innerHTML = `
            <div class="text-sm text-gray-400 mb-2 font-medium">ВЫБОР БЛОКА</div>
            <div class="flex flex-col gap-2">
                ${this.blocks.map(block => `
                    <button 
                        class="block-btn w-full text-left px-4 py-2 rounded transition-colors ${block.id === this.currentBlockId ? 'bg-red-button text-white' : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#333]'}"
                        data-id="${block.id}"
                    >
                        Блок ${block.name}
                    </button>
                `).join('')}
            </div>
        `;
        sidebar.appendChild(blockSelector);

        // 2. Helper Text
        const helperText = document.createElement('div');
        helperText.className = 'text-sm text-gray-500 italic';
        helperText.textContent = 'Наведите курсор на ячейку для информации. Кликните для перехода к лоту.';
        sidebar.appendChild(helperText);

        // 3. Status Legend
        const statusLegend = document.createElement('div');
        statusLegend.innerHTML = `
            <div class="text-sm text-gray-400 mb-2 font-medium">СТАТУСЫ</div>
            <div class="flex flex-col gap-2">
                ${Object.entries(this.colors.status).map(([key, val]) => `
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded" style="background-color: ${val.bg}"></div>
                        <span class="text-sm text-gray-300">${val.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
        sidebar.appendChild(statusLegend);

        // 4. Type Legend
        const typeLegend = document.createElement('div');
        typeLegend.innerHTML = `
            <div class="text-sm text-gray-400 mb-2 font-medium">ТИПЫ ПОМЕЩЕНИЙ</div>
            <div class="flex flex-col gap-2">
                ${Object.entries(this.colors.type).map(([key, val]) => `
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white" style="background-color: ${val.bg}">${key}</div>
                        <span class="text-sm text-gray-300">${val.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
        sidebar.appendChild(typeLegend);

        // Main Content Area
        const mainContent = document.createElement('div');
        mainContent.className = 'flex-1 flex flex-col min-w-0 bg-[#121212]';
        
        // Header
        const header = document.createElement('div');
        header.className = 'p-4 border-b border-gray-800 flex justify-between items-center';
        header.innerHTML = `<h2 class="text-xl font-bold font-unbounded">БЛОК ${this.blocks.find(b => b.id === this.currentBlockId)?.name}</h2>`;
        mainContent.appendChild(header);

        // Grid Container
        const gridContainer = document.createElement('div');
        gridContainer.id = 'chess-grid-container';
        gridContainer.className = 'flex-1 overflow-auto custom-scrollbar p-4';
        mainContent.appendChild(gridContainer);

        this.container.appendChild(sidebar);
        this.container.appendChild(mainContent);

        // Event Listeners for Block Selector
        sidebar.querySelectorAll('.block-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                if (id !== this.currentBlockId) {
                    this.currentBlockId = id;
                    // Update buttons UI
                    sidebar.querySelectorAll('.block-btn').forEach(b => {
                        b.className = `block-btn w-full text-left px-4 py-2 rounded transition-colors ${parseInt(b.dataset.id) === id ? 'bg-red-button text-white' : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#333]'}`;
                    });
                    // Update Header
                    header.querySelector('h2').textContent = `БЛОК ${this.blocks.find(b => b.id === id)?.name}`;
                    // Fetch Data
                    this.fetchChess(id);
                }
            });
        });
    }

    renderGrid() {
        const container = this.container.querySelector('#chess-grid-container');
        if (!container) return;

        container.innerHTML = '';
        
        const grid = document.createElement('div');
        grid.className = 'flex flex-col gap-1 pb-4';

        this.chessData.forEach(floor => {
            const row = document.createElement('div');
            row.className = 'flex items-stretch gap-4 hover:bg-white/5 transition-colors p-1 rounded';
            
            // Floor Number (Sticky)
            const floorNum = document.createElement('div');
            floorNum.className = 'w-10 flex-shrink-0 flex items-center justify-center font-bold text-gray-400 text-lg border-r border-gray-700';
            floorNum.textContent = floor.floor;
            row.appendChild(floorNum);

            // Lots
            const lotsContainer = document.createElement('div');
            lotsContainer.className = 'flex flex-nowrap gap-2 flex-1 overflow-x-auto custom-scrollbar pb-2';

            floor.lots.forEach(lot => {
                const lotEl = this.createLotElement(lot);
                lotsContainer.appendChild(lotEl);
            });

            row.appendChild(lotsContainer);
            grid.appendChild(row);
        });

        container.appendChild(grid);
    }

    createLotElement(lot) {
        // Support both Latin and Cyrillic slugs for 'free' status
        const isFree = ['svobodno', 'свободно'].includes(lot.status.slug);
        const link = document.createElement(isFree ? 'a' : 'div');
        
        if (isFree) {
            link.href = `/lots/detail.html?id=${lot.id}`;
        }
        
        // Base classes
        let classes = 'relative w-28 h-14 rounded overflow-hidden flex-shrink-0 transition-transform hover:z-10 group';
        
        if (isFree) {
            classes += ' cursor-pointer hover:scale-105 hover:shadow-lg';
        } else {
            classes += ' cursor-not-allowed opacity-80';
        }
        
        link.className = classes;

        // Determine colors
        // Use color from API if available, otherwise fallback to local config or default
        let bgColor = lot.status.color;
        if (!bgColor) {
            const statusConfig = this.colors.status[lot.status.slug];
            bgColor = statusConfig ? statusConfig.bg : '#333';
        }
        // Add 50 for transparency
        if (bgColor && bgColor.startsWith('#') && bgColor.length === 7) {
            bgColor += '50';
        }
        
        // Use type based on category/subcategory if available, or fallback
        const typeKey = lot.sub_category?.abbreviation || lot.category?.abbreviation || '?';
        const typeConfig = this.colors.type[typeKey] || { bg: '#555', label: 'Другое' };

        link.style.backgroundColor = bgColor;

        link.innerHTML = `
            <div class="h-full flex flex-col justify-between p-2 relative">
                <div class="flex justify-between items-start">
                    <span class="text-[10px] font-bold px-1 rounded text-white" style="background-color: ${typeConfig.bg}">${typeKey}</span>
                    <span class="text-xs font-bold text-white/90">${lot.number_object}</span>
                </div>
                <div class="text-[10px] text-white/80 truncate">${lot.category?.name || ''}</div>
            </div>
        `;

        // Tooltip
        if (isFree) {
            link.addEventListener('mouseenter', (e) => {
                const rect = link.getBoundingClientRect();
                this.showTooltip(lot, rect.left + rect.width / 2, rect.top);
            });

            link.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        }

        return link;
    }
}
