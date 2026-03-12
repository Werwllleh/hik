const footer = document.querySelector('.footer');
if (footer) {
  const navGroups = footer.querySelectorAll('.footer__nav--group');
  if (navGroups.length) {
    navGroups.forEach(navGroup => {
      const actionButton = navGroup.querySelector('.footer__nav--icon');
      const listWrap = navGroup.querySelector('.footer__nav--items');
      const listInner = navGroup.querySelector('.footer__nav--list');

      if (!actionButton || !listWrap || !listInner) return;

      actionButton.addEventListener('click', () => {
        const isActive = navGroup.classList.contains('active');

        // закрываем все
        navGroups.forEach(group => {
          group.classList.remove('active');

          const wrap = group.querySelector('.footer__nav--items');
          if (wrap) wrap.style.maxHeight = '';
        });

        // если кликнули по закрытому — открываем
        if (!isActive) {
          navGroup.classList.add('active');
          listWrap.style.maxHeight = `${listInner.offsetHeight}px`;
        }
      });


    })

    window.addEventListener('resize', () => {
      const activeGroup = footer.querySelector('.footer__nav--group.active');
      if (!activeGroup) return;

      if (window.innerWidth >= 992) {
        activeGroup.classList.remove('active');
        const wrap = activeGroup.querySelector('.footer__nav--items');
        const inner = activeGroup.querySelector('.footer__nav--list');

        if (wrap && inner) {
          wrap.style.maxHeight = '';
        }
      }
    });
  }
}
