export class Gallery {
    constructor(containerId, images) {
        this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        this.images = images || [];
        this.currentIndex = 0;
        
        if (this.container && this.images.length > 0) {
            this.init();
        } else if (this.container) {
             // Fallback if no images
             this.container.innerHTML = `
                <div class="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                    <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
             `;
        }
    }

    init() {
        this.render();
        this.updateView();
    }

    render() {
        this.container.innerHTML = `
            <div class="relative w-full h-full group">
                <!-- Main Image -->
                <div class="w-full h-full overflow-hidden relative bg-gray-900">
                    <img id="gallery-main-img" src="" alt="Gallery Image" class="w-full h-full object-contain transition-opacity duration-300 opacity-0">
                </div>

                <!-- Navigation Buttons (only if > 1 image) -->
                ${this.images.length > 1 ? `
                    <button id="gallery-prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button id="gallery-next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                    
                    <!-- Counter -->
                    <div class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <span id="gallery-current">1</span> / ${this.images.length}
                    </div>
                ` : ''}
            </div>
        `;

        // Cache elements
        this.imgElement = this.container.querySelector('#gallery-main-img');
        
        if (this.images.length > 1) {
            this.prevBtn = this.container.querySelector('#gallery-prev');
            this.nextBtn = this.container.querySelector('#gallery-next');
            this.counter = this.container.querySelector('#gallery-current');

            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prev();
            });
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.next();
            });
            
            // Touch Swipe Support
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            this.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, {passive: true});
        }
    }
    
    handleSwipe() {
        if (this.images.length <= 1) return;
        
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            this.next(); // Swipe Left -> Next
        }
        if (touchEndX > touchStartX + threshold) {
            this.prev(); // Swipe Right -> Prev
        }
    }

    updateView() {
        const imgObj = this.images[this.currentIndex];
        const src = imgObj.name === 'default_image.jpg' ? '/storage/static/default_image.jpg' : imgObj.path;
        
        // Simple fade effect
        this.imgElement.style.opacity = '0';
        
        setTimeout(() => {
            this.imgElement.src = src;
            this.imgElement.onload = () => {
                this.imgElement.style.opacity = '1';
            };
            // Fallback if cached or fast load
            if (this.imgElement.complete) {
                this.imgElement.style.opacity = '1';
            }
        }, 150);

        if (this.counter) {
            this.counter.textContent = this.currentIndex + 1;
        }
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateView();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateView();
    }
}
