
const heroSection = document.querySelector(".main-hero");
if (heroSection) {
  gsap.fromTo(
    heroSection,
    {
      opacity: 0,
    },
    {
      duration: 1,
      opacity: 1,
      delay: .25,
      transform: "scale(1)",
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  )
}
