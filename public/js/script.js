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

    document.body.classList.add('loaded');

    document.querySelectorAll('a').forEach(link => {
        if (link.target !== '_blank' && link.href && link.origin === location.origin) {
            link.addEventListener('click', e => {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 600);
            });
        }
    });

    const email = document.getElementById('copy-email');
    if (email && navigator.clipboard) {
        email.addEventListener('click', () => {
            navigator.clipboard.writeText(email.textContent.trim());
        });
    }

    const phone = document.getElementById('copy-phone');
    if (phone && navigator.clipboard) {
        phone.addEventListener('click', () => {
            navigator.clipboard.writeText(phone.textContent.trim());
        });
    }
});
