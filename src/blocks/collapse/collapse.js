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

    items.forEach((item) => {

      const collapseBlockWrap = item.querySelector('.collapse-wrap');
      const collapseBlockData = item.querySelector('.collapse-data');

      if (item.classList.contains('active')) {
        if (collapseBlockConfiguratorHeight) {
          setCollapseHeight(collapseBlockWrap, collapseBlockData);
        } else {
          collapseBlockWrap.style.height = getElementHeight(collapseBlockData);
        }
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
