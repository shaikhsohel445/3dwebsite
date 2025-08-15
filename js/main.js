// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initScrollToTop()
  initContactForm()
  initNewsletterForm()
  initIntersectionObserver()
})

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("navToggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      window.scrollToSection(targetId)

      // Close mobile menu
      mobileMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("active")
      navToggle.classList.remove("active")
    }
  })

  // Navigation background on scroll
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navigation")
    if (window.scrollY > 50) {
      nav.style.background = "rgba(255, 255, 255, 0.98)"
      nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      nav.style.background = "rgba(255, 255, 255, 0.95)"
      nav.style.boxShadow = "none"
    }
  })
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    const gsap = window.gsap // Declare gsap variable
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: "power3.inOut",
    })
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const company = formData.get("company")
    const message = formData.get("message")

    // Create email content
    const subject = `Contact Form Submission from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\n\nMessage:\n${message}`

    // Open email client
    window.location.href = `mailto:info@freshglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Show success message
    showNotification("Email client opened! Please send the email to complete your inquiry.", "success")

    // Reset form
    contactForm.reset()
  })
}

// WhatsApp functionality
function sendWhatsApp() {
  const formData = new FormData(document.getElementById("contactForm"))
  const name = formData.get("name") || "Potential Customer"
  const company = formData.get("company") || ""
  const message = formData.get("message") || "I am interested in your fruit export services."

  const whatsappMessage = `Hello! I'm ${name}${company ? ` from ${company}` : ""}. ${message}`
  const phoneNumber = "15559876543" // Replace with actual WhatsApp number

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
  window.open(whatsappUrl, "_blank")
}

// Newsletter form functionality
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll(".newsletter-form")

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = form.querySelector(".newsletter-input").value

      if (email) {
        // Simulate newsletter signup (in real app, this would be an API call)
        showNotification("Thank you for subscribing to our newsletter!", "success")
        form.reset()
      }
    })
  })
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `
  document.head.appendChild(style)

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Utility function for smooth scrolling (used by animations.js)
window.scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for fixed nav
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Initialize intersection observer for animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe journey steps
  document.querySelectorAll(".journey-step").forEach((step) => {
    observer.observe(step)
  })
}

// Handle window resize for responsive behavior
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  const mobileMenu = document.getElementById("mobileMenu")
  const navToggle = document.getElementById("navToggle")

  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Preloader (optional)
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Hide any loading indicators
  const loaders = document.querySelectorAll(".loader, .preloader")
  loaders.forEach((loader) => {
    loader.style.display = "none"
  })
})
