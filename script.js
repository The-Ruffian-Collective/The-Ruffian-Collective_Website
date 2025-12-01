// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBSW_bD98jAUXMEEsV5f0VFipJhUn8wVUo",
    authDomain: "ruffian-collective.firebaseapp.com",
    projectId: "ruffian-collective",
    storageBucket: "ruffian-collective.firebasestorage.app",
    messagingSenderId: "812554351915",
    appId: "1:812554351915:web:2992367487887f53e3c16e",
    measurementId: "G-1R6N8Z3Q86"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Contact form submission handler
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        await db.collection('contacts').add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Clear form
        this.reset();

        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    } catch (error) {
        console.error("Error submitting form:", error.code, error.message);
        formStatus.textContent = `Error: ${error.message || "There was an error submitting your message. Please try again."}`;
        formStatus.style.color = "#ff4444";

        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behaviour: 'smooth'
            });
        });
    });
});

// Fade in background image on load
document.addEventListener('DOMContentLoaded', function() {
    const bgImage = document.querySelector('.bg-image');
    bgImage.style.opacity = 1;
    document.body.style.opacity = 1;
});

// Cookie consent handling
function acceptCookies() {
    document.querySelector('.cookie-banner').style.transform = 'translateY(100%)';
    localStorage.setItem('cookiesAccepted', 'true');
}

// Check if cookies were previously accepted
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            document.querySelector('.cookie-banner').classList.add('show');
        }, 1000);
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ROI Calculator functionality
function updateCalculations() {
    const process = document.getElementById('process-select').value;
    const employees = parseInt(document.getElementById('employees').value) || 0;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;

    // Assume 20% of time is spent on the selected task
    const timeSpentOnTask = 0.2;

    // Different time reduction percentages based on process type
    const timeReduction = {
        'meeting-scheduling': 0.7, // 70% time reduction
        'invoice-processing': 0.8, // 80% time reduction
        'inventory-management': 0.6, // 60% time reduction
        'report-generation': 0.75 // 75% time reduction
    };

    // Calculate annual hours saved
    const annualHours = employees * hours * 52 * timeSpentOnTask * timeReduction[process];
    const annualSavings = annualHours * rate;

    // Update the display with formatted numbers
    document.getElementById('hours-saved').textContent = Math.round(annualHours).toLocaleString();
    document.getElementById('cost-saved').textContent = '£' + Math.round(annualSavings).toLocaleString();
}

// Add event listeners to all calculator inputs
document.getElementById('process-select').addEventListener('change', updateCalculations);
document.getElementById('employees').addEventListener('input', updateCalculations);
document.getElementById('hours').addEventListener('input', updateCalculations);
document.getElementById('rate').addEventListener('input', updateCalculations);

// Initial calculation
updateCalculations();
