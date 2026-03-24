if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const cards = gsap.utils.toArray('.catalog-card');
    if (cards.length) {
      cards.forEach((card, index) => {
        if (!document.contains(card)) return;

        gsap.fromTo(card,
          {
            opacity: 0,
            y: '100px'
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'none',
            // immediateRender: false,
            // stagger: 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
              // once: true,
            },
          }
        );
      });
    }

    const titleItems = gsap.utils.toArray('.catalog-card__title');
    if (titleItems.length) {
      titleItems.forEach((title) => {
        const trigger = title.closest('.catalog-card');

        if (!trigger) return;

        gsap.fromTo(title,
          {
            opacity: 0,
            y: '50px'
          },
          {
            opacity: 1,
            y: 0,
            delay: .8,
            duration: 1,
            ease: 'power1.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: trigger,
              start: 'top 90%',
              once: true,
              // toggleActions: 'play none none none',
            },
          }
        );
      });
    }

    const spans = gsap.utils.toArray('.catalog-card__link span');
    if (spans.length) {
      spans.forEach((span) => {
        const trigger = span.closest('.catalog-card');

        if (!trigger) return;

        gsap.fromTo(span,
          {
            width: '40%',
          },
          {
            width: '100%',
            delay: 0.6,
            duration: 1.3,
            ease: 'power1.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: trigger,
              start: 'top 90%',
              once: true,
              // toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  })

} else {
  console.warn('GSAP или ScrollTrigger не подключены');
}
