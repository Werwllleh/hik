
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const burgerButtons = document.querySelectorAll('.burger-btn');

if (header && burgerButtons.length && overlay) {

  burgerButtons.forEach(burgerBtn => {
    burgerBtn.addEventListener('click', () => {
      header.classList.toggle('catalog-show');

      if (header.classList.contains('catalog-show')) {
        blockWrap(true)
        overlay.classList.add('active');
      } else {
        overlay.classList.remove('active');
        blockWrap(false)
      }
    });
  })

  overlay.addEventListener('click', () => {
    header.classList.remove('catalog-show');
    overlay.classList.remove('active');
    blockWrap(false)
  })
}
