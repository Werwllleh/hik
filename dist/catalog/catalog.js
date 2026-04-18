document.addEventListener('DOMContentLoaded', function () {

const cards = document.querySelectorAll('.catalog-card');
if (cards.length) {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {

    cards.forEach((card, index) => {
      const title = card.querySelector('.catalog-card__title');
      const line = card.querySelector('.catalog-card__link span');

      if (line) gsap.set(line, { width: '40%' });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'sine.out'
      }, 0);

      if (title) {
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'sine.out'
        }, 0.2);
      }

      if (line) {
        tl.to(line, {
          width: '100%',
          duration: 1.3,
          ease: 'sine.out'
        }, 0.2);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.closest?.('.catalog-card, .catalog-card__link')) {
          trigger.kill();
        }
      });
    };
  });
}

});