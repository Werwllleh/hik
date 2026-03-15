const hoverSliders = document.querySelectorAll('.hover-slider');
if (hoverSliders.length) {
  hoverSliders.forEach(hoverSlider => {

    const swiperElement = hoverSlider.querySelector('.hover-slider__swiper .swiper')

    new Swiper(swiperElement, {
      loop: true,
      speed: 800,
      slidesPerView: 1,
    });
  })
}
