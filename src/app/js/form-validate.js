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
