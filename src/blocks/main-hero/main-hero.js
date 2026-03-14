const mainHeroSwiper = document.querySelector('.main-hero-swiper__element');

if (mainHeroSwiper) {
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
  });

  // Динамическая генерация thumbs для каждого слайда
  const allThumbsContainers = document.querySelectorAll('.hero-swiper-thumbs');
  const totalSlides = heroSwiper.slides.length;

  allThumbsContainers.forEach(container => {
    const wrapper = container.querySelector('.swiper-wrapper');

    // Создаем thumbs по количеству слайдов
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
  });

  const thumbsSwipers = [];

  allThumbsContainers.forEach((container, index) => {
    const thumbsSwiper = new Swiper(container, {
      spaceBetween: 4,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
    });
    thumbsSwipers.push(thumbsSwiper);
  });

  // Клик по thumb переключает основной слайдер
  allThumbsContainers.forEach(container => {
    container.addEventListener('click', function(e) {
      const thumb = e.target.closest('.pagination__thumb');
      if (!thumb) return;

      const thumbIndex = Array.from(container.querySelectorAll('.pagination__thumb')).indexOf(thumb);
      if (thumbIndex !== -1) {
        heroSwiper.slideTo(thumbIndex);
      }
    });
  });

  // Обновление прогрессбаров при смене слайда
  heroSwiper.on('autoplayTimeLeft', function (s, time, progress) {
    // Сбрасываем все прогрессбары
    allThumbsContainers.forEach(container => {
      const progressBars = container.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });
    });

    // Заполняем прогрессбар только у активного thumb во всех контейнерах
    const activeIndex = heroSwiper.realIndex;
    allThumbsContainers.forEach(container => {
      const activeThumb = container.querySelectorAll('.pagination__thumb span')[activeIndex];
      if (activeThumb) {
        activeThumb.style.width = `${(1 - progress) * 100}%`;
      }
    });
  });

  // Синхронизация при ручном переключении (сброс прогресса)
  heroSwiper.on('slideChange', function () {
    allThumbsContainers.forEach(container => {
      const progressBars = container.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });
    });
  });
}
