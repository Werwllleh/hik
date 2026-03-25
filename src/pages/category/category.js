const cards = document.querySelectorAll('.category-card');
const cardsLine = document.querySelectorAll('.category-card__link span');

if (cards.length || cardsLine.length) {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {

    cards.forEach((card, index) => {
      const title = card.querySelector('.category-card__title');
      const line = card.querySelector('.category-card__link span');
      const images = card.querySelectorAll('.category-card__images img');

      if (line) gsap.set(line, {width: '40%'});

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(card, {opacity: 1, y: 0, duration: 0.3, ease: 'sine.out'}, 0);

      if (title) {
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'sine.out'
        }, 0.1);
      }

      if (line) {
        tl.to(line, {
          width: '100%',
          duration: 1.3,
          ease: 'sine.out'
        }, 0.2);
      }

      if (images.length) {
        images.forEach((img, index) => {
          tl.to(img, {
              opacity: 1,
              x: 0,
              duration: 0.2,
              delay: (index + 1) * 0.15,
              ease: 'sine.out'
            },
            (index + 1) * 0.2);
        })
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.closest?.('.category-card, .category-card__link')) {
          trigger.kill();
        }
      });
    };
  });
}

