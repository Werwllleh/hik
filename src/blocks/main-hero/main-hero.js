const mainHeroSwiper = document.querySelector('.main-hero-swiper__element');
const mainHeroSwiperThumbs = document.querySelector('.hero-swiper-thumbs');

if (mainHeroSwiper) {
  const thumbsSwiper = new Swiper(mainHeroSwiperThumbs, {
    spaceBetween: 4,
    slidesPerView: "auto",
    watchSlidesProgress: true,
  });

  console.log(thumbsSwiper);

  const heroSwiper = new Swiper(mainHeroSwiper, {
    slidesPerView: 1,
    speed: 1500,
    navigation: {
      nextEl: '.main-hero-slide__next',
      prevEl: '.main-hero-slide__prev',
    },
    autoplay: {
      enabled: true,
      // enabled: false,
      delay: 10000,
      disableOnInteraction: false
      // disableOnInteraction: true,
      // pauseOnInteraction: true,
    },
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    thumbs: {
      swiper: thumbsSwiper,
    },
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

  console.log(heroSwiper);

  heroSwiper.on('autoplayTimeLeft', function (s, time, progress) {

    // const swiperThumbs = mainThumbsSwiperElem.el.swiper;
    const thumbsActiveSlide = thumbsSwiper.slides[heroSwiper.realIndex];

    const allProgressBars = Array.from(heroSwiper.el.querySelectorAll('.pagination__thumb span'));

    allProgressBars.forEach(bar => {

      bar.style.width = '0';

    });

    const activeBar = thumbsActiveSlide.querySelector('.pagination__thumb span');
    if (activeBar) {
      activeBar.style.width = `${(1 - progress) * 100}%`;
    }
  })
}
