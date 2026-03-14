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
