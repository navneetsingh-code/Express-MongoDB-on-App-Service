const express = require('express');
const app = express();
const config = require('./config/config');



const appInsights = require('applicationinsights');


// Initialize App Insights with connection string
appInsights.setup(config.APPINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectConsole(true, true)
    .start();

// Optional: export the telemetry client for custom tracking
const telemetryClient = appInsights.defaultClient;

const connectMongoDB = require('./db');
connectMongoDB(); // Connect to MongoDB


app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 My Express API is running!');
});


const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/notification', notificationRoutes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});
