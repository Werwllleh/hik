const kitchenSliders = document.querySelectorAll('.kitchen-slider');
if (kitchenSliders.length) {
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
}
