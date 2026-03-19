const hoverSliders = document.querySelectorAll('.hover-slider');
if (hoverSliders.length) {
  hoverSliders.forEach(hoverSlider => {


    const swiperElement = hoverSlider.querySelector('.hover-slider__swiper .swiper')

    new Swiper(swiperElement, {
      loop: true,
      speed: 800,
      slidesPerView: 1,
    });

    initHoverSlider(hoverSlider)
  })
}

function initHoverSlider(hoverSlider) {
  const columns = hoverSlider.querySelectorAll('.hover-slider__column');

  if (!columns.length) return;

  hoverSlider.addEventListener('mouseleave', () => {
    columns.forEach(col => col.classList.remove('active', 'disabled'));
  });

  columns.forEach(column => {
    column.addEventListener('mouseenter', () => {
      columns.forEach(col => {
        col.classList.remove('active')
        col.classList.add('disabled')
      });
      column.classList.add('active');
      column.classList.remove('disabled');
    });
  });
}
