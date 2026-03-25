function initProductAnimations() {
  const animBlocks = document.querySelectorAll('[data-anim]');

  animBlocks.forEach((block) => {
    const children = Array.from(block.children);
    const hasLtr = block.classList.contains('ltr');
    const hasRtl = block.classList.contains('rtl');

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
initProductAnimations();

const kitchenHero = document.querySelector(".product-kitchen");
if (kitchenHero) {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    gsap.to(
      kitchenHero,
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
        if (trigger.vars.trigger && trigger.vars.trigger.closest?.('.product-kitchen')) {
          trigger.kill();
        }
      });
    };
  })
}

const productPreview = document.querySelector(".product-information__preview");
if (productPreview) {
  let mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap.to(
      productPreview,
      {
        duration: 1,
        opacity: 1,
        delay: .25,
        transform: "scale(1)",
        ease: 'sine.out',
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.closest?.('.product-information__preview')) {
          trigger.kill();
        }
      });
    };
  })

}
