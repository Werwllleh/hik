const productPreviewSlider = document.querySelector('.product-preview .swiper');
const modal = document.querySelector('.product-preview-modal');

if (productPreviewSlider) {
  const slides = Array.from(productPreviewSlider.querySelectorAll('.swiper-slide img'));
  const modalWrapper = modal?.querySelector('.product-preview-modal__swiper .swiper-wrapper');

  // Генерируем слайды для модального окна
  if (modalWrapper) {
    slides.forEach((img, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${img.dataset.full}" alt="">`;
      modalWrapper.appendChild(slide);
    });
  }

  // Основной слайдер
  const mainSwiper = new Swiper(productPreviewSlider, {
    speed: 800,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.product-preview .swiper .next',
      prevEl: '.product-preview .swiper .prev',
    },
    pagination: {
      el: '.product-preview .swiper .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  // Модальное окно
  let modalSwiper = null;

  const openModal = (index) => {
    if (!modal) return;

    blockWrap(true)
    modal.classList.add('active');

    if (!modalSwiper) {
      modalSwiper = new Swiper('.product-preview-modal__swiper', {
        speed: 800,
        slidesPerView: "auto",
        centeredSlides: true,
        // loop: true,
        initialSlide: index,
        navigation: {
          nextEl: '.product-preview-modal__next',
          prevEl: '.product-preview-modal__prev',
        },
        pagination: {
          el: '.product-preview-modal__swiper .swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        keyboard: {
          enabled: true,
        },
      });
    } else {
      modalSwiper.slideToLoop(index);
    }
  };

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove('active');

    setTimeout(() => {
      blockWrap(false)
    }, 300)
  };

  // Клик по слайду открывает модальное окно
  productPreviewSlider.addEventListener('click', (e) => {
    const slide = e.target.closest('.swiper-slide');
    if (!slide) return;

    const index = Array.from(productPreviewSlider.querySelectorAll('.swiper-slide')).indexOf(slide);
    openModal(index);
  });

  // Закрытие модального окна
  modal?.querySelector('.product-preview-modal__close')?.addEventListener('click', closeModal);
  modal?.querySelector('.product-preview-modal__overlay')?.addEventListener('click', closeModal);

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });
}
