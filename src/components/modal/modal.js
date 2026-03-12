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

  if (status) {
    // wrap.style.overflow = 'hidden';
    wrap.classList.add('block');
    wrap.style.marginRight = getScrollbarWidth() + 'px';
  } else {
    // wrap.style.overflow = '';
    wrap.classList.remove('block');
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

  modal.style.display = 'flex'

  setTimeout(() => {
    modal.classList.add('modal--show')
  }, 50)

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
