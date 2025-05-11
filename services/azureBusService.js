const { ServiceBusClient } = require("@azure/service-bus");
const config = require('../config/config');

const connectionString = config.azure.servicebusconnectionstring;
const topicName = config.azure.topicName;

const sendNotificationMessage = async (messageBody) => {
    const client = new ServiceBusClient(connectionString);
    const sender = client.createSender(topicName);

    try {
        const message = {
            body: messageBody,
            contentType: "application/json",
        };

        await sender.sendMessages(message);
        console.log('✔️ Notification message sent to Azure Service Bus.');
    } catch (error) {
        console.error('❌ Failed to send message:', error.message);
    } finally {
        await sender.close();
        await client.close();
    }
};

module.exports = {
    sendNotificationMessage
};
