const forms = document.querySelectorAll('.form');

if (forms.length) {
  forms.forEach(form => {
    startValidation(form);
  });
}

function startValidation(form) {
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
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || 'Неверный формат');
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity('Обязательное поле');
  } else if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
    inputElement.setCustomValidity('Введите корректный email');
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
  return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleErrorSpan(inputElement, errorMessage) {
  const form = inputElement.closest('form');
  const errorElement = form?.querySelector(`#${inputElement.id}-error`) ||
                       inputElement.parentElement.querySelector('.form__error');

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
