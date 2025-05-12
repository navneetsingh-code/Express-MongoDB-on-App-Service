const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['queued', 'sent', 'failed'],
        default: 'queued'
    },
    source: {
        type: String,
        enum: ['api', 'bus'],
        default: 'api'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
