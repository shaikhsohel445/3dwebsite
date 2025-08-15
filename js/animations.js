// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.gsap.ScrollTrigger

// GSAP Animations and Scroll Triggers
gsap.registerPlugin(ScrollTrigger)

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations()
  initHeroAnimations()
  // Add hover animations for buttons
  gsap.utils.toArray(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      gsap.to(this, {
        duration: 0.3,
        scale: 1.05,
        ease: "power2.out",
      })
    })

    btn.addEventListener("mouseleave", function () {
      gsap.to(this, {
        duration: 0.3,
        scale: 1,
        ease: "power2.out",
      })
    })
  })

  // Product card hover animations
  document.addEventListener(
    "mouseenter",
    (e) => {
      if (e.target.closest(".product-card")) {
        const card = e.target.closest(".product-card")
        gsap.to(card, {
          duration: 0.3,
          y: -10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          ease: "power2.out",
        })
      }
    },
    true,
  )

  document.addEventListener(
    "mouseleave",
    (e) => {
      if (e.target.closest(".product-card")) {
        const card = e.target.closest(".product-card")
        gsap.to(card, {
          duration: 0.3,
          y: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          ease: "power2.out",
        })
      }
    },
    true,
  )
})

function initHeroAnimations() {
  // Hero text animations
  gsap.from(".hero-title", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  })

  gsap.from(".hero-description", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out",
  })

  gsap.from(".hero-buttons", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.6,
    ease: "power3.out",
  })

  gsap.from(".hero-stats", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.9,
    ease: "power3.out",
  })

  // Globe container animation
  gsap.from(".hero-globe", {
    duration: 1.2,
    x: 50,
    opacity: 0,
    delay: 0.4,
    ease: "power3.out",
  })
}

function initScrollAnimations() {
  // Section headers
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Product cards
  gsap.utils.toArray(".product-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      y: 30,
      opacity: 0,
      delay: index * 0.1,
      ease: "power3.out",
    })
  })

  // Journey steps
  gsap.utils.toArray(".journey-step").forEach((step, index) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      },
      duration: 1,
      x: index % 2 === 0 ? -50 : 50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Stats animation
  gsap.utils.toArray(".stat-number").forEach((stat) => {
    const finalValue = stat.textContent
    const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))

    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 2,
      textContent: 0,
      roundProps: "textContent",
      ease: "power3.out",
      onUpdate: function () {
        const currentValue = Math.round(this.targets()[0].textContent)
        if (finalValue.includes("+")) {
          stat.textContent = currentValue + "+"
        } else if (finalValue.includes("/")) {
          stat.textContent = currentValue + "/7"
        } else {
          stat.textContent = currentValue
        }
      },
    })
  })

  // Parallax effect for journey step images
  gsap.utils.toArray(".step-image img").forEach((img) => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -50,
      ease: "none",
    })
  })
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: element,
        offsetY: 80,
      },
      ease: "power3.inOut",
    })
  }
}
