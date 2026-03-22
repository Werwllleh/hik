const kitchenSliders = document.querySelectorAll('.kitchen-slider');

if (kitchenSliders.length) {
  kitchenSliders.forEach(kitchenSlider => {
    const delay = kitchenSlider.dataset.delay;
    const swiperEl = kitchenSlider.querySelector('.kitchen-slider__swiper .swiper');
    const thumbsContainer = kitchenSlider.querySelector('.kitchen-slider-thumbs');

    if (!swiperEl) return;

    // Инициализация основного слайдера
    const mainSwiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      speed: delay ? delay : 1200,
      spaceBetween: 10,
      navigation: {
        nextEl: '.kitchen-slider__next',
        prevEl: '.kitchen-slider__prev',
      },
      autoplay: {
        enabled: true,
        delay: 10000,
        disableOnInteraction: false
      },
      watchOverflow: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
    });

    if (!thumbsContainer) return;

    const wrapper = thumbsContainer.querySelector('.swiper-wrapper');

    // Генерация thumbs по количеству слайдов
    const totalSlides = mainSwiper.slides.length;
    for (let i = 0; i < totalSlides; i++) {
      const thumb = document.createElement('div');
      thumb.className = 'swiper-slide';
      thumb.innerHTML = `
        <div class="pagination__thumb">
          <span></span>
        </div>
      `;
      wrapper.appendChild(thumb);
    }

    // Инициализация thumbs слайдера
    const thumbsSwiper = new Swiper(thumbsContainer, {
      spaceBetween: 4,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
    });

    // Клик по thumb переключает основной слайдер
    thumbsContainer.addEventListener('click', function(e) {
      const thumb = e.target.closest('.pagination__thumb');
      if (!thumb) return;

      const thumbIndex = Array.from(thumbsContainer.querySelectorAll('.pagination__thumb')).indexOf(thumb);
      if (thumbIndex !== -1) {
        mainSwiper.slideTo(thumbIndex);
      }
    });

    // Обновление прогрессбаров при autoplay
    mainSwiper.on('autoplayTimeLeft', function(s, time, progress) {
      // Сбрасываем все прогрессбары
      const progressBars = thumbsContainer.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });

      // Заполняем прогрессбар у активного thumb
      const activeIndex = mainSwiper.realIndex;
      const activeThumb = thumbsContainer.querySelectorAll('.pagination__thumb span')[activeIndex];
      if (activeThumb) {
        activeThumb.style.width = `${(1 - progress) * 100}%`;
      }
    });

    // Сброс прогресса при ручном переключении
    mainSwiper.on('slideChange', function() {
      const progressBars = thumbsContainer.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });
    });
  });
}
