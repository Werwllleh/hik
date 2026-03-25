
const body = document.querySelector('body');

const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const burgerButtons = document.querySelectorAll('.burger-btn');
const searchBlock = document.querySelector('.header-search');
const searchButton = document.querySelector('.search-btn');
const searchCloseButton = document.querySelector('.header-search-close');
const headerCatalogInner = document.querySelector('.header-catalog__inner');

if (header && burgerButtons.length && searchButton) {

  burgerButtons.forEach(burgerBtn => {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      body.classList.toggle('catalog-show');

      if (body.classList.contains('catalog-show')) {
        blockWrap(true)
      } else {
        blockWrap(false)
      }
    });
  });

  if (searchCloseButton) {
    searchCloseButton.addEventListener('click', (e) => {
      e.stopPropagation();
      body.classList.remove('search-show');
      blockWrap(false)
    })
  }

  searchButton.addEventListener('click', (e) => {
    e.stopPropagation();
    body.classList.toggle('search-show');

    if (body.classList.contains('search-show')) {
      blockWrap(true)
    } else {
      blockWrap(false)
    }
  })

  document.addEventListener('click', (e) => {
    if (body.classList.contains('catalog-show') && !e.target.closest('.header-catalog__inner')) {
      body.classList.remove('catalog-show');
      blockWrap(false)
    }

    if (body.classList.contains('search-show') && !e.target.closest('.header-search__inner')) {
      body.classList.remove('search-show');
      blockWrap(false)
    }
  });
}

if (searchBlock) {
  const searchForm = searchBlock.querySelector('.form');
  const searchInput = searchBlock.querySelector('.form__input');
  const searchSubmit = searchBlock.querySelector('.form__submit');

  if (!searchForm || !searchInput || !searchSubmit) return;

  searchInput.addEventListener('input', (e) => {
    if (searchInput.value.toLowerCase() === 'нет') {
      searchBlock.classList.add('not-found')
    } else {
      searchBlock.classList.remove('not-found')
    }
  })

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })
}


/*overlay.addEventListener('click', () => {
  if (header) {
    header.classList.remove('catalog-show');
  }

  overlay.classList.remove('active');
  blockWrap(false)
})*/
