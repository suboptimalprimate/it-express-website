document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            const expanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('active');
        });
    }

    const email = document.getElementById('copy-email');
    if (email && navigator.clipboard) {
        email.addEventListener('click', () => {
            navigator.clipboard.writeText(email.textContent.trim());
        });
    }
});
