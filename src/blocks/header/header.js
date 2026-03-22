
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const burgerButtons = document.querySelectorAll('.burger-btn');
const headerCatalogInner = document.querySelector('.header-catalog__inner');

if (header && burgerButtons.length) {

  burgerButtons.forEach(burgerBtn => {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      header.classList.toggle('catalog-show');

      if (header.classList.contains('catalog-show')) {
        blockWrap(true)
      } else {
        blockWrap(false)
      }
    });
  })

  // Закрытие при клике вне .header-catalog__inner
  document.addEventListener('click', (e) => {
    if (header.classList.contains('catalog-show') && !e.target.closest('.header-catalog__inner')) {
      header.classList.remove('catalog-show');
      blockWrap(false)
    }
  });
}


/*overlay.addEventListener('click', () => {
  if (header) {
    header.classList.remove('catalog-show');
  }

  overlay.classList.remove('active');
  blockWrap(false)
})*/
