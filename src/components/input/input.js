const inputsPhones = document.querySelectorAll('.input--phone');
if (inputsPhones.length) {
  inputsPhones.forEach(inputPhone => {
    if (inputPhone) {
      inputPhone.setAttribute('maxlength', '16');
      inputPhone.setAttribute('minlength', '16');

      const maskOptions = {
        mask: '+{7} 000 000-00-00',
        overwrite: true
      };

      const maskLength = maskOptions.mask.length - 2;
      inputPhone.setAttribute('maxlength', `${maskLength}`);
      inputPhone.setAttribute('minlength', `${maskLength}`);

      IMask(inputPhone, maskOptions);
    }
  })
}
