document.addEventListener('DOMContentLoaded', function () {
gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
ScrollTrigger.refresh();

window.addEventListener('load', function () {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

const progressiveImages = document.querySelectorAll('[data-image="progressive"]');
if (progressiveImages.length) {
  console.log(progressiveImages)
  progressiveImages.forEach(progressiveImage => {
    const lowResImage = new Image()
    lowResImage.src = progressiveImage.src
    lowResImage.onload = function() {
      progressiveImage.src = progressiveImage.getAttribute('data-src')
      progressiveImage.style.filter = 'none'
    }
    lowResImage.onerror = function() {
      progressiveImage.style.filter = 'none'
    }
  })
}


const forms = document.querySelectorAll('.form');

if (forms.length) {
  forms.forEach(form => {
    startValidation(form);
  });
}

initPhoneInput();

initNameInput();

initEmailInput();

function startValidation(form) {
  const formType = form.dataset.form;
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const buttonElement = form.querySelector('.form__submit');
  const formErrorElement = form.querySelector('.form__error');

  toggleButton(inputList, buttonElement, formErrorElement);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let hasErrors = false;
    inputList.forEach(inputElement => {
      checkInputValidity(inputElement);
      if (!inputElement.validity.valid) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      formError(formErrorElement);
      inputList.forEach(inputElement => {
        toggleInputError(inputElement);
      });
    } else {

      if (formType) {
        if (formType === 'order') {
          closeModalByName('order')

          setTimeout(() => {
            showModal?.('order-success');
          }, 300);
        }

      } else {
        setTimeout(() => {
          showModal?.('success');
        }, 300);
      }


      form.reset();
      // form.submit();
    }
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButton(inputList, buttonElement, formErrorElement);
      if (inputElement.validity.valid) {
        toggleErrorSpan(inputElement);
      }
    });

    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement);
    });

    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement);
    });
  });
}

function checkInputValidity(inputElement) {
  if (inputElement.dataset.name === 'phone') {
    return;
  }

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || 'Неверный формат');
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity('Обязательное поле');
  } else if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
    validateEmailValue(inputElement);
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement));
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') {
    return '';
  }
  const valueLength = inputElement.value.trim().length;
  if (valueLength > 0 && valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`;
  }
  return '';
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    if (inputElement.dataset.name === 'phone' && inputElement.value.trim() !== '') {
      const unmasked = inputElement.value.replace(/\D/g, '');
      if (unmasked.length !== 11) return true;
    }
    return !inputElement.validity.valid;
  });
}

function toggleErrorSpan(inputElement, errorMessage) {
  const form = inputElement.closest('form');
  const dataName = inputElement.dataset.name;

  // Ищем error элемент: сначала внутри parentElement, затем по data-name через перебор label
  let errorElement = inputElement.parentElement.querySelector('.form__error');

  if (!errorElement && dataName && form) {
    // Находим label, содержащий input с нужным data-name
    const allLabels = form.querySelectorAll('label.form__field');
    allLabels.forEach(label => {
      const input = label.querySelector(`input[data-name="${dataName}"]`);
      if (input) {
        errorElement = label.querySelector('.form__error');
      }
    });
  }

  if (errorMessage) {
    inputElement.classList.add('form__input--error');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add('form__error--active');
    }
  } else {
    inputElement.classList.remove('form__input--error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('form__error--active');
    }
  }
}

function toggleButton(inputList, buttonElement, formErrorElement) {
  const hasEmptyRequired = inputList.some(input =>
    input.required && input.value.trim() === ''
  );

  if (hasEmptyRequired || hasInvalidInput(inputList)) {
    buttonElement.classList.add('button-inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('button-inactive');
    buttonElement.disabled = false;
    if (formErrorElement) {
      formErrorElement.textContent = '';
    }
  }
}

function formError(formErrorElement) {
  const errorMessage = 'Заполните все поля для отправки формы.';
  if (formErrorElement) {
    formErrorElement.textContent = errorMessage;
    formErrorElement.classList.add('form__error--active');
  }
}

function toggleInputError(inputElement) {
  if (!inputElement.validity.valid && inputElement.value.trim() !== '') {
    toggleErrorSpan(inputElement, inputElement.validationMessage);
  } else {
    toggleErrorSpan(inputElement);
  }
}

initPhoneInput()
function validatePhoneValue(mask, inputPhone) {
  if (mask.unmaskedValue.length === 11) {
    inputPhone.setCustomValidity('');
  } else {
    inputPhone.setCustomValidity('Введите корректный номер телефона');
  }
}
function initPhoneInput() {
  const inputPhones = document.querySelectorAll('input[data-name="phone"]');

  if (inputPhones.length) {
    inputPhones.forEach(inputPhone => {
      if (!inputPhone) return;

      const maskOptions = {
        mask: '+{7} 000 000-00-00',
        overwrite: true,
        lazy: false
      };

      const phoneMask = IMask(inputPhone, maskOptions);

      // Функция для обновления UI после валидации телефона
      const updatePhoneValidationUI = () => {
        validatePhoneValue(phoneMask, inputPhone);

        // 🔥 Вручную обновляем состояние кнопки и ошибки
        const form = inputPhone.closest('form');
        if (form) {
          const inputList = Array.from(form.querySelectorAll('.form__input'));
          const buttonElement = form.querySelector('.form__submit');
          const formErrorElement = form.querySelector('.form__error');

          toggleButton(inputList, buttonElement, formErrorElement);
          toggleInputError(inputPhone);
        }
      };

      inputPhone.addEventListener('input', updatePhoneValidationUI);
      phoneMask.on('accept', updatePhoneValidationUI);
      phoneMask.on('complete', updatePhoneValidationUI);

      // Также на blur для надёжности
      inputPhone.addEventListener('blur', () => {
        toggleInputError(inputPhone);
      });
    });
  }
}

function initNameInput() {
  const inputNames = document.querySelectorAll('input[data-name="name"]');

  if (inputNames.length) {
    inputNames.forEach(inputName => {
      if (!inputName) return;

      inputName.addEventListener('input', () => {
        validateNameValue(inputName);
      });

      inputName.addEventListener('blur', () => {
        validateNameValue(inputName);
      });

      function validateNameValue(input) {
        const hasDigits = /\d/.test(input.value);

        if (hasDigits) {
          input.setCustomValidity('Имя не должно содержать цифры');
        } else {
          input.setCustomValidity('');
        }
      }
    });
  }
}

function initEmailInput() {
  const inputEmails = document.querySelectorAll('input[type="email"]');

  if (inputEmails.length) {
    inputEmails.forEach(inputEmail => {
      if (!inputEmail) return;

      inputEmail.addEventListener('input', () => {
        validateEmailValue(inputEmail);
      });

      inputEmail.addEventListener('blur', () => {
        validateEmailValue(inputEmail);
      });
    });
  }
}

function validateEmailValue(inputElement) {
  if (!inputElement.value) {
    inputElement.setCustomValidity('');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(inputElement.value);

  if (isValid) {
    inputElement.setCustomValidity('');
  } else {
    inputElement.setCustomValidity('Введите корректный email');
  }
}


const collapseBlocks = document.querySelectorAll('.collapse');
if (collapseBlocks.length) {
  collapseBlocks.forEach(collapseBlock => {

    let collapseBlockConfiguratorHeight = document.querySelector('.product-configurator .collapse')?.offsetHeight;

    const items = collapseBlock.querySelectorAll('.collapse-item');
    if (!items.length) return;

    const setCollapseHeight = (wrap, data) => {
      if (collapseBlock.closest('.product-configurator')) {
        if (window.innerWidth >= 1280) {
          const productConfiguratorHeight = collapseBlock.closest('.product-configurator').offsetHeight;
          wrap.style.height = `${productConfiguratorHeight - collapseBlockConfiguratorHeight}px`;
        } else {
          const innerDiv = data.querySelector('div');
          wrap.style.height = innerDiv.offsetHeight < 620
            ? getElementHeight(innerDiv)
            : `62rem`;
        }
      } else {
        wrap.style.height = getElementHeight(data);
      }
    };

    items.forEach((item, index) => {

      const collapseBlockWrap = item.querySelector('.collapse-wrap');
      const collapseBlockData = item.querySelector('.collapse-data');

      if (item.classList.contains('active')) {
        if (collapseBlockConfiguratorHeight) {
          setCollapseHeight(collapseBlockWrap, collapseBlockData);
        } else {
          collapseBlockWrap.style.height = getElementHeight(collapseBlockData);
        }
      }

      if (index === 0 && collapseBlockConfiguratorHeight && window.innerWidth > 768) {
        item.classList.add('active')
        setCollapseHeight(collapseBlockWrap, collapseBlockData);
      }

      item.addEventListener('click', (e) => {

        if (
          e.target.closest('.collapse-wrap') ||
          e.target.closest('.collapse-data')
        ) {
          return;
        }

        if (!collapseBlockWrap || !collapseBlockData) return;

        const isActive = item.classList.contains('active');

        items.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.collapse-wrap').style.height = '';
        });

        if (!isActive) {
          setCollapseHeight(collapseBlockWrap, collapseBlockData);
          item.classList.add('active');
        }
      })
    })

    window.addEventListener('resize', () => {
      const collapseBlockActiveItem = collapseBlock.querySelector('.collapse-item.active');
      if (collapseBlockActiveItem) {
        const collapseStageInfo = collapseBlockActiveItem.querySelector('.collapse-wrap');
        const collapseStageList = collapseStageInfo?.querySelector('.collapse-data');

        collapseStageInfo.style.height = getElementHeight(collapseStageList);
      }
    })

  })
}

function getElementHeight(element) {
  return `${element.offsetHeight}px`;
}

const filterBlocks = document.querySelectorAll('.filters');

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

  const activeFilters = document.querySelectorAll('.filter.active');

  if (!activeFilters.length) return;

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
  blockWrap(false)
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
  // TODO: Здесь fetch запрос
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

  setTimeout(() => {
    getLoader(false)
    overlay.classList.remove('active');
    blockWrap(false);
  }, 1500)

  // TODO: Здесь fetch запрос
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



const footerShowcase = document.querySelector('.footer-showcase');
if (footerShowcase) {


  if (window.innerWidth >= 768) {
    footerShowcaseInit()
  }

  window.addEventListener('resize', footerShowcaseInit)
}

function footerShowcaseInit() {
  const links = footerShowcase.querySelectorAll('.footer-showcase__link');
  const wrap = footerShowcase.querySelector('.footer-showcase__grid');
  const imagesElements = footerShowcase.querySelectorAll('.footer-showcase__image img');

  if (!wrap || !links.length || !imagesElements.length) return;

  let debounceTimer = null;
  let activeLink = null;

  links.forEach((link, index) => {

    const realIndex = index + 1;

    const positions = ['rtl', 'ltr', 'center'];
    let positionValue = positions[realIndex % 3];

    link.addEventListener('mouseenter', () => {
      if (link.classList.contains('active')) return;

      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const imagesArray = link.dataset.source.split(',');
        const position = positionValue || 'center';
        const name = link.querySelector('p');

        if (!imagesArray.length || !position || !name) return;

        imagesElements.forEach(image => {
          image.style.opacity = '0';
          image.style.visibility = 'hidden';
        });

        setTimeout(() => {
          wrap.classList.remove('ltr', 'center', 'rtl');

          imagesElements.forEach((image, index) => {
            image.src = imagesArray[index];
            image.alt = name.textContent;

            if (image.complete) {
              image.style.opacity = '1';
              image.style.visibility = 'visible';
            } else {
              image.onload = () => {
                image.style.opacity = '1';
                image.style.visibility = 'visible';
              };
            }

            wrap.classList.add(position);
          })
        }, 500)

        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        activeLink = link;
      }, 300);
    })
  })
}


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

const mainHeroSwiper = document.querySelector('.main-hero-swiper__element');

if (mainHeroSwiper) {
  const heroSwiper = new Swiper(mainHeroSwiper, {
    slidesPerView: 1,
    speed: 1500,
    navigation: {
      nextEl: '.main-hero-slide__next',
      prevEl: '.main-hero-slide__prev',
    },
    autoplay: {
      enabled: true,
      // enabled: false,
      delay: 10000,
      disableOnInteraction: false
      // disableOnInteraction: true,
      // pauseOnInteraction: true,
    },
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });


  heroSwiper.on('slideChangeTransitionStart', function () {
    heroSwiper.slides.forEach(slide => {
      const title = slide.querySelector('.title');
      if (title) {
        title.style.transform = '';
        title.style.opacity = '';
      }
    });
  });

  heroSwiper.on('slideChangeTransitionEnd', function () {
    const activeSlide = heroSwiper.slides[heroSwiper.activeIndex];
    const title = activeSlide.querySelector('.title');
    if (title) {
      title.style.transform = 'translateY(0)';
      title.style.opacity = 1;
    }
  });

  const initSlide = heroSwiper.slides[heroSwiper.activeIndex];
  const initTitle = initSlide.querySelector('.title');

  setTimeout(() => {
    if (initTitle) {
      initTitle.style.transform = 'translateY(0)';
      initTitle.style.opacity = 1;
    }
  }, 200)


  // Динамическая генерация thumbs для каждого слайда
  const allThumbsContainers = document.querySelectorAll('.hero-swiper-thumbs');
  const totalSlides = heroSwiper.slides.length;

  allThumbsContainers.forEach(container => {
    const wrapper = container.querySelector('.swiper-wrapper');

    // Создаем thumbs по количеству слайдов
    for (let i = 0; i < totalSlides; i++) {
      const thumb = document.createElement('div');
      thumb.className = 'swiper-slide';
      thumb.innerHTML = `
        <div class="pagination__thumb">
          <span></span>
        </div>
      `;
      wrapper.appendChild(thumb);
    }
  });

  const thumbsSwipers = [];

  allThumbsContainers.forEach((container, index) => {
    const thumbsSwiper = new Swiper(container, {
      spaceBetween: 4,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
    });
    thumbsSwipers.push(thumbsSwiper);
  });

  // Клик по thumb переключает основной слайдер
  allThumbsContainers.forEach(container => {
    container.addEventListener('click', function(e) {
      const thumb = e.target.closest('.pagination__thumb');
      if (!thumb) return;

      const thumbIndex = Array.from(container.querySelectorAll('.pagination__thumb')).indexOf(thumb);
      if (thumbIndex !== -1) {
        heroSwiper.slideTo(thumbIndex);
      }
    });
  });

  // Обновление прогрессбаров при смене слайда
  heroSwiper.on('autoplayTimeLeft', function (s, time, progress) {
    // Сбрасываем все прогрессбары
    allThumbsContainers.forEach(container => {
      const progressBars = container.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });
    });

    // Заполняем прогрессбар только у активного thumb во всех контейнерах
    const activeIndex = heroSwiper.realIndex;
    allThumbsContainers.forEach(container => {
      const activeThumb = container.querySelectorAll('.pagination__thumb span')[activeIndex];
      if (activeThumb) {
        activeThumb.style.width = `${(1 - progress) * 100}%`;
      }
    });
  });

  // Синхронизация при ручном переключении (сброс прогресса)
  heroSwiper.on('slideChange', function () {
    allThumbsContainers.forEach(container => {
      const progressBars = container.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });
    });
  });
}



const productPreviewSlider = document.querySelector('.product-preview .swiper');
const modal = document.querySelector('.product-preview-modal');

if (productPreviewSlider) {
  const slides = Array.from(productPreviewSlider.querySelectorAll('.swiper-slide img'));
  const modalWrapper = modal?.querySelector('.product-preview-modal__swiper .swiper-wrapper');

  // Генерируем слайды для модального окна
  if (modalWrapper) {
    slides.forEach((img, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${img.dataset.full}" alt="">`;
      modalWrapper.appendChild(slide);
    });
  }

  // Основной слайдер
  const mainSwiper = new Swiper(productPreviewSlider, {
    speed: 800,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.product-preview .swiper .next',
      prevEl: '.product-preview .swiper .prev',
    },
    pagination: {
      el: '.product-preview .swiper .swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  // Модальное окно
  let modalSwiper = null;

  const openModal = (index) => {
    if (!modal) return;

    blockWrap(true)
    modal.classList.add('active');

    if (!modalSwiper) {
      modalSwiper = new Swiper('.product-preview-modal__swiper', {
        speed: 800,
        slidesPerView: "auto",
        centeredSlides: true,
        // loop: true,
        initialSlide: index,
        navigation: {
          nextEl: '.product-preview-modal__next',
          prevEl: '.product-preview-modal__prev',
        },
        pagination: {
          el: '.product-preview-modal__swiper .swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        keyboard: {
          enabled: true,
        },
      });
    } else {
      modalSwiper.slideToLoop(index);
    }
  };

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove('active');

    setTimeout(() => {
      blockWrap(false)
    }, 300)
  };

  // Клик по слайду открывает модальное окно
  productPreviewSlider.addEventListener('click', (e) => {
    const slide = e.target.closest('.swiper-slide');
    if (!slide) return;

    const index = Array.from(productPreviewSlider.querySelectorAll('.swiper-slide')).indexOf(slide);
    openModal(index);
  });

  // Закрытие модального окна
  modal?.querySelector('.product-preview-modal__close')?.addEventListener('click', closeModal);
  modal?.querySelector('.product-preview-modal__overlay')?.addEventListener('click', closeModal);

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });
}

const productsSliders = document.querySelectorAll('.products-slider');
if (productsSliders.length) {
  productsSliders.forEach(productsSlider => {

    const swiper = productsSlider.querySelector('.swiper');

    if (swiper) {

      const prevNav = productsSlider.querySelector('.prev');
      const nextNav = productsSlider.querySelector('.next');

      new Swiper(swiper, {
        slidesPerView: "auto",
        speed: 800,
        spaceBetween: 8,
        noSwipingSelector: '.hover-slider__swiper',
        navigation: {
          nextEl: nextNav,
          prevEl: prevNav,
        },
      });
    }

  })
}

const breadcrumbs = document.querySelector('.breadcrumbs')
if (breadcrumbs) {
  const list = breadcrumbs.querySelector('.breadcrumbs__list');

  const checkOverflow = () => {
    // Проверяем переполнение справа
    const hasRightOverflow = list.scrollWidth > list.clientWidth && list.scrollLeft < (list.scrollWidth - list.clientWidth-1);
    breadcrumbs.classList.toggle('breadcrumbs--has-right-overflow', hasRightOverflow);

    // Проверяем скролл слева
    const hasLeftOverflow = list.scrollLeft > 0;
    breadcrumbs.classList.toggle('breadcrumbs--has-left-overflow', hasLeftOverflow);
  };

  // Прокрутка колесиком мыши
  breadcrumbs.addEventListener('wheel', (event) => {
    if (list.scrollWidth <= list.clientWidth) return;

    if (event.deltaY === 0) return;

    event.preventDefault();
    list.scrollLeft += event.deltaY;
  }, { passive: false });

  // Первоначальная проверка
  checkOverflow();

  // Проверка при скролле
  list.addEventListener('scroll', checkOverflow);

  // Проверка при изменении размера окна
  window.addEventListener('resize', checkOverflow);
}



const favoriteButtons = document.querySelectorAll('.favorite-button');
const favoriteNotifyAdded = document.querySelector('.favorite-notify.added');
const favoriteNotifyRemove = document.querySelector('.favorite-notify.remove');

if (favoriteButtons.length && favoriteNotifyAdded && favoriteNotifyRemove) {
  let activeNotify = null;

  const hideNotify = () => {
    if (activeNotify) {
      activeNotify.classList.remove('show');
      activeNotify = null;
    }
  };

  const showNotify = (notify) => {
    hideNotify();
    activeNotify = notify;
    notify.classList.add('show');
    setTimeout(hideNotify, 3000);
  };

  document.querySelectorAll('.favorite-notify__close').forEach(btn => {
    btn.addEventListener('click', hideNotify);
  });

  favoriteButtons.forEach((favoriteButton) => {
    favoriteButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      favoriteButton.classList.toggle('active');

      if (favoriteButton.classList.contains('active')) {
        showNotify(favoriteNotifyAdded);
      } else {
        showNotify(favoriteNotifyRemove);
      }
    });
  });
}

const hoverSliders = document.querySelectorAll('.hover-slider');
if (hoverSliders.length) {
  hoverSliders.forEach(hoverSlider => {


    const swiperElement = hoverSlider.querySelector('.hover-slider__swiper .swiper')

    new Swiper(swiperElement, {
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


const kitchenSliders = document.querySelectorAll('.kitchen-slider');

if (kitchenSliders.length) {
  kitchenSliders.forEach(kitchenSlider => {
    const delay = kitchenSlider.dataset.delay;
    const swiperEl = kitchenSlider.querySelector('.kitchen-slider__swiper .swiper');
    const thumbsContainer = kitchenSlider.querySelector('.kitchen-slider-thumbs');

    if (!swiperEl) return;

    // Инициализация основного слайдера
    const mainSwiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      speed: delay ? delay : 1200,
      spaceBetween: 10,
      navigation: {
        nextEl: '.kitchen-slider__next',
        prevEl: '.kitchen-slider__prev',
      },
      autoplay: {
        enabled: true,
        delay: 10000,
        disableOnInteraction: false
      },
      watchOverflow: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
    });

    if (!thumbsContainer) return;

    const wrapper = thumbsContainer.querySelector('.swiper-wrapper');

    // Генерация thumbs по количеству слайдов
    const totalSlides = mainSwiper.slides.length;
    for (let i = 0; i < totalSlides; i++) {
      const thumb = document.createElement('div');
      thumb.className = 'swiper-slide';
      thumb.innerHTML = `
        <div class="pagination__thumb">
          <span></span>
        </div>
      `;
      wrapper.appendChild(thumb);
    }

    // Инициализация thumbs слайдера
    const thumbsSwiper = new Swiper(thumbsContainer, {
      spaceBetween: 4,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
    });

    // Клик по thumb переключает основной слайдер
    thumbsContainer.addEventListener('click', function(e) {
      const thumb = e.target.closest('.pagination__thumb');
      if (!thumb) return;

      const thumbIndex = Array.from(thumbsContainer.querySelectorAll('.pagination__thumb')).indexOf(thumb);
      if (thumbIndex !== -1) {
        mainSwiper.slideTo(thumbIndex);
      }
    });

    // Обновление прогрессбаров при autoplay
    mainSwiper.on('autoplayTimeLeft', function(s, time, progress) {
      // Сбрасываем все прогрессбары
      const progressBars = thumbsContainer.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });

      // Заполняем прогрессбар у активного thumb
      const activeIndex = mainSwiper.realIndex;
      const activeThumb = thumbsContainer.querySelectorAll('.pagination__thumb span')[activeIndex];
      if (activeThumb) {
        activeThumb.style.width = `${(1 - progress) * 100}%`;
      }
    });

    // Сброс прогресса при ручном переключении
    mainSwiper.on('slideChange', function() {
      const progressBars = thumbsContainer.querySelectorAll('.pagination__thumb span');
      progressBars.forEach(bar => {
        bar.style.width = '0';
      });
    });
  });
}


const mapElements = document.querySelectorAll('.map');

if (mapElements.length) {
  mapElements.forEach((mapElement) => {
    initMap(mapElement);
  })
}

async function initMap(mapElement) {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const map = new YMap(
    mapElement,
    {
      location: {
        center: [37.678718, 55.735028],
        zoom: 11,
      },
      behaviors: [
        'drag', // разрешаем перетаскивание
        // 'scrollZoom' - убираем скролл-зум
        // 'dblClickZoom' - убираем зум по двойному клику
        // 'multiTouch' - убираем мультитач-зум (для мобильных)
      ]
    }
  );

  // Добавляем базовые слои (обязательно ДО добавления маркеров)
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Создаём HTML-элемент маркера
  const markerElement = document.createElement("a");
  markerElement.href = "https://yandex.com/maps/-/CPbrJW7K";
  markerElement.target = "_blank";
  markerElement.rel = "noopener noreferrer";
  markerElement.className = "map-marker";

  const icon = document.createElement("img");
  icon.src = "./images/map-icon.svg";
  icon.alt = "Метка карты";
  markerElement.appendChild(icon);

  const marker = new YMapMarker(
    {
      coordinates: [37.678000, 55.745000]
    },
    markerElement
  );

  map.addChild(marker);
}

const modalList = document.querySelectorAll('.modal')

if (modalList.length) {

  modalList.forEach((modal) => {
    const closeBtns = modal.querySelectorAll('.modal--close');

    let mouseDownInside = false;

    modal.addEventListener('mousedown', (evt) => {
      mouseDownInside = !!evt.target.closest('.modal__window');
    });
    modal.addEventListener('mouseup', (evt) => {
      const mouseUpInside = !!evt.target.closest('.modal__window');

      if (!mouseDownInside && !mouseUpInside) {
        closeModal(modal);
      }
    });

    if (closeBtns.length) {
      closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => closeModal(modal))
      })
    }

    /*modal.addEventListener('click', (evt) => {
      if (!evt.target.closest('.modal__window')) {
        closeModal(modal)
      }
    })*/
  })

  const triggerList = document.querySelectorAll('*[data-modal]')
  if (triggerList.length) {
    triggerList.forEach((trigger) => {

      trigger.addEventListener('click', () => {
        showModal(trigger.dataset.modal)
      })
    })
  }
}

function getScrollbarWidth() {
  const hasScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;

  if (!hasScrollbar) return 0;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.width = '100px';
  outer.style.height = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';

  document.body.appendChild(outer);

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  document.body.removeChild(outer);

  return scrollbarWidth;
}


function blockWrap(status) {
  const wrap = document.querySelector('html');
  const header = document.querySelector('.header');

  if (status) {
    // wrap.style.overflow = 'hidden';
    wrap.classList.add('block');
    // header.style.paddingRight = getScrollbarWidth() + 'px';
    wrap.style.marginRight = getScrollbarWidth() + 'px';
  } else {
    // wrap.style.overflow = '';
    wrap.classList.remove('block');
    // header.style.paddingRight = '';
    wrap.style.marginRight = '';
  }
}

function showModal(name) {
  const modal = document.querySelector(`.modal-${name}`)
  if (!modal) {
    console.error(`Модальное окно ${name} не найдено`)
    return
  }

  blockWrap(true)

  modal.style.display = 'flex';

  setTimeout(() => {
    modal.classList.add('modal--show')
  }, 50)

  const modalWindow = modal.querySelector(`.modal__window`);
  if (modalWindow) {
    const firstInput = modal.querySelectorAll('.form__input')[0];
    modalWindow.addEventListener("transitionend", (event) => {
      if (event.target === modalWindow && event.propertyName === "transform") {

        if (firstInput) {
          setTimeout(() => {
            firstInput.focus()
          }, 50)
        }
      }
    })
  }

}

function closeModal(modal) {
  if (!modal) return;

  const headerSearchActive = document.querySelector('.header-search.shown');
  const headerMultiblockActive = document.querySelector('.header-multiblock.active');

  setTimeout(() => {
    modal.classList.remove('modal--show');

    setTimeout(() => {
      if (!headerSearchActive && !headerMultiblockActive) {
        blockWrap(false)
      }
      modal.style.display = '';
    }, 300);
  });
}

function closeModalByName(name) {
  const modal = document.querySelector(`.modal-${name}`)

  if (!modal) return;

  if (modal.classList.contains('modal--show')) {
    modal.classList.remove('modal--show')

    setTimeout(() => {
      blockWrap(false)
      modal.style.display = ''
    }, 300)
  }
}


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

          const hoverSlider = popperClone.querySelector('.hover-slider');
          if (hoverSlider) initHoverSlider(hoverSlider)
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

const videoComponents = document.querySelectorAll('.video-component');

if (videoComponents.length) {
  videoComponents.forEach(videoComponent => {
    const video = videoComponent.querySelector('.video-component__video');
    const playButton = videoComponent.querySelector('.video-component__button');

    if (!video || !playButton) return;

    const togglePlay = () => {
      // Подставляем src только если ещё нет source
      const existingSource = video.querySelector('source');
      
      if (video.dataset.src && !existingSource) {
        const source = document.createElement('source');
        source.src = video.dataset.src;
        
        // Динамическое определение типа по расширению
        const extension = video.dataset.src.split('.').pop().toLowerCase();
        const mimeTypes = {
          webm: 'video/webm',
          mp4: 'video/mp4',
          ogg: 'video/ogg',
          mov: 'video/quicktime',
          avi: 'video/x-msvideo',
        };
        source.type = mimeTypes[extension] || 'video/mp4';
        
        video.appendChild(source);
        video.load();
      }

      if (video.paused) {
        video.setAttribute('controls', 'controls');
        videoComponent.classList.add('played');
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Автовоспроизведение заблокировано браузером
            videoComponent.classList.remove('played');
            video.removeAttribute('controls');
          });
        }
      } else {
        video.removeAttribute('controls');
        video.pause();
        videoComponent.classList.remove('played');
      }
    };

    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePlay();
    });

    video.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    videoComponent.addEventListener('click', togglePlay);

    video.addEventListener('ended', () => {
      video.removeAttribute('controls');
      videoComponent.classList.remove('played');
    });
  });
}

});