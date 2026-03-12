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

  // Первоначальная проверка
  checkOverflow();

  // Проверка при скролле
  list.addEventListener('scroll', checkOverflow);

  // Проверка при изменении размера окна
  window.addEventListener('resize', checkOverflow);
}
