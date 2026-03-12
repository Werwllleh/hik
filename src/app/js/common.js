gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
ScrollTrigger.refresh();

window.addEventListener('load', function () {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});
