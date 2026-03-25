
const heroSection = document.querySelector(".main-hero");
if (heroSection) {

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    gsap.to(
      heroSection,
      {
        duration: 1,
        delay: .15,
        opacity: 1,
        transform: "scale(1)",
        ease: 'sine.out',
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && trigger.vars.trigger.closest?.('.main-hero')) {
          trigger.kill();
        }
      });
    };
  })
}
