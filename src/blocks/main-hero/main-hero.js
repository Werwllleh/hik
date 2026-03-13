const mainHeroSwiper = document.querySelector('.main-hero .swiper');

if (mainHeroSwiper) {
  const swiper = new Swiper(mainHeroSwiper, {
    slidesPerView: 1,
    speed: 1500,
    /*effect: 'fade',
    fadeEffect: {
      crossFade: true
    },*/
    /*creativeEffect: {
      prev: {
        opacity: 0,
        translate: [0, 0, -400],
      },
      next: {
        opacity: 1,
        translate: ['100%', 0, 0],
      },
    },*/
  });
}
