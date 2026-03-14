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
