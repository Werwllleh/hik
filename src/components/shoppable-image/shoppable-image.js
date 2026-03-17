const shoppableImages = document.querySelectorAll('.shoppable-image');

if (shoppableImages.length) {
  shoppableImages.forEach(shoppableImage => {
    const hotspots = shoppableImage.querySelectorAll('.shoppable-image__hotspot');
    const poppers = shoppableImage.querySelectorAll('.shoppable-image__poppoer');

    hotspots.forEach((hotspot, index) => {
      const popperContent = poppers[index];

      if (!popperContent) return;

      // Инициализация Tippy.js
      const tooltip = tippy(hotspot, {
        content: popperContent,
        trigger: 'mouseenter',
        placement: 'top',
        theme: 'shoppable-tippy',
        interactive: true,
        appendTo: () => shoppableImage,
        animation: 'fade',
        duration: [200, 200],
        offset: [0, 16],
        popperOptions: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                padding: 16,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom', 'left', 'right'],
                padding: 16,
              },
            },
          ],
        },
        onShow() {
          hotspot.classList.add('active');
        },
        onHide() {
          hotspot.classList.remove('active');
        },
      });

      // Инициализация Swiper внутри tooltip
      /*const swiperElement = popperContent.querySelector('.hover-slider__swiper .swiper');
      if (swiperElement) {
        const images = hotspot.dataset.images ? JSON.parse(hotspot.dataset.images) : [];
        if (images.length > 1) {
          new Swiper(swiperElement, {
            loop: true,
            speed: 800,
            slidesPerView: 1,
          });
        }
      }*/
    });
  });
}
