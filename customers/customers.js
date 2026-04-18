document.addEventListener('DOMContentLoaded', function () {
const customersNavSwiper = document.querySelector('.customers-nav.swiper')
if (customersNavSwiper) {
  const slides = customersNavSwiper.querySelectorAll('.swiper-slide'); // замените на ваш селектор слайдов
  let initialSlideIndex = 0;

  slides.forEach((slide, index) => {
    if (slide.classList.contains('swiper-slide-active')) {
      initialSlideIndex = index;
    }
  });

  new Swiper(customersNavSwiper, {
    speed: 600,
    slidesPerView: "auto",
    initialSlide: initialSlideIndex,
    navigation: {
      nextEl: '.customers-nav__next',
      prevEl: '.customers-nav__prev',
    },
  });
}

});