if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  const cards = gsap.utils.toArray('.category-card');
  if (cards.length) {
    cards.forEach((card, index) => {
      if (!document.contains(card)) return;

      if (index === 0 || index === 1) return;

      gsap.fromTo(card,
        {
          opacity: 0,
          y: '20%'
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
            disabled: window.innerWidth < 768
          },
        }
      );
    });
  }

  const spans = gsap.utils.toArray('.category-card__link span');
  if (spans.length) {
    spans.forEach((span) => {
      const trigger = span.closest('.category-card');

      if (!trigger) return;

      gsap.fromTo(span,
        { width: 0 },
        {
          width: '100%',
          delay: 0.2,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger, // Используем проверенный trigger
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }
} else {
  console.warn('GSAP или ScrollTrigger не подключены');
}

