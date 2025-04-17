(function () {
  "use strict";

  // Header Toggle
  function initializeHeaderToggle() {
    const headerToggleBtn = document.querySelector(".header-toggle");
    const header = document.querySelector("#header");

    if (headerToggleBtn && header) {
      headerToggleBtn.addEventListener("click", function () {
        header.classList.toggle("header-show");
        headerToggleBtn.classList.toggle("bi-list");
        headerToggleBtn.classList.toggle("bi-x");
      });
    }
  }

  // Close Navmenu on Link Click
  function initializeNavMenu() {
    const navLinks = document.querySelectorAll("#navmenu a");
    const header = document.querySelector("#header");
    const headerToggleBtn = document.querySelector(".header-toggle");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (header.classList.contains("header-show")) {
          header.classList.remove("header-show");
          headerToggleBtn.classList.remove("bi-x");
          headerToggleBtn.classList.add("bi-list");
        }
      });
    });
  }

  // Preloader
  function initializePreloader() {
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }
  }

  // Scroll Top Button
  function initializeScrollTop() {
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      window.addEventListener("scroll", () => {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      });
    }
  }

  // Typing Effect (Without Typed.js)
  function initializeTypingEffect() {
    const typedElement = document.querySelector(".typed");
    if (typedElement) {
      const typedStrings = typedElement
        .getAttribute("data-typed-items")
        .split(",");
      let currentStringIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;

      const type = () => {
        const currentString = typedStrings[currentStringIndex];
        if (isDeleting) {
          typedElement.textContent = currentString.substring(
            0,
            currentCharIndex - 1
          );
          currentCharIndex--;
        } else {
          typedElement.textContent = currentString.substring(
            0,
            currentCharIndex + 1
          );
          currentCharIndex++;
        }

        if (!isDeleting && currentCharIndex === currentString.length) {
          isDeleting = true;
          setTimeout(type, 1000); // Pause at the end of the string
        } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false;
          currentStringIndex = (currentStringIndex + 1) % typedStrings.length;
          setTimeout(type, 500); // Pause before typing the next string
        } else {
          setTimeout(type, isDeleting ? 50 : 100); // Typing and deleting speed
        }
      };

      type();
    }
  }

  // Skills Animation (Without Waypoint.js)
  function initializeSkillsAnimation() {
    const skillsSection = document.querySelector(".skills");
    if (skillsSection) {
      const animateSkills = () => {
        const skills = skillsSection.querySelectorAll(
          ".progress .progress-bar"
        );
        skills.forEach((skill) => {
          const width = skill.getAttribute("aria-valuenow");
          skill.style.width = width + "%";
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateSkills();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(skillsSection);
    }
  }

  // Portfolio Filtering (Without Isotope)
  function initializePortfolioFilter() {
    const portfolioFilters = document.querySelectorAll(".portfolio-filters li");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
      portfolioFilters.forEach((filter) => {
        filter.addEventListener("click", function () {
          const filterValue = this.getAttribute("data-filter");

          // Remove active class from all filters
          portfolioFilters.forEach((f) => f.classList.remove("filter-active"));
          this.classList.add("filter-active");

          // Filter portfolio items
          portfolioItems.forEach((item) => {
            if (
              filterValue === "*" ||
              item.classList.contains(filterValue.slice(1))
            ) {
              // Show item
              item.style.display = "block";
            } else {
              // Hide item
              item.style.display = "none";
            }
          });
        });
      });
    }
  }

  // Testimonials Slider (Without Swiper)
  function initializeTestimonialsSlider() {
    const testimonials = document.querySelectorAll(".testimonial-item");
    let currentIndex = 0;

    if (testimonials.length > 0) {
      const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
          testimonial.style.display = i === index ? "block" : "none";
        });
      };

      const nextTestimonial = () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      };

      // Auto-rotate testimonials every 5 seconds
      setInterval(nextTestimonial, 5000);
      showTestimonial(currentIndex); // Show the first testimonial
    }
  }

  // Smooth Scroll for Anchor Links
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Navmenu Scrollspy
  function initializeNavMenuScrollspy() {
    const navLinks = document.querySelectorAll(".navmenu a");
    const sections = document.querySelectorAll("section");

    if (navLinks.length > 0 && sections.length > 0) {
      window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
          }
        });
      });
    }
  }

  // Initialize All Functions
  document.addEventListener("DOMContentLoaded", function () {
    initializeHeaderToggle();
    initializeNavMenu();
    initializePreloader();
    initializeScrollTop();
    initializeTypingEffect();
    initializeSkillsAnimation();
    initializePortfolioFilter();
    initializeTestimonialsSlider();
    initializeSmoothScroll();
    initializeNavMenuScrollspy();
  });
})();
