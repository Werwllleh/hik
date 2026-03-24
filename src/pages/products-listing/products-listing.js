const furnitureItems = document.querySelectorAll('.products-furniture__list .hover-slider');
if (furnitureItems.length) {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    furnitureItems.forEach((furnitureItem, index) => {
      gsap.to(furnitureItem,
        {
          y: '0',
          opacity: 1,
          duration: .8,
          stagger: 0.1,
          delay: 0.5,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: furnitureItem,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
        index * 0.15
      )

      const title = furnitureItem.querySelector('.hover-slider__name');
      if (title) {
        gsap.to(title,
          {
            y: '0',
            duration: 1,
            delay: 0.3,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: furnitureItem,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
          // index * 0.15
        )
      }
      const price = furnitureItem.querySelector('.hover-slider__price');
      if (price) {
        gsap.to(price,
          {
            y: '0',
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: furnitureItem,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
          // index * 0.15
        )
      }
    })
  })
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
