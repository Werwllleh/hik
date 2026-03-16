gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
ScrollTrigger.refresh();

window.addEventListener('load', function () {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

const progressiveImages = document.querySelectorAll('[data-image="progressive"]');
if (progressiveImages.length) {
  console.log(progressiveImages)
  progressiveImages.forEach(progressiveImage => {
    const lowResImage = new Image()
    lowResImage.src = progressiveImage.src
    lowResImage.onload = function() {
      progressiveImage.src = progressiveImage.getAttribute('data-src')
      progressiveImage.style.filter = 'none'
    }
    lowResImage.onerror = function() {
      progressiveImage.style.filter = 'none'
    }
  })
}

