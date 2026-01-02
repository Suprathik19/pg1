// ===== Navigation & Header =====
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// ===== Parallax Effect for Hero =====
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ===== Gallery Lightbox =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    caption: item.querySelector('.gallery-overlay p').textContent
}));

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', showPrevImage);
lightboxNext?.addEventListener('click', showNextImage);

// Close lightbox on background click
lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// ===== Testimonials Carousel =====
const testimonialsWrapper = document.getElementById('testimonialsWrapper');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');

if (testimonialsWrapper) {
    const testimonialCards = testimonialsWrapper.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots?.appendChild(dot);
    }

    const dots = carouselDots?.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        testimonialsWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots?.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    carouselNext?.addEventListener('click', nextSlide);
    carouselPrev?.addEventListener('click', prevSlide);

    // Auto-play carousel
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    testimonialsWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    testimonialsWrapper.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn?.classList.add('active');
    } else {
        scrollTopBtn?.classList.remove('active');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Registration Form Validation =====
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

if (registrationForm) {
    const nameInput = document.getElementById('fullName');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const termsCheckbox = document.getElementById('terms');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;

    // Update checkout minimum when check-in changes
    checkInInput?.addEventListener('change', () => {
        const checkInDate = new Date(checkInInput.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        if (checkOutInput) checkOutInput.min = minCheckOut;
    });

    function validateName() {
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();
        
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    function validateAge() {
        const ageError = document.getElementById('ageError');
        const age = parseInt(ageInput.value);
        
        if (age < 18) {
            ageError.textContent = 'You must be at least 18 years old';
            return false;
        }
        if (age > 120) {
            ageError.textContent = 'Please enter a valid age';
            return false;
        }
        ageError.textContent = '';
        return true;
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validateDates() {
        const checkInError = document.getElementById('checkInError');
        const checkOutError = document.getElementById('checkOutError');
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);
        
        if (checkOut <= checkIn) {
            checkOutError.textContent = 'Check-out date must be after check-in date';
            return false;
        }
        checkInError.textContent = '';
        checkOutError.textContent = '';
        return true;
    }

    // Real-time validation
    nameInput?.addEventListener('blur', validateName);
    ageInput?.addEventListener('blur', validateAge);
    emailInput?.addEventListener('blur', validateEmail);
    checkOutInput?.addEventListener('blur', validateDates);

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isAgeValid = validateAge();
        const isEmailValid = validateEmail();
        const areDatesValid = validateDates();
        const areTermsAccepted = termsCheckbox.checked;

        if (!areTermsAccepted) {
            alert('Please accept the Terms and Conditions to proceed');
            return;
        }

        if (isNameValid && isAgeValid && isEmailValid && areDatesValid) {
            // Show loading state
            const submitBtn = registrationForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // Submit form (FormSubmit will handle the actual submission)
            // For demo purposes, we'll simulate success after a delay
            setTimeout(() => {
                registrationForm.style.display = 'none';
                successMessage.classList.add('active');
                
                // Reset form
                registrationForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);

            // Uncomment below to actually submit the form
            // registrationForm.submit();
        } else {
            alert('Please correct the errors in the form');
        }
    });
}

// ===== Newsletter Form =====
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing! You will receive our newsletter at ' + email);
            form.reset();
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = header?.offsetHeight || 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('TravelHub Hostel - Website loaded successfully! 🏨');