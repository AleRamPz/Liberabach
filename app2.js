// app2.js

document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Scroll Reveal Animation via Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed (only reveal once)
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Testimonial Carousel
    const track = document.getElementById('testimonial-track');
    if (track) {
        const cards = Array.from(track.children);
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const dotsNav = document.getElementById('carousel-dots');

        // Create dots based on number of cards
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.children);
        let currentIndex = 0;

        const updateCarousel = (index) => {
            const gap = window.innerWidth <= 768 ? 24 : 32; // match css gap loosely or let flex percent do it
            track.style.transform = `translateX(calc(-${index * 100}% - ${index * gap}px))`;

            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');

            // Handle buttons state
            prevBtn.style.opacity = index === 0 ? '0.3' : '1';
            prevBtn.style.cursor = index === 0 ? 'default' : 'pointer';

            nextBtn.style.opacity = index === cards.length - 1 ? '0.3' : '1';
            nextBtn.style.cursor = index === cards.length - 1 ? 'default' : 'pointer';
        };

        updateCarousel(0); // init

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCarousel(currentIndex);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(currentIndex);
            }
        });

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('.dot');
            if (!targetDot) return;
            currentIndex = parseInt(targetDot.dataset.index);
            updateCarousel(currentIndex);
        });
    }

});
