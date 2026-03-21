const filterBlocks = document.querySelectorAll('.filters');
if (filterBlocks.length) {
  filterBlocks.forEach((filterBlock) => {

    const filterItems = filterBlock.querySelectorAll('.filter');
    if (filterItems.length) {
      filterItems.forEach((filter) => {
        initFilters(filter)
      })
    }

  })
}

function initFilters(filter) {
  const filterType = filter.dataset.filter;
  const filterTitle = filter.dataset.title;

  const button = filter.querySelector('.filter-button');

  button.addEventListener('click', (e) => {
    if (!filter.classList.contains('active')) {
      closeAllFilters()
      filter.classList.add('active')
    } else {
      filter.classList.remove('active')
    }
  })


}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.filter')) {
    closeAllFilters()
  }
})

function closeAllFilters() {
  const filters = document.querySelectorAll('.filter');
  if (filters.length) {
    filters.forEach(filter => filter.classList.remove('active'))
  }
}
