/**
 * Navigation Module
 * Handles: mobile menu toggle, smooth scrolling, active navigation highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    // Mobile menu toggle
    if (hamburgerBtn && navbarMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            const isActive = navbarMenu.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isActive);
            hamburgerBtn.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close the mobile menu with Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            if (hamburgerBtn) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
                hamburgerBtn.focus();
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navbarMenu && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    if (hamburgerBtn) {
                        hamburgerBtn.setAttribute('aria-expanded', 'false');
                        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
                
                // Scroll with offset
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting on scroll
    const sections = document.querySelectorAll('header[id], section[id]');
    
    const activateNavLink = () => {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navbarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Update active link on scroll
    window.addEventListener('scroll', activateNavLink, { passive: true });
    
    // Initial check
    activateNavLink();
});