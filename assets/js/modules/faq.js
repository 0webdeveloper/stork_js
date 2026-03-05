export function initFaq() {
    const accordions = document.querySelectorAll('.accordions');
    
    accordions.forEach(container => {
        // Find all buttons that are direct children of the accordion items
        // Structure: .accordions > div > button
        const headers = container.querySelectorAll('button[aria-expanded]');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const isExpanded = header.getAttribute('aria-expanded') === 'true';
                header.setAttribute('aria-expanded', !isExpanded);
                
                const content = header.nextElementSibling;
                if (content) {
                    if (!isExpanded) {
                        content.classList.remove('grid-rows-[0fr]');
                        content.classList.add('grid-rows-[1fr]');
                    } else {
                        content.classList.add('grid-rows-[0fr]');
                        content.classList.remove('grid-rows-[1fr]');
                    }
                }
            });
        });
    });
}
