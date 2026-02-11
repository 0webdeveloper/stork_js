export class PageTransition {
    constructor() {
        this.init();
    }

    init() {
        // Show page on load
        // Use requestAnimationFrame to ensure the initial state (opacity: 0) is rendered
        requestAnimationFrame(() => {
            document.body.classList.add('page-loaded');
        });

        // Also ensure it shows if something delays
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);

        this.attachLinkHandlers();
    }

    attachLinkHandlers() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            // Ignore external links, anchors, or new tab links
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') || 
                target === '_blank' || 
                link.hasAttribute('download') ||
                link.hasAttribute('data-no-transition')) {
                return;
            }
            
            // Check if it's a same-page anchor link that wasn't caught by startsWith('#')
            // e.g. current page is /index.html and link is /index.html#section
            const currentUrl = new URL(window.location.href);
            const linkUrl = new URL(href, window.location.href);
            
            if (currentUrl.pathname === linkUrl.pathname && linkUrl.hash) {
                return;
            }

            e.preventDefault();
            
            // Fade out
            document.body.classList.remove('page-loaded');

            setTimeout(() => {
                window.location.href = href;
            }, 500); // Match CSS transition duration
        });
        
        // Handle back/forward browser buttons
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                document.body.classList.add('page-loaded');
            }
        });
    }
}
