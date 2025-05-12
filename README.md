# My Express App 🚀

A Node.js + Express REST API with full CI/CD deployment to Azure. Includes user authentication, secure notification publishing, MongoDB integration, telemetry, and email support.

---

## 🔧 Features

- ✅ **User Management APIs**: Register, login, and update users
- 🔐 **JWT Authentication**: Secures protected endpoints
- 📬 **Notification Service**: Publish messages and send emails via Gmail
- 📊 **Application Insights**: Logs and traces stored in Azure Log Analytics
- ☁️ **MongoDB Atlas**: All user and notification data stored in MongoDB (hosted on Azure)
- ⚙️ **CI/CD via Azure DevOps**: Push to DevOps → deploys to Azure App Service
- 🌐 **Hosted on Azure Web App**: Deployed and running in the cloud

---

## 📁 Folder Structure

my-express-app/
├── controllers/ # Logic for user and notification endpoints
├── middleware/ # JWT auth middleware
├── models/ # Mongoose schemas
├── routes/ # Express route definitions
├── services/ # Azure Service Bus publisher
├── utils/telemetry.js # App Insights telemetry client
├── db.js # MongoDB connection
├── config/config.js # Environment variable manager
├── index.js # Main entry point


---

## 🔐 Secured Routes

All the following require a valid JWT token (generated via `/user/login`):

- `PUT /user` → Update user info  
- `POST /notification/publishNotification` → Send message to Azure Service Bus  
- `POST /notification/notify` → Send email directly via Nodemailer  

---

## 🌐 Tech Stack

| Layer         | Tech Used                     |
|---------------|-------------------------------|
| Backend       | Node.js, Express              |
| Auth          | JWT + bcryptjs                |
| Database      | MongoDB Atlas (Mongoose ODM)  |
| Messaging     | Azure Service Bus (Topic)     |
| Email         | Nodemailer + Gmail App Auth   |
| Monitoring    | Azure App Insights + Log Analytics |
| Deployment    | Azure DevOps + Azure Web App  |

---

## 🚀 API Endpoints

### 🧑 User

- `POST /user/register` – Register a new user  
- `POST /user/login` – Login and get JWT  
- `PUT /user` – Update user (requires token)

### ✉️ Notification

- `POST /notification/publishNotification` – Publishes message to Azure Service Bus  
- `POST /notification/notify` – Sends email immediately via Gmail

---

## 🔧 Environment Variables

Create a `.env` file or configure these in Azure App Service:

```env
PORT=3000
JWT_SECRET=your_jwt_secret

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/my-express-app?retryWrites=true&w=majority

# Email
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# Azure Service Bus
AZURE_SERVICE_BUS_CONNECTION_STRING=your_connection_string
AZURE_SERVICE_BUS_TOPIC_NAME=notification-topic
AZURE_SERVICE_BUS_SUBSCRIPTION_NAME=Notification-subscription

# App Insights
APPINSIGHTS_CONNECTION_STRING=InstrumentationKey=...;IngestionEndpoint=...

🔁 CI/CD Pipeline
✅ Code is pushed to Azure DevOps

✅ Automatically builds and deploys to Azure Web App using YAML pipeline

✅ App Insights logs deployment activity, errors, and custom events

📊 Monitoring
Use Azure Portal → Application Insights to view:

Live metrics

Custom events (UserRegistered, EmailSendSuccess, etc.)

Traces (MongoDB connected, JWT issued, etc.)

✅ Sample Custom Events in App Insights
UserRegistered

UserLoginSuccess

UserLoginFailed

EmailSendSuccess

ServiceBusMessageReceived

💬 Contact
Created by Navneet Singh
📫 Email: navneet.singh@ddds.ga.gov
🔗 Azure, DevOps, Cloud, and AI enthusiast


