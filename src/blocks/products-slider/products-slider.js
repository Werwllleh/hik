const productsSliders = document.querySelectorAll('.products-slider');
if (productsSliders.length) {
  productsSliders.forEach(productsSlider => {

    const swiper = productsSlider.querySelector('.swiper');

    if (swiper) {

      const prevNav = productsSlider.querySelector('.prev');
      const nextNav = productsSlider.querySelector('.next');

      new Swiper(swiper, {
        slidesPerView: "auto",
        speed: 800,
        spaceBetween: 8,
        noSwipingSelector: '.hover-slider__swiper',
        navigation: {
          nextEl: nextNav,
          prevEl: prevNav,
        },
      });
    }

  })
}
