/* ________________________________________________________________________________________ */
/* _________________________________________GLOBAL_________________________________________ */
/* ________________________________________________________________________________________ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

const revealRightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

document.querySelectorAll(".reveal-right").forEach((el) => {
  revealRightObserver.observe(el);
});

const revealLeftObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

document.querySelectorAll(".reveal-left").forEach((el) => {
  revealLeftObserver.observe(el);
});

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
/* ___________________________________________STATS________________________________________ */
/* ________________________________________________________________________________________ */

const statsTile = document.querySelector(".stats-tile");

function centerStats() {
  if (!statsTile) return;
  statsTile.scrollLeft = (statsTile.scrollWidth - statsTile.clientWidth) / 2;
}

window.addEventListener("load", centerStats);
window.addEventListener("resize", centerStats);

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = target / 300;

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
/* _________________________________________OFFER CARDS____________________________________ */
/* ________________________________________________________________________________________ */

class Slider {
  constructor(element) {
    this.slider = element;

    this.images = [...element.querySelectorAll(".slider-track img")];
    this.dots = [...element.querySelectorAll(".slider-dots span")];

    this.prev = element.querySelector(".prev");
    this.next = element.querySelector(".next");

    this.current = 0;

    this.touchStart = 0;
    this.touchEnd = 0;

    this.dragStart = 0;
    this.dragging = false;

    this.interval = null;

    this.init();
  }

  init() {
    this.show(0);

    this.prev.addEventListener("click", () => this.previous());

    this.next.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.show(index);
      });
    });

    this.startAutoplay();

    this.slider.addEventListener("mouseenter", () => this.stopAutoplay());

    this.slider.addEventListener("mouseleave", () => this.startAutoplay());

    this.addTouchEvents();

    this.addMouseEvents();
  }

  show(index) {
    this.images.forEach((img) => img.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.images[index].classList.add("active");
    this.dots[index].classList.add("active");

    this.current = index;
  }

  nextSlide() {
    this.show((this.current + 1) % this.images.length);
  }

  previous() {
    this.show((this.current - 1 + this.images.length) % this.images.length);
  }

  startAutoplay() {
    this.stopAutoplay();

    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay() {
    clearInterval(this.interval);
  }

  addTouchEvents() {
    this.slider.addEventListener("touchstart", (e) => {
      this.touchStart = e.changedTouches[0].clientX;
    });

    this.slider.addEventListener("touchend", (e) => {
      this.touchEnd = e.changedTouches[0].clientX;

      this.handleSwipe();
    });
  }

  handleSwipe() {
    const distance = this.touchStart - this.touchEnd;

    if (Math.abs(distance) < 40) return;

    if (distance > 0) {
      this.nextSlide();
    } else {
      this.previous();
    }
  }

  addMouseEvents() {
    this.slider.addEventListener("mousedown", (e) => {
      this.dragging = true;

      this.dragStart = e.clientX;
    });

    window.addEventListener("mouseup", (e) => {
      if (!this.dragging) return;

      this.dragging = false;

      const distance = this.dragStart - e.clientX;

      if (Math.abs(distance) < 50) return;

      if (distance > 0) {
        this.nextSlide();
      } else {
        this.previous();
      }
    });
  }
}

document.querySelectorAll(".offer-slider").forEach((slider) => {
  new Slider(slider);
});

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
