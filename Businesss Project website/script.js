const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
 

const sections = document.querySelectorAll('section');
const navLinksArr = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 60) { // adjust offset if needed
      current = section.getAttribute('id');
    }
  });

  navLinksArr.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// Select all counters
const counters = document.querySelectorAll('.counter');

// Function to animate numbers
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 2000; // animation duration in ms
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / target));

  const updateCounter = () => {
    start++;
    counter.textContent = start;
    if (start < target) {
      setTimeout(updateCounter, stepTime);
    } else {
      counter.textContent = target; // make sure it ends exactly
    }
  };

  updateCounter();
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Trigger animation when scrolling
let hasAnimated = false; // to animate only once
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.about-stats');
  if (isInViewport(statsSection) && !hasAnimated) {
    counters.forEach(counter => animateCounter(counter));
    hasAnimated = true;
  }
});



const testimonials = document.querySelectorAll(".testimonial-card");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

/* Auto-slide (optional but professional) */
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 6000);


const toggle = document.getElementById("priceToggle");
const prices = document.querySelectorAll(".amount");
const durations = document.querySelectorAll(".duration");

toggle.addEventListener("change", () => {
  prices.forEach((price) => {
    price.textContent = toggle.checked
      ? price.dataset.year
      : price.dataset.month;
  });

  durations.forEach((d) => {
    d.textContent = toggle.checked ? "/yr" : "/mo";
  });
});


const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop real submission

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let isValid = true;

  clearErrors();

  if (name.value.trim() === "") {
    showError(name, "Name is required");
    isValid = false;
  }

  if (!isValidEmail(email.value)) {
    showError(email, "Please enter a valid email");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, "Message must be at least 10 characters");
    isValid = false;
  }

  if (isValid) {
    successMessage.style.display = "block";
    contactForm.reset();

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 4000);
  }
});

function showError(input, message) {
  input.nextElementSibling.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
