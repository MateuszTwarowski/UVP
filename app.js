/* ________________________________________________________________________________________ */
/* _________________________________________NAVBAR_________________________________________ */
/* ________________________________________________________________________________________ */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ________________________________________________________________________________________ */
/* _________________________________________COUNTERS_______________________________________ */
/* ________________________________________________________________________________________ */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = target / 250;

      function update() {
        current += increment;

        if (current < target) {
          counter.textContent = Math.floor(current);

          requestAnimationFrame(update);
        } else {
          counter.textContent = target + "+";
        }
      }

      update();

      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => observer.observe(counter));

/* ________________________________________________________________________________________ */
/* _________________________________________BACK TO TOP____________________________________ */
/* ________________________________________________________________________________________ */

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
