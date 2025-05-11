const nodemailer = require('nodemailer');
const config = require('../config/config');
const { sendNotificationMessage } = require('../services/azureBusService');
const Notification = require('../models/Notification');


exports.publishNotification = async (req, res) => {
     const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'to, subject, and message are required' });
    }

    try {
        // Save to MongoDB
        await Notification.create({
            to,
            subject,
            message,
            status: 'queued',
            source: 'api'
        });

        // Send to Azure Bus
        await sendNotificationMessage({ to, subject, message });

        res.status(200).json({ message: 'Notification published and logged' });
    } catch (error) {
        console.error('[Notification Error]', error.message);
        res.status(500).json({ error: 'Failed to publish notification' });
    }
};

// You can move these to environment variables later
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass  // Use App Password, not your actual password
    }
});

exports.sendNotificationEmail = async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'to, subject, and message are required' });
    }

    const mailOptions = {
        from: 'your_email@gmail.com',
        to,
        subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send email' });
    }
};
