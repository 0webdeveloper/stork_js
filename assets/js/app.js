import Lenis from 'https://unpkg.com/lenis@1.3.17/dist/lenis.mjs';
import { PageTransition } from './modules/page-transition.js';
import { ExpandingButtonModule } from './modules/expanding-button.js';


document.addEventListener('DOMContentLoaded', () => {
    // Плавный скролл
    const lenis = new Lenis();
    window.lenis = lenis; // Expose for modules

    lenis.on('scroll', (e) => {});

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Page Transitions
    new PageTransition();
    
    // Expanding Buttons
    new ExpandingButtonModule();

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Logic
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
  }

  // Modal Logic
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalForm = document.getElementById('modal-form');
  let activeModalType = null;

  const closeModal = () => {
      if (modalBackdrop) {
          modalBackdrop.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
          modalBackdrop.classList.add('opacity-0', 'invisible', 'pointer-events-none');
          
          if (modalContent) {
              modalContent.classList.remove('scale-100');
              modalContent.classList.add('scale-95');
          }

          // Clean up dynamic hidden inputs
          if (modalForm) {
              const dynamicInputs = modalForm.querySelectorAll('.dynamic-hidden-input');
              dynamicInputs.forEach(input => input.remove());
          }
      }
      activeModalType = null;
  };

  // Event delegation for modal triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if (!trigger) return;
    
    e.preventDefault();
    const type = trigger.dataset.modal;
    activeModalType = type;
    
    // Update subtitle based on type
    if (modalSubtitle) {
        if (type === 'presentation') {
            modalSubtitle.textContent = 'Оставьте свои данные, чтобы получить презентацию';
        } else if (type === 'leave-request') {
            modalSubtitle.textContent = 'Оставьте свои данные, чтобы оставить заявку';
        } else {
            modalSubtitle.textContent = 'Оставьте свои данные, чтобы получить наилучшее предложение';
        }
    }

    // Add hidden fields
    if (modalForm) {
        const addHidden = (name, value) => {
            // Check if input with this name already exists (static or dynamic)
            let input = modalForm.querySelector(`input[name="${name}"]`);
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.classList.add('dynamic-hidden-input');
                modalForm.appendChild(input);
            } else if (!input.classList.contains('dynamic-hidden-input')) {
                // If static input exists, just update its value
                // But we don't mark it dynamic so it stays
            } else {
                // If dynamic input exists (shouldn't happen with cleanup, but just in case)
            }
            input.value = value;
        };

        addHidden('form_type', type);

        // Add other hidden fields from data-hidden-* attributes
        Object.keys(trigger.dataset).forEach(key => {
            if (key.startsWith('hidden')) {
                let paramName = key.replace(/^hidden/, '');
                paramName = paramName.charAt(0).toLowerCase() + paramName.slice(1);
                addHidden(paramName, trigger.dataset[key]);
            }
        });
    }
    
    if (modalBackdrop) {
        modalBackdrop.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
        modalBackdrop.classList.add('opacity-100', 'visible', 'pointer-events-auto');
        
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }
  });

  if (modalClose && modalBackdrop) {
      modalClose.addEventListener('click', closeModal);
      
      modalBackdrop.addEventListener('click', (e) => {
          if (e.target === modalBackdrop) {
              closeModal();
          }
      });
  }

  // Form Submission
  if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Simulate submission
          const btn = modalForm.querySelector('button[type="submit"]');
          const originalText = btn.textContent;
          
          btn.textContent = 'Отправка...';
          btn.disabled = true;
          
          setTimeout(() => {
              alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
              
              if (activeModalType === 'presentation') {
                  const pdfUrl = './assets/image/stork_presentation.pdf';
                  window.open(pdfUrl, '_blank');
              }

              btn.textContent = originalText;
              btn.disabled = false;
              modalForm.reset();
              closeModal();
          }, 1000);
      });
  }

  // Nearest Infrastructure Tabs Logic
  const nearestTabs = document.getElementById('nearest-tabs');
  if (nearestTabs) {
      const img = document.getElementById('nearest-img');
      const timeDisplay = document.getElementById('nearest-time');
      const descDisplay = document.getElementById('nearest-desc');
      const buttons = nearestTabs.querySelectorAll('button');

      buttons.forEach(btn => {
          btn.addEventListener('click', () => {
              // Remove active class from all
              buttons.forEach(b => {
                  b.classList.remove('text-white', 'active-tab');
                  b.classList.add('text-gray-500');
              });

              // Add active class to clicked
              btn.classList.remove('text-gray-500');
              btn.classList.add('text-white', 'active-tab');

              // Update Content
              const newImg = btn.getAttribute('data-img');
              const newTime = btn.getAttribute('data-time');
              const newDesc = btn.getAttribute('data-desc');

              if (img) img.src = newImg;
              if (timeDisplay) timeDisplay.textContent = newTime;
              if (descDisplay) descDisplay.textContent = newDesc;
          });
      });
      
      // Initialize first tab active state if not set
      if (buttons.length > 0 && !nearestTabs.querySelector('.active-tab')) {
           buttons[0].click();
      }
  }







const buttons = document.querySelectorAll('.button');
const storkOverflow = document.querySelector('.stork-overflow');
let openedBtn;

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const btn = e.target.closest('.button');
    if (!btn) return;

    openedBtn = btn;

    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    btn.style.maxWidth = Math.floor(vw * 0.9) + 'px';
    btn.style.maxHeight = Math.floor(vh * 0.9) + 'px';

    btn.classList.add('open');
    storkOverflow.classList.add('open');
    lenis.stop();

    // Ждём применения класса и перерасчёта layout
    requestAnimationFrame(() => {
      centerToButton(btn);
    });
  });
});

function centerToButton(btn) {
  const rect = btn.getBoundingClientRect();

  const btnCenterY = rect.top + rect.height / 2;
  const viewportCenterY = window.innerHeight / 2;

  const scrollOffset = btnCenterY - viewportCenterY;

  window.scrollBy({
    top: scrollOffset,
    behavior: 'smooth'
  });
}

if (storkOverflow) {
  storkOverflow.addEventListener('click', () => {
    const opened = document.querySelector('.button.open');
    if (!opened) return;

    opened.classList.remove('open');
    opened.style.maxWidth = '';
    opened.style.maxHeight = '';

    storkOverflow.classList.remove('open');
    lenis.start();
  });
}

const incomeHeroBg = document.getElementById('income-hero-bg');
const storkSlides = document.querySelectorAll('.stork-slide');
const storkCardDynamic = document.getElementById('stork-card-dynamic');

storkSlides.forEach((slide, idx) => {
    slide.addEventListener('click', (e) => {
        const overlay = slide.querySelector('[data-img]');
        if (!overlay) return;

        incomeHeroBg.style.backgroundImage = `url(${overlay.dataset.img})`;
        
        // Анимация фона
        incomeHeroBg.classList.remove('zoom-animation');
        void incomeHeroBg.offsetWidth;
        incomeHeroBg.classList.add('zoom-animation');
        
        const id = document.getElementById(idx + 1);
        if (id) {
            const clone = id.content.cloneNode(true);
            storkCardDynamic.innerHTML = '';
            storkCardDynamic.appendChild(clone);
            
            // Анимация контента
            storkCardDynamic.classList.remove('fade-in-up');
            void storkCardDynamic.offsetWidth;
            storkCardDynamic.classList.add('fade-in-up');
        }
        
        storkSlides.forEach(s => {
            s.classList.remove('active');
            const inner = s.querySelector('[data-img]');
            if (inner) {
                inner.classList.remove('bg-gradient-radial', 'sx:outline', 'sx:outline-[1px]', 'sx:outline-white');
                inner.classList.add('bg-gradient-income-intro');
            }
        });

        slide.classList.add('active');
        overlay.classList.remove('bg-gradient-income-intro');
        overlay.classList.add('bg-gradient-radial', 'sx:outline', 'sx:outline-[1px]', 'sx:outline-white');
    });
});


// Pay Tabs Logic
const payTabBtns = document.querySelectorAll('.pay-tab-btn');
const payTabContents = document.querySelectorAll('.pay-tab-content');

// Helper to update hidden fields based on tab
const updateTabHiddenFields = (tabId, btn) => {
    const section = btn.closest('section');
    if (!section) return;
    
    const modalTrigger = section.querySelector('[data-modal="leave-request"]');
    if (modalTrigger) {
        const purchaseType = tabId === 'full' ? '100% оплата' : 'Рассрочка';
        modalTrigger.dataset.hiddenPurchaseType = purchaseType;
        modalTrigger.dataset.hiddenContext = 'Варианты покупки';
    }
};

// Initialize first tab state
if (payTabBtns.length > 0) {
    const activeBtn = document.querySelector('.pay-tab-btn.bg-white') || payTabBtns[0];
    if (activeBtn) {
        const tabId = activeBtn.getAttribute('data-tab');
        updateTabHiddenFields(tabId, activeBtn);
    }
}

payTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        payTabBtns.forEach(b => {
            b.classList.remove('bg-white', 'text-black');
            b.classList.add('text-white');
        });
        payTabContents.forEach(c => {
            c.classList.add('hidden');
            c.classList.remove('block');
        });
        btn.classList.remove('text-white');
        btn.classList.add('bg-white', 'text-black');
        const tabId = btn.getAttribute('data-tab');
        const content = document.getElementById(`pay-tab-${tabId}`);
        if (content) {
            content.classList.remove('hidden');
            content.classList.add('block');
        }
        
        // Update hidden fields
        updateTabHiddenFields(tabId, btn);
    });
});


const video = document.getElementById('hero-video');
const hlsUrl = 'assets/video/intro.m3u8'; 

if (!video) return;
// Safari/iOS поддерживает HLS нативно
if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = hlsUrl;
}
// Chrome/Firefox — через hls.js
else if (Hls.isSupported()) {
    const hls = new Hls({
        lowLatencyMode: false,  // для VOD
        backBufferLength: 90    // экономим память
    });
    hls.loadSource(hlsUrl);
    hls.attachMedia(video);
    
    // Цикл для hero
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
    });
}
else {
    console.error('HLS не поддерживается');
}



});
