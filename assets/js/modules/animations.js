import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import SplitType from 'https://cdn.skypack.dev/split-type';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
    console.log('Init Animations');
    
    // Split Text Animation
    // const splitElements = document.querySelectorAll('[data-animate="split"]');
    // splitElements.forEach(el => {
    //     const text = new SplitType(el, { types: 'lines, words' });
    //     gsap.from(text.words, {
    //         scrollTrigger: {
    //             trigger: el,
    //             start: 'top 80%',
    //         },
    //         y: 20,
    //         opacity: 0,
    //         stagger: 0.05,
    //         duration: 0.8,
    //         ease: 'power2.out'
    //     });
    // });

    // // Fade In Animation
    // const fadeElements = document.querySelectorAll('[data-animate="fade"]');
    // fadeElements.forEach(el => {
    //     gsap.from(el, {
    //         scrollTrigger: {
    //             trigger: el,
    //             start: 'top 85%',
    //         },
    //         y: 30,
    //         opacity: 0,
    //         duration: 1,
    //         ease: 'power3.out'
    //     });
    // });

    //  Окраскта текста по скролу
        const splitTypes = document.querySelectorAll('.reveal-type');

        splitTypes.forEach((char,i) => {
            const bg = char.dataset.bgColor
            const fg = char.dataset.fgColor

            const text = new SplitType(char, { types: 'chars'})

            gsap.fromTo(text.chars, 
                {
                    color: bg,
                },
                {
                    color: fg,
                    duration: 0.3,
                    stagger: 0.02,
                    scrollTrigger: {
                        trigger: char,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: true,
                        markers: false,
                        toggleActions: 'play play reverse reverse'
                    }
            });
        });

        //  Анимация скролла
  const allBoxes = document.querySelectorAll('.box');

  if (ScrollTrigger.isTouch !== 1 && allBoxes.length) {
    allBoxes.forEach(box => {
      gsap.from(box, {
        y: 200,
        scrollTrigger: {
          trigger: box,
          scrub: 3,
        },
      });
    });
  }

}
