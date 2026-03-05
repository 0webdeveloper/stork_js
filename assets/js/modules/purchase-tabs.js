export class PurchaseTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.pay-tab-btn');
        this.contents = document.querySelectorAll('.pay-tab-content');
        this.modalTrigger = document.querySelector('[data-modal="leave-request"]');
        
        if (this.tabs.length) {
            this.init();
        }
    }

    init() {
        // Set initial state for modal trigger (default to full payment as it's the first tab)
        this.updateModalTrigger('full');

        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                this.switchTab(target);
            });
        });
    }

    switchTab(targetId) {
        // Update tabs styling
        this.tabs.forEach(tab => {
            const isTarget = tab.dataset.tab === targetId;
            if (isTarget) {
                // Active state
                tab.classList.remove('bg-transparent', 'text-white', 'hover:text-black', 'hover:bg-white');
                tab.classList.add('bg-white', 'text-black', 'hover:text-black', 'hover:bg-white');
            } else {
                // Inactive state
                tab.classList.add('bg-transparent', 'text-white', 'hover:text-black', 'hover:bg-white');
                tab.classList.remove('bg-white', 'text-black');
            }
        });

        // Update content visibility
        this.contents.forEach(content => {
            if (content.id === `pay-tab-${targetId}`) {
                content.classList.remove('hidden');
                content.classList.add('block');
            } else {
                content.classList.remove('block');
                content.classList.add('hidden');
            }
        });

        // Update modal trigger data
        this.updateModalTrigger(targetId);
    }

    updateModalTrigger(type) {
        if (!this.modalTrigger) return;
        
        const label = type === 'full' ? '100% оплата' : 'Рассрочка';
        this.modalTrigger.dataset.hiddenPaymentType = label;
        this.modalTrigger.dataset.hiddenContext = 'Варианты покупки';
    }
}
