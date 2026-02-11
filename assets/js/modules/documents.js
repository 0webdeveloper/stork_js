export class DocumentsModule {
    constructor(listId) {
        this.listId = listId;
        this.documents = [
            {
                name: "Проектная декларация",
                href: "./assets/image/stork_presentation.pdf"
            },
            {
                name: "Разрешение на строительство",
                href: "./assets/image/stork_presentation.pdf"
            },
            {
                name: "Шаблон договора",
                href: "./assets/image/stork_presentation.pdf"
            }
        ];
        
        this.init();
    }

    init() {
        this.renderDocuments();
        this.initAnimations();
    }

    renderDocuments() {
        const listElement = document.getElementById(this.listId);
        if (!listElement) return;

        this.documents.forEach((doc, index) => {
            const docElement = document.createElement('div');
            docElement.className = 'document-item flex justify-between gap-10 p-5 pl-0 border-b border-[#e5e7eb] items-center';
            docElement.innerHTML = `
                <h2 class="text-lg md:text-xl font-medium">${doc.name}</h2>
                <button class="cursor-pointer group" data-href="${doc.href}">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-white group-hover:stroke-red-button transition-colors">
                        <path d="M9 11V17L11 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 17L7 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `;
            
            // Add click listener to button
            const btn = docElement.querySelector('button');
            btn.addEventListener('click', () => {
                window.open(doc.href, '_blank');
            });
            
            listElement.appendChild(docElement);
        });
    }

    initAnimations() {
        const items = document.querySelectorAll('.document-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 300 + (index * 100));
        });
    }
}
