/*
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
  const filterForm = filter.querySelector('.filter-form');
  if (!filterForm) return;

  const filterType = filterForm.dataset.filter;
  const filterTitle = filterForm.dataset.title;

  const button = filter.querySelector('.filter-button');

  button.addEventListener('click', (e) => {
    if (!filter.classList.contains('active')) {
      closeAllFilters()
      filter.classList.add('active')
    } else {
      filter.classList.remove('active')
    }
  })

  if (filterType === 'sort') {
    const values = filterForm.querySelectorAll("button[data-sort]");
    const input = filterForm.querySelector('input[data-name="sort"]');

    if (!values.length || !input) return;

    values.forEach(value => {
      value.addEventListener('click', (e) => {
        values.forEach(v => v.classList.remove('active'));

        input.value = value.dataset.sort;
        filterForm.submit();
        value.classList.add('active');
      })
    })

  } else {
    console.log('eef')
  }

  console.log(filterType)

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(filterForm);
    console.log(Array.from(formData));

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
*/

const filterBlocks = document.querySelectorAll('.filters');
const productsListWrap = document.querySelectorAll('.products-listing__content');

if (filterBlocks.length) {
  filterBlocks.forEach((filterBlock) => {
    const filterItems = filterBlock.querySelectorAll('.filter');
    if (filterItems.length) {
      filterItems.forEach((filter) => {
        initFilter(filter);
      });
    }

    // Кнопка сброса всех фильтров
    const cleanButton = filterBlock.querySelector('.filter-clean-button');
    if (cleanButton) {
      cleanButton.addEventListener('click', () => {
        const filters = filterBlock.querySelectorAll('.filter');
        filters.forEach(f => {
          const form = f.querySelector('.filter-form');
          if (form) {
            form.reset();
            f.classList.remove('selected');
            f.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            // Сброс текста в кнопках
            const selectedValueSpan = f.querySelector('.filter-button-selected__value');
            if (selectedValueSpan) {
              selectedValueSpan.textContent = '';
              selectedValueSpan.removeAttribute('title');
            }

            const defaultTitle = f.querySelector('.filter-button-default .title');
            if (defaultTitle) {
              const originalText = defaultTitle.textContent.trim();
              if (!originalText.includes('по ') && !originalText.includes('сначала')) {
              }
            }
          }
        });
        updateCleanButtonVisibility(filterBlock);
        submitAllFiltersData(filterBlock);
      });
    }

    updateCleanButtonVisibility(filterBlock);
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.filter')) {
    closeAllFilters();
  }
});

function initFilter(filter) {
  const filterForm = filter.querySelector('.filter-form');
  const filterDropdown = filter.querySelector('.filter-data');
  if (!filterForm || !filterDropdown) return;

  const filterType = filterForm.dataset.filter;
  const button = filter.querySelector('.filter-button');
  const removeBtn = filter.querySelector('.filter-button-remove');
  const closeBtn = filter.querySelector('.filter-data-close');


  if (button) {
    button.addEventListener('click', (e) => {
      e.stopPropagation();

      if (e.target.closest('.filter-button-remove')) return;

      if (!filter.classList.contains('active')) {
        closeAllFilters();

        filterDropdown.style.display = 'flex';

        if (window.innerWidth >= 992) {
          adjustDropdownPosition(filter);
        } else {
          blockWrap(true)
          overlay.classList.add('active');
        }

        setTimeout(() => {
          filter.classList.add('active')
        }, 50);

      } else {
        filter.classList.remove('active');
        overlay.classList.remove('active');
        blockWrap(false)

        setTimeout(() => {
          filterDropdown.style.display = ''
          filterDropdown.style.transform = ''
        }, 50);
      }
    });
  }

  // Кнопка закрытия дропдауна
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      filter.classList.remove('active');
      overlay.classList.remove('active');
      blockWrap(false)

      setTimeout(() => {
        filterDropdown.style.display = ''
        filterDropdown.style.transform = ''
      }, 50);
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      resetFilter(filter, filterForm);
    });
  }

  if (filterType === 'sort') {
    initSortFilter(filter, filterForm);
  } else if (filterType === 'between') {
    initPriceFilter(filter, filterForm);
  } else {
    initStandardFilter(filter, filterForm);
  }

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitFilterData(filterForm);
    filter.classList.remove('active');
  });
}

function closeAllFilters() {
  const filters = document.querySelectorAll('.filter');
  filters.forEach(f => {
    f.classList.remove('active');


    const dropdown = f.querySelector('.filter-data');
    if (dropdown) {
      // Сбрасываем инлайновые стили после завершения анимации
      setTimeout(() => {
        if (!f.classList.contains('active')) {
          dropdown.style.transform = '';
        }
      }, 300); // Задержка равна длительности анимации
    }
  });
  overlay.classList.remove('active');
}

function adjustDropdownPosition(filter) {
  const dropdown = filter.querySelector('.filter-data');
  if (!dropdown) return;

  const dropdownRect = dropdown.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  let translateX = -50; // Исходное значение translateX(-50%)

  // Проверяем, выходит ли dropdown за правую границу
  if (dropdownRect.right > windowWidth) {
    const overflowRight = dropdownRect.right - windowWidth;
    const offsetPercent = (overflowRight / dropdownRect.width) * 100;
    translateX = -50 - offsetPercent;
  }

  // Проверяем, выходит ли dropdown за левую границу
  if (dropdownRect.left < 0) {
    const overflowLeft = Math.abs(dropdownRect.left);
    const offsetPercent = (overflowLeft / dropdownRect.width) * 100;
    translateX = -50 + offsetPercent;
  }

  dropdown.style.transform = `translateX(${translateX}%)`;
}

function updateCleanButtonVisibility(filterBlock) {
  const cleanButton = filterBlock.querySelector('.filter-clean-button');
  if (!cleanButton) return;

  const filters = filterBlock.querySelectorAll('.filter');
  let hasSelectedFilters = false;

  filters.forEach(f => {
    if (f.classList.contains('selected')) {
      hasSelectedFilters = true;
    }
  });

  if (hasSelectedFilters) {
    cleanButton.style.display = 'flex';
  } else {
    cleanButton.style.display = 'none';
  }
}

// Отправка данных всех фильтров
function submitAllFiltersData(filterBlock) {
  const filters = filterBlock.querySelectorAll('.filter');
  const allData = {};

  filters.forEach(f => {
    const form = f.querySelector('.filter-form');
    if (form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      Object.assign(allData, data);
    }
  });

  getLoader(true)

  setTimeout(() => {
    getLoader(false)
  }, 1500)

  console.log('All filters data:', allData);
  // TODO: Здесь fetch/axios запрос
}

function initSortFilter(filter, form) {
  const values = form.querySelectorAll("button[data-sort]");
  const input = form.querySelector('input[data-name="sort"]');
  const defaultTitle = form.querySelector('.filter-button-default .title');
  const originalTitle = defaultTitle ? defaultTitle.textContent.trim() : 'Сортировать';
  const selectedValueSpan = form.querySelector('.filter-button-selected__value');

  values.forEach(valueBtn => {
    valueBtn.addEventListener('click', (e) => {
      e.preventDefault();

      values.forEach(v => v.classList.remove('active'));
      valueBtn.classList.add('active');

      const newText = valueBtn.textContent.trim();
      if (defaultTitle) defaultTitle.textContent = newText;

      if (input) input.value = valueBtn.dataset.sort;

      if (selectedValueSpan) {
        selectedValueSpan.textContent = '';
        selectedValueSpan.removeAttribute('title');
      }
      // filter.classList.add('selected');

      submitFilterData(form);

      const filterBlock = filter.closest('.filters');
      if (filterBlock) {
        updateCleanButtonVisibility(filterBlock);
      }

      filter.classList.remove('active');
    });
  });
}

function initPriceFilter(filter, form) {
  const presets = form.querySelectorAll('.preset');
  const inputMin = form.querySelector('input[data-name="price-min"]');
  const inputMax = form.querySelector('input[data-name="price-max"]');

  // Разрешаем ввод только цифр
  if (inputMin) {
    inputMin.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  if (inputMax) {
    inputMax.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }

  presets.forEach(preset => {
    preset.addEventListener('click', () => {
      const range = preset.dataset.preset.split(',');
      if (inputMin) inputMin.value = range[0];
      if (inputMax) inputMax.value = range[1];
      // Не отправляем сразу, ждем кнопку "Применить"
    });
  });

  form.addEventListener('submit', (e) => {
    if (inputMin && inputMax) {
      const min = parseFloat(inputMin.value);
      const max = parseFloat(inputMax.value);
      if (!isNaN(min) && !isNaN(max) && min > max) {
        // alert('Минимальная цена не может быть больше максимальной');
        return;
      }
    }
    // Обновляем UI кнопки и отправляем данные
    updateStandardButtonUI(filter, form);
    submitFilterData(form);

    // Обновляем видимость кнопки сброса всех фильтров
    const filterBlock = filter.closest('.filters');
    if (filterBlock) {
      updateCleanButtonVisibility(filterBlock);
    }
  });

  updateStandardButtonUI(filter, form);
}

function initStandardFilter(filter, form) {
  updateStandardButtonUI(filter, form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    updateStandardButtonUI(filter, form)
    submitFilterData(form)

    const filterBlock = filter.closest('.filters');
    if (filterBlock) {
      updateCleanButtonVisibility(filterBlock);
    }
  })
}

function resetFilter(filter, form) {
  form.reset();

  getLoader(true)

  setTimeout(() => {
    getLoader(false)
  }, 1500)

  filter.classList.remove('selected');
  form.querySelectorAll('.active').forEach(el => el.classList.remove('active'));

  const selectedValueSpan = form.querySelector('.filter-button-selected__value');
  if (selectedValueSpan) {
    selectedValueSpan.textContent = '';
    selectedValueSpan.removeAttribute('title');
  }

  const filterBlock = filter.closest('.filters');
  if (filterBlock) {
    updateCleanButtonVisibility(filterBlock);
  }

  submitFilterData(form);
}

function updateStandardButtonUI(filter, form, defaultTitle) {
  const formData = new FormData(form);
  const values = [];

  const filterType = form.dataset.filter;

  if (filterType === 'between') {
    const inputMin = form.querySelector('input[data-name="price-min"]');
    const inputMax = form.querySelector('input[data-name="price-max"]');
    const minVal = inputMin?.value?.trim();
    const maxVal = inputMax?.value?.trim();

    const selectedValueSpan = form.querySelector('.filter-button-selected__value');

    if (minVal || maxVal) {
      filter.classList.add('selected');
      if (selectedValueSpan) {
        if (minVal && maxVal) {
          const text = `${minVal} – ${maxVal}`;
          selectedValueSpan.textContent = text;
          selectedValueSpan.setAttribute('title', text);
        } else if (minVal) {
          const text = `от ${minVal}`;
          selectedValueSpan.textContent = text;
          selectedValueSpan.setAttribute('title', text);
        } else {
          const text = `до ${maxVal}`;
          selectedValueSpan.textContent = text;
          selectedValueSpan.setAttribute('title', text);
        }
      }
    } else {
      filter.classList.remove('selected');
      if (selectedValueSpan) {
        selectedValueSpan.removeAttribute('title');
      }
    }
    return;
  }

  for (let [name, value] of formData.entries()) {
    if (value && value.trim() !== '') {
      const input = form.querySelector(`input[name="${name}"][value="${value}"]`);
      if (input) {
        const label = input.closest('li')?.querySelector('label');
        const labelText = label?.textContent?.trim() || value;
        values.push(labelText);
      }
    }
  }

  const selectedValueSpan = form.querySelector('.filter-button-selected__value');

  if (values.length > 0) {
    filter.classList.add('selected');

    if (selectedValueSpan) {
      if (values.length === 1) {
        selectedValueSpan.textContent = values[0];
        selectedValueSpan.setAttribute('title', values[0]);
      } else {
        const text = values.length;
        selectedValueSpan.textContent = text;
        selectedValueSpan.setAttribute('title', values.map(t => t).join(', '));
      }
    }

  } else {
    filter.classList.remove('selected');
    if (selectedValueSpan) {
      selectedValueSpan.textContent = '';
      selectedValueSpan.removeAttribute('title');
    }
  }

  // Обновляем видимость кнопки сброса всех фильтров
  const filterBlock = filter.closest('.filters');
  if (filterBlock) {
    updateCleanButtonVisibility(filterBlock);
  }
}

function submitFilterData(form) {
  const formData = new FormData(form);

  const data = Object.fromEntries(formData.entries());

  getLoader(true)

  console.log(Array.from(formData));
  console.log(data)

  setTimeout(() => {
    getLoader(false)
    overlay.classList.remove('active');
    blockWrap(false);
  }, 1500)

  // TODO: Здесь fetch/axios запрос
}

function getLoader(status) {
  const body = document.querySelector('body');
  if (!body) return;

  if (status) {
    body.classList.add('loading');
  } else {
    body.classList.remove('loading');
  }
}
