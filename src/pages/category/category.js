if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const cards = gsap.utils.toArray('.category-card');
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
            stagger: 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          },
          index * 0.15
        );
      });
    }

    const spans = gsap.utils.toArray('.category-card__link span');
    if (spans.length) {
      spans.forEach((span) => {
        const trigger = span.closest('.category-card');

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
            },
          }
        );
      });
    }
  })

} else {
  console.warn('GSAP или ScrollTrigger не подключены');
}

