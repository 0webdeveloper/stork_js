export class NearestInfrastructureModule {
    constructor() {
        this.tabsContainer = document.getElementById('nearest-tabs');
        if (!this.tabsContainer) return;

        this.img = document.getElementById('nearest-img');
        this.timeDisplay = document.getElementById('nearest-time');
        this.descDisplay = document.getElementById('nearest-desc');
        this.buttons = this.tabsContainer.querySelectorAll('button[data-img]');

        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => this.handleTabClick(btn));
        });
    }

    handleTabClick(clickedBtn) {
        // Update UI classes
        this.buttons.forEach(btn => {
            if (btn === clickedBtn) {
                btn.classList.remove('text-gray-500');
                btn.classList.add('text-white');
            } else {
                btn.classList.add('text-gray-500');
                btn.classList.remove('text-white');
            }
        });

        // Update content with fade effect
        this.img.style.opacity = '0';
        
        setTimeout(() => {
            this.img.src = clickedBtn.dataset.img;
            this.timeDisplay.textContent = clickedBtn.dataset.time;
            this.descDisplay.textContent = clickedBtn.dataset.desc;
            this.img.style.opacity = '1';
        }, 300);
    }
}
