/**
 * Main Module
 * Initializes global functionality: back-to-top, profile photo fallback,
 * education timeline and certifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initProfilePhoto();
    initEducationTimeline();
    initCertifications();
});

/** Small DOM helper: create an element with a class and text (no raw HTML). */
function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

/** Back to Top Button */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    const toggle = () => backToTop.classList.toggle('visible', window.scrollY > 300);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Profile photo: show the icon placeholder when the image is missing,
 * fails to load, or is only a tiny placeholder file.
 */
function initProfilePhoto() {
    const photo = document.querySelector('.profile-photo');
    if (!photo) return;
    const placeholder = photo.nextElementSibling;

    const showPlaceholder = () => {
        photo.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
    };

    photo.addEventListener('error', showPlaceholder);
    photo.addEventListener('load', () => {
        if (photo.naturalWidth < 20) showPlaceholder();
    });
    // Image may already have finished (or failed) before this script ran
    if (photo.complete) {
        if (photo.naturalWidth < 20) showPlaceholder();
    }
}

/**
 * Education Timeline
 * Empty fields are skipped, so nothing "placeholder" is ever shown publicly.
 */
function initEducationTimeline() {
    const timeline = document.getElementById('educationTimeline');
    const section = document.getElementById('education');
    if (!timeline) return;

    const entries = [
        {
            degree: 'B.Sc. in Computer Science & Engineering',
            institution: 'College of Business Science and Technology (CBST), National University',
            department: '',
            year: '',
            status: 'Final semester completed — result awaited'
        }
    ];

    if (entries.length === 0) {
        if (section) section.hidden = true;
        return;
    }

    entries.forEach((entry) => {
        const item = createEl('div', 'education-entry');
        const content = createEl('div', 'education-content');
        item.appendChild(createEl('div', 'education-dot'));

        if (entry.degree) content.appendChild(createEl('div', 'education-degree', entry.degree));
        if (entry.institution) content.appendChild(createEl('div', 'education-institution', entry.institution));
        if (entry.department) content.appendChild(createEl('div', 'education-department', entry.department));
        if (entry.year) content.appendChild(createEl('div', 'education-year', entry.year));
        if (entry.status) content.appendChild(createEl('div', 'education-coursework', entry.status));

        item.appendChild(content);
        timeline.appendChild(item);
    });
}

/**
 * Certifications
 * Add real, verified entries to the array below. While it is empty the whole
 * section is hidden instead of showing an empty/placeholder card.
 */
function initCertifications() {
    const grid = document.getElementById('certificationsGrid');
    const section = document.getElementById('certifications');
    if (!grid) return;

    // Example: { title: 'Course name', issuer: 'Issuer', date: '2026' }
    const certificates = [];

    if (certificates.length === 0) {
        if (section) section.hidden = true;
        return;
    }

    certificates.forEach((cert) => {
        const card = createEl('div', 'certification-card');
        card.appendChild(createEl('div', 'certification-title', cert.title));
        card.appendChild(createEl('div', 'certification-issuer', cert.issuer));
        if (cert.date) card.appendChild(createEl('div', 'certification-date', cert.date));
        grid.appendChild(card);
    });
}

/** Footer year, scroll progress bar and blog topics */
document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const bar = document.getElementById('scrollProgress');
    if (bar) {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // Unpublished sample topics, clearly marked as upcoming
    const blog = document.getElementById('blogGrid');
    if (blog) {
        ['Understanding Retrieval-Augmented Generation', 'Building Multi-Agent AI Systems', 'Deploying ML Models with FastAPI',
         'Introduction to MLOps', 'Computer Vision with Deep Learning', 'Building AI Applications with LangChain'].forEach((t) => {
            const c = createEl('article', 'blog-card');
            c.append(createEl('span', 'blog-badge', 'Upcoming'), createEl('h3', '', t));
            blog.appendChild(c);
        });
    }
});
