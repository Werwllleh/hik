const videoComponents = document.querySelectorAll('.video-component');

if (videoComponents.length) {
  videoComponents.forEach(videoComponent => {
    const video = videoComponent.querySelector('.video-component__video');
    const playButton = videoComponent.querySelector('.video-component__button');

    if (!video || !playButton) return;

    const togglePlay = () => {
      // Подставляем src только если ещё нет source
      const existingSource = video.querySelector('source');
      
      if (video.dataset.src && !existingSource) {
        const source = document.createElement('source');
        source.src = video.dataset.src;
        
        // Динамическое определение типа по расширению
        const extension = video.dataset.src.split('.').pop().toLowerCase();
        const mimeTypes = {
          webm: 'video/webm',
          mp4: 'video/mp4',
          ogg: 'video/ogg',
          mov: 'video/quicktime',
          avi: 'video/x-msvideo',
        };
        source.type = mimeTypes[extension] || 'video/mp4';
        
        video.appendChild(source);
        video.load();
      }

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
