const videoComponents = document.querySelectorAll('.video-component');

if (videoComponents.length) {
  videoComponents.forEach(videoComponent => {
    const video = videoComponent.querySelector('.video-component__video');
    const playButton = videoComponent.querySelector('.video-component__button');

    if (!video || !playButton) return;

    const togglePlay = () => {
      if (video.paused) {
        video.setAttribute('controls', 'controls');
        videoComponent.classList.add('played');
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Автовоспроизведение заблокировано браузером
            videoComponent.classList.remove('played');
            video.removeAttribute('controls');
          });
        }
      } else {
        video.removeAttribute('controls');
        video.pause();
        videoComponent.classList.remove('played');
      }
    };

    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePlay();
    });

    video.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    videoComponent.addEventListener('click', togglePlay);

    video.addEventListener('ended', () => {
      video.removeAttribute('controls');
      videoComponent.classList.remove('played');
    });
  });
}
