const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const serviceEmail = process.env.SERVICE_EMAIL || 'service@it-express.org';

const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
let transporter = null;

if (smtpConfigured) {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
}

async function sendMail(subject, text) {
    if (!transporter) {
        console.log('Email transport not configured.\nSubject:', subject, '\nText:', text);
        return;
    }
    await transporter.sendMail({
        from: serviceEmail,
        to: serviceEmail,
        subject,
        text
    });
}

app.post('/api/book', async (req, res) => {
    const { ticket, service, description, name, phone, email, appointment } = req.body;
    const subject = `Ticket ${ticket}: ${service}`;
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred Date & Time: ${appointment}\n\nDescription:\n${description}`;
    try {
        await sendMail(subject, body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/api/contact', async (req, res) => {
    const { ticket, name, phone, email, message } = req.body;
    const subject = `Contact: ${ticket}`;
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;
    try {
        await sendMail(subject, body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
