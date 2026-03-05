import { ChessModule } from './chess.js';
import { LotsModule } from './lots.js';
import { PurchaseTabs } from './purchase-tabs.js';

export class IncomeModule {
    constructor() {
        this.init();
    }

    init() {
        this.initLots();
        this.initTabs();
        this.initGoals();
        this.initPurchaseTabs();
    }

    initLots() {
        const lots = new LotsModule('lots-grid', 'cards-categories');
        
        const goalsDropdown = document.getElementById('goals-dropdown');
        if (goalsDropdown) {
            goalsDropdown.addEventListener('change', (e) => {
                const reasonId = e.target.value;
                const params = {};
                if (reasonId) {
                    params.reason_id = reasonId;
                }
                lots.fetchCategories(params);
            });
        }
    }

    initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        let chessInitialized = false;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Reset Tabs
                tabBtns.forEach(b => {
                    b.classList.remove('bg-white', 'text-black');
                    b.classList.add('text-white');
                });
                
                // Hide all contents
                tabContents.forEach(c => {
                    c.classList.add('hidden');
                    c.classList.remove('block');
                });

                // Activate Clicked Button
                btn.classList.remove('text-white');
                btn.classList.add('bg-white', 'text-black');
                
                // Show Target Content
                const tabId = btn.getAttribute('data-tab');
                const content = document.getElementById(`tab-${tabId}`);
                if (content) {
                    content.classList.remove('hidden');
                    content.classList.add('block');
                }
                
                // Lazy Load Chess
                if (tabId === 'chess' && !chessInitialized) {
                     new ChessModule('chess-app');
                     chessInitialized = true;
                }
            });
        });
    }

    initGoals() {
        const reasonRadios = document.querySelectorAll('input[name="reason"]');
        const modalForm = document.getElementById('modal-form');
        
        const reasonMap = {
            'invest': { id: '1', title: 'Для инвестиций' },
            'living': { id: '2', title: 'Для жизни' },
            'business': { id: '3', title: 'Ведение бизнеса' }
        };

        function updateModalHiddenFields(value) {
            if (!modalForm || !reasonMap[value]) return;
            
            const data = reasonMap[value];
            
            // Helper to set hidden field
            const setHiddenField = (name, val) => {
                let input = modalForm.querySelector(`input[name="${name}"]`);
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    input.classList.add('dynamic-hidden-input');
                    modalForm.appendChild(input);
                }
                input.value = val;
            };

            setHiddenField('id', data.id);
            setHiddenField('title', data.title);
        }

        reasonRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    updateModalHiddenFields(e.target.value);
                }
            });
            
            // Initialize if already checked
            if (radio.checked) {
                updateModalHiddenFields(radio.value);
            }
        });
    }

    initPurchaseTabs() {
        new PurchaseTabs();
    }
}
