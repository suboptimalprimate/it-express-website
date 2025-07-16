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

    function getNextTicketNumber() {
        const key = 'ticketCounter';
        const current = parseInt(localStorage.getItem(key) || '0') + 1;
        localStorage.setItem(key, current);
        return current;
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', e => {
            e.preventDefault();
            const ticket = getNextTicketNumber();
            const service = document.getElementById('service').value;
            const description = document.getElementById('description').value;
            const name = document.getElementById('name').value;
            const phoneVal = document.getElementById('phone').value;
            const emailVal = document.getElementById('booking-email').value;
            const subject = `Ticket ${ticket}: ${service}`;
            const body = `Name: ${name}\nPhone: ${phoneVal}\nEmail: ${emailVal}\n\nDescription:\n${description}`;
            window.location.href = `mailto:service@it-express.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const ticket = getNextTicketNumber();
            const name = document.getElementById('contact-name').value;
            const phoneVal = document.getElementById('contact-phone').value;
            const emailVal = document.getElementById('contact-email').value;
            const message = document.getElementById('message').value;
            const subject = `Contact: ${ticket}`;
            const body = `Name: ${name}\nPhone: ${phoneVal}\nEmail: ${emailVal}\n\nMessage:\n${message}`;
            window.location.href = `mailto:service@it-express.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }
});
