const kitchenSliders = document.querySelectorAll('.kitchen-slider');
if (kitchenSliders.length) {
  kitchenSliders.forEach((slider) => {
    gsap.fromTo(
      slider,
      {
        y: '20%',
        opacity: 0,
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
  })
}
