/**
 * Animations Module
 * Handles: scroll reveal, hero particles, typing animation.
 * Everything is skipped for visitors who prefer reduced motion.
 */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    initScrollReveal();

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) createParticleEffect(heroVisual);

    initTypingAnimation();
});

/** Fade/slide elements in as they enter the viewport. */
function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.section-header, .highlight-card, .project-card, .skill-category, ' +
        '.certification-card, .profile-card, .education-entry, .contact-card, .contact-form'
    ).forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/** Cycle through professional titles in the hero. */
function initTypingAnimation() {
    const titles = [
        'Aspiring AI/ML Engineer',
        'Machine Learning Enthusiast',
        'Python Developer',
        'Generative AI Builder'
    ];

    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 2000;

    function type() {
        const current = titles[titleIndex];
        charIndex += isDeleting ? -1 : 1;
        titleElement.textContent = current.substring(0, charIndex);

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === current.length) {
            delay = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 500);
}

/** Add a few softly floating dots to the hero visual. */
function createParticleEffect(container) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('span');
        particle.className = 'hero-particle';
        particle.setAttribute('aria-hidden', 'true');
        particle.style.left = `${10 + Math.random() * 80}%`;
        particle.style.top = `${10 + Math.random() * 80}%`;
        particle.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
        container.appendChild(particle);
    }
}
