const toggleServices = document.querySelector(".services");
if (toggleServices) {
  const links = toggleServices.querySelectorAll(".services__links a");
  const contentItems = toggleServices.querySelectorAll(".services__item");

  if (!links || !contentItems) return;

  links.forEach((link, index) => {
    link.addEventListener("mouseenter", (e) => {
      links.forEach(elem => {
        elem.classList.remove('active')
      })

      contentItems.forEach(elem => {
        elem.classList.remove('active')
      })

      link.classList.add('active');
      contentItems[index].classList.add('active');
    })
  })
}

const animShowSections = document.querySelectorAll(".anim-show");
if (animShowSections.length) {
  gsap.utils.toArray('.anim-show').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => gsap.to(section, { opacity: 1, duration: 0.6 }),
          onLeave: () => gsap.to(section, { opacity: 0, duration: 0.4 }),
          onEnterBack: () => gsap.to(section, { opacity: 1, duration: 0.6 }),
          onLeaveBack: () => gsap.to(section, { opacity: 0, duration: 0.4 }),
        },
      }
    )
  })
}
