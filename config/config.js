require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    mongoURI: process.env.MONGODB_URI,
    APPINSIGHTS_CONNECTION_STRING: process.env.APPINSIGHTS_CONNECTION_STRING,
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    azure: {
        servicebusconnectionstring: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
        topicName: process.env.AZURE_SERVICE_BUS_TOPIC_NAME
    }
};
