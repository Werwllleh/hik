
const heroSection = document.querySelector(".main-hero");
if (heroSection) {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    gsap.to(
      heroSection,
      {
        duration: 1,
        delay: .15,
        opacity: 1,
        transform: "scale(1)",
        ease: 'sine.out',
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.closest?.('.main-hero')) {
          trigger.kill();
        }
      });
    };
  })
}

const popularItems = document.querySelectorAll('.section-popular__items .hover-slider');
if (popularItems.length) {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const popularCards = gsap.utils.toArray('.section-popular__items .hover-slider');

    popularCards.forEach((card) => {
      const title = card.querySelector('.hover-slider__name');
      const price = card.querySelector('.hover-slider__price');

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      cardTl.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'sine.out'
      }, 0);


      if (title) {
        cardTl.to(title, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'sine.out'
        }, 0.15);
      }

      if (price) {
        cardTl.to(price, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'sine.out'
        }, 0.25);
      }
    });

    return () => {
      furnitureCards.forEach(card => {
        const trigger = ScrollTrigger.getTriggerById(card);
        trigger?.kill();
      });
    };
  });
}
