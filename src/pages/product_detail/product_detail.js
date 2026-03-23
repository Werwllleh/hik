function initProductAnimations() {
  const animBlocks = document.querySelectorAll('[data-anim]');

  animBlocks.forEach((block) => {
    const children = Array.from(block.children);
    const hasLtr = block.classList.contains('ltr');
    const hasRtl = block.classList.contains('rtl');

    // Начальное состояние для всех детей
    gsap.set(children, {
      y: '100px',
      opacity: 0,
    });

    // Создаем timeline для последовательной анимации
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    if (hasLtr) {
      // LTR: сначала первый, потом второй
      children.forEach((child, index) => {
        tl.to(
          child,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'none',
          },
          index * 0.5,
        );
      });
    } else if (hasRtl) {
      // RTL: сначала второй, потом первый
      const reversedOrder = [...children].reverse();
      reversedOrder.forEach((child, index) => {
        tl.to(
          child,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'none',
          },
          index * 0.5,
        );
      });
    } else {
      // Без класса - все одновременно
      tl.to(
        children,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'none',
        },
        0,
      );
    }
  });
}

// Инициализация после загрузки страницы
initProductAnimations();
