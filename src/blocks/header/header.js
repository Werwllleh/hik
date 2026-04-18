
const body = document.querySelector('body');

const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const burgerButtons = document.querySelectorAll('.burger-btn');
const searchBlock = document.querySelector('.header-search');
const searchButton = document.querySelector('.search-btn');
const searchCloseButton = document.querySelector('.header-search-close');

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

      setTimeout(() => {
        searchBlock.classList.remove('show-all-products');
      }, 250)
    })
  }

  searchButton.addEventListener('click', (e) => {
    e.stopPropagation();
    body.classList.toggle('search-show');

    if (body.classList.contains('search-show')) {
      blockWrap(true)
      if (searchBlock) {
        const searchBlockInner = searchBlock.querySelector('.header-search__inner');
        const searchInput = searchBlock.querySelector('.header-search__form .form__input');

        if (searchBlockInner && searchInput) {
          searchBlockInner.addEventListener("transitionend", (event) => {
            if (event.target === searchBlockInner && event.propertyName === "transform") {
              setTimeout(() => {
                searchInput.focus()
              }, 50)
            }
          })
        }
      }
    } else {
      blockWrap(false)
    }
  })

  document.addEventListener('click', (e) => {
    if (body.classList.contains('catalog-show') && !e.target.closest('.header-catalog__inner')) {
      body.classList.remove('catalog-show');
      blockWrap(false)
    }

    /*if (body.classList.contains('search-show') && !e.target.closest('.header-search__inner')) {
      body.classList.remove('search-show');
      blockWrap(false)
    }*/
  });
}

if (searchBlock) {
  let mouseDownInside = false;

  const searchForm = searchBlock.querySelector('.form');
  const searchInput = searchBlock.querySelector('.form__input');
  const searchSubmit = searchBlock.querySelector('.form__submit');

  if (!searchForm || !searchInput || !searchSubmit) return;

  const originalTexts = new Map();
  const elementsToHighlight = [
    ...searchBlock.querySelectorAll('.header-search-hint__value'),
    ...searchBlock.querySelectorAll('.header-search-product__name')
  ];
  elementsToHighlight.forEach((el, index) => {
    originalTexts.set(el, el.textContent.trim());
  });

  function highlightMatch(text, query) {
    if (!query) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let result = '';
    let queryIndex = 0;

    for (let i = 0; i < text.length; i++) {
      if (queryIndex < lowerQuery.length && lowerText[i] === lowerQuery[queryIndex]) {
        result += `<mark>${text[i]}</mark>`;
        queryIndex++;
      } else {
        result += text[i];
      }
    }

    return result;
  }

  function updateHighlighting(query) {
    elementsToHighlight.forEach(el => {
      const originalText = originalTexts.get(el);
      el.innerHTML = highlightMatch(originalText, query);
    });
  }

  searchBlock.addEventListener('mousedown', (evt) => {
    mouseDownInside = !!evt.target.closest('.header-search__inner');
  });
  searchBlock.addEventListener('mouseup', (evt) => {
    const mouseUpInside = !!evt.target.closest('.header-search__inner');

    if (!mouseDownInside && !mouseUpInside) {
      body.classList.remove('search-show');
      blockWrap(false);

      setTimeout(() => {
        searchBlock.classList.remove('show-all-products');
      }, 250)
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = searchInput.value.trim();

    if (query.toLowerCase() === 'нет') {
      searchBlock.classList.add('not-found')
    } else {
      searchBlock.classList.remove('not-found')
    }

    updateHighlighting(query);
  })

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  const showMoreButton = searchBlock.querySelector('.header-search-products--show-more');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', (e) => {
      e.preventDefault();
      searchBlock.classList.add('show-all-products');
    })
  }

  const searchHints = searchBlock.querySelectorAll('.header-search-hint');
  searchHints.forEach(hint => {
    hint.addEventListener('click', (e) => {
      const hintValue = hint.querySelector('.header-search-hint__value');
      if (hintValue && searchInput) {
        searchInput.value = hintValue.dataset.hintValue;
        searchInput.focus();
        searchInput.dispatchEvent(new Event('input'));
      }
    })
  })

}
