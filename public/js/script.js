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
        bookingForm.addEventListener('submit', async e => {
            e.preventDefault();
            const ticket = getNextTicketNumber();
            const service = document.getElementById('service').value;
            const description = document.getElementById('description').value;
            const name = document.getElementById('name').value;
            const phoneVal = document.getElementById('phone').value;
            const emailVal = document.getElementById('booking-email').value;

            try {
                const response = await fetch('/api/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticket, service, description, name, phone: phoneVal, email: emailVal })
                });

                if (response.ok) {
                    alert('Booking request sent!');
                    bookingForm.reset();
                } else {
                    alert('Error sending booking request.');
                }
            } catch (err) {
                alert('Error sending booking request.');
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            const ticket = getNextTicketNumber();
            const name = document.getElementById('contact-name').value;
            const phoneVal = document.getElementById('contact-phone').value;
            const emailVal = document.getElementById('contact-email').value;
            const message = document.getElementById('message').value;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ticket, name, phone: phoneVal, email: emailVal, message })
                });

                if (response.ok) {
                    alert('Message sent!');
                    contactForm.reset();
                } else {
                    alert('Error sending message.');
                }
            } catch (err) {
                alert('Error sending message.');
            }
        });
    }
});
