const collapseBlocks = document.querySelectorAll('.collapse');
if (collapseBlocks.length) {
  collapseBlocks.forEach(collapseBlock => {

    const items = collapseBlock.querySelectorAll('.collapse-item');
    if (!items.length) return;

    items.forEach((item) => {

      const collapseBlockWrap = item.querySelector('.collapse-wrap');
      const collapseBlockData = item.querySelector('.collapse-data');

      if (item.classList.contains('active')) {
        collapseBlockWrap.style.maxHeight = getElementHeight(collapseBlockData);
        item.classList.add('active');
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
          i.querySelector('.collapse-wrap').style.maxHeight = '';
        });

        if (!isActive) {
          collapseBlockWrap.style.maxHeight = getElementHeight(collapseBlockData);
          item.classList.add('active');
        }
      })
    })

    window.addEventListener('resize', () => {
      const collapseBlockActiveItem = collapseBlock.querySelector('.collapse-item.active');
      if (collapseBlockActiveItem) {
        const collapseStageInfo = collapseBlockActiveItem.querySelector('.collapse-wrap');
        const collapseStageList = collapseStageInfo?.querySelector('.collapse-data');

        collapseStageInfo.style.maxHeight = getElementHeight(collapseStageList);
      }
    })

  })
}

function getElementHeight(element) {
  return `${element.offsetHeight}px`;
}
