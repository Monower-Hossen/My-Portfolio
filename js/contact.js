/**
 * Contact Module
 * Handles: form validation and submission.
 *
 * SENDING MESSAGES
 * GitHub Pages is static, so a form needs a service to deliver the message.
 * 1. Create a free form at https://formspree.io (or Web3Forms) and paste the
 *    endpoint URL into FORM_ENDPOINT below, e.g. 'https://formspree.io/f/abcdwxyz'.
 * 2. While FORM_ENDPOINT is empty, the form falls back to opening the visitor's
 *    email app with the message pre-filled (it never pretends a message was sent).
 */
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'aiwithmonower@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');

    if (!contactForm) return;

    const rules = {
        fullName: (v) => (v === '' ? 'Full name is required' : ''),
        email: (v) => (v === '' ? 'Email address is required' : (!isValidEmail(v) ? 'Please enter a valid email address' : '')),
        subject: (v) => (v === '' ? 'Subject is required' : ''),
        message: (v) => (v === '' ? 'Message is required' : '')
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        resetErrors();

        const data = {
            fullName: contactForm.fullName.value.trim(),
            email: contactForm.email.value.trim(),
            subject: contactForm.subject.value.trim(),
            message: contactForm.message.value.trim()
        };

        let isValid = true;
        Object.keys(rules).forEach((field) => {
            const error = rules[field](data[field]);
            if (error) {
                showError(field, error);
                isValid = false;
            }
        });
        if (!isValid) {
            const firstError = contactForm.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            if (FORM_ENDPOINT) {
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error(`Request failed (${response.status})`);
                showStatus('success', 'fa-check-circle', 'Your message has been sent. I will get back to you soon.');
            } else {
                const body = `${data.message}\n\n— ${data.fullName} (${data.email})`;
                window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
                showStatus('success', 'fa-envelope', `Your email app should open with the message ready to send. If it does not, email me directly at ${CONTACT_EMAIL}.`);
            }
            contactForm.reset();
        } catch (err) {
            showStatus('error', 'fa-exclamation-circle', `Sorry, the message could not be sent. Please email me directly at ${CONTACT_EMAIL}.`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    });

    // Real-time validation
    formInputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });

    function validateField(input) {
        clearError(input);
        const rule = rules[input.id];
        if (!rule) return true;
        const error = rule(input.value.trim());
        if (error) showError(input.id, error);
        return !error;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');

        let errorMsg = input.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
        }
        errorMsg.textContent = message;
    }

    function clearError(input) {
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    }

    function resetErrors() {
        formInputs.forEach(clearError);
        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }
    }

    function showStatus(type, icon, message) {
        if (!formStatus) return;
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = '';
        const i = document.createElement('i');
        i.className = `fas ${icon}`;
        formStatus.appendChild(i);
        formStatus.appendChild(document.createTextNode(` ${message}`));
    }
});
