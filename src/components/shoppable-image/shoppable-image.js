const shoppableImages = document.querySelectorAll('.shoppable-image');
const shoppableImagePopper = document.querySelector('.shoppable-image__poppoer');

if (shoppableImages.length && shoppableImagePopper) {
  shoppableImagePopper.setAttribute('id', '');

  const renderImages = (popperInner, images = []) => {
    if (!popperInner) return;
    popperInner.innerHTML = '';

    images.forEach((image) => {
      const column = document.createElement('div');
      column.className = 'hover-slider__column';
      column.innerHTML = `
        <div class="hover-slider__image">
          <img src="${image}" alt="image">
        </div>
        <div class="hover-slider__line"></div>
      `;
      popperInner.appendChild(column);
    });
  };

  const updatePopperContent = (popper, hotspot) => {
    const popperLink = popper.querySelector('[data-link]');
    const popperName = popper.querySelector('[data-name] p');
    const popperPrice = popper.querySelector('[data-price] span');
    const popperInner = popper.querySelector('.hover-slider__inner');

    const images = hotspot.dataset.images
      ? hotspot.dataset.images.split(',').map((img) => img.trim()).filter(Boolean)
      : [];

    const name = hotspot.dataset.name || '';
    const price = hotspot.dataset.price || '';
    const link = hotspot.dataset.link || '#';

    if (popperName) popperName.textContent = name;
    if (popperPrice) popperPrice.textContent = price;
    if (popperLink) popperLink.setAttribute('href', link);

    renderImages(popperInner, images);
  };

  shoppableImages.forEach((shoppableImage) => {
    const hotspots = shoppableImage.querySelectorAll('.shoppable-image__hotspot');

    hotspots.forEach((hotspot) => {
      const popperClone = shoppableImagePopper.cloneNode(true);
      popperClone.style.display = '';
      popperClone.removeAttribute('id');

      tippy(hotspot, {
        content: popperClone,
        trigger: 'mouseenter',
        placement: 'top-end',
        theme: 'shoppable-tippy',
        interactive: true,
        interactiveDebounce: 30,
        appendTo: () => shoppableImage,
        animation: 'scale-subtle',
        duration: [200, 300],
        offset: [0, 20],

        onShow(instance) {
          updatePopperContent(popperClone, hotspot);
          hotspot.classList.add('active');
        },

        onHide() {
          hotspot.classList.remove('active');
        },

        onDestroy() {
          popperClone.remove();
        },
      });
    });
  });
}
