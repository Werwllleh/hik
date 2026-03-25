const furnitureItems = document.querySelectorAll('.products-furniture__list .hover-slider');
if (furnitureItems.length) {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const furnitureCards = gsap.utils.toArray('.products-furniture__list .hover-slider');

    furnitureCards.forEach((card) => {
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

const kitchenSliders = document.querySelectorAll('.kitchen-slider');
if (kitchenSliders.length) {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    kitchenSliders.forEach((slider, index) => {
      if (index === 0) {
        gsap.fromTo(
          slider,
          {},
          {
            transform: 'scale(1)',
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slider,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      } else {
        gsap.fromTo(
          slider,
          {
            y: '20%',
          },
          {
            y: '0%',
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slider,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })
  })

}
