
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const burgerBtn = document.querySelector('.burger-btn');

if (header && burgerBtn && overlay) {
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
}
