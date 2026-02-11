export class PaymentModule {
    constructor() {
        this.initTabs();
    }

    initTabs() {
        const btnFull = document.getElementById('tab-btn-full');
        const btnInstallment = document.getElementById('tab-btn-installment');
        const contentFull = document.getElementById('tab-content-full');
        const contentInstallment = document.getElementById('tab-content-installment');

        if (!btnFull || !btnInstallment) return;

        const switchTab = (tab) => {
            if (tab === 'full') {
                btnFull.classList.replace('custom-tab-inactive', 'custom-tab-active');
                btnInstallment.classList.replace('custom-tab-active', 'custom-tab-inactive');
                
                btnFull.classList.remove('hover:text-white');
                btnInstallment.classList.add('hover:text-white');

                contentFull.classList.remove('hidden');
                contentInstallment.classList.add('hidden');
            } else {
                btnInstallment.classList.replace('custom-tab-inactive', 'custom-tab-active');
                btnFull.classList.replace('custom-tab-active', 'custom-tab-inactive');

                btnInstallment.classList.remove('hover:text-white');
                btnFull.classList.add('hover:text-white');

                contentInstallment.classList.remove('hidden');
                contentFull.classList.add('hidden');
            }
        };

        btnFull.addEventListener('click', () => switchTab('full'));
        btnInstallment.addEventListener('click', () => switchTab('installment'));
    }
}
