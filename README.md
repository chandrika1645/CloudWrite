# **CloudWrite** ☁️✍️

**CloudWrite** is a modern document writing and management platform that allows users to **write, edit, save drafts, and upload documents directly to Google Drive**. Built with **React.js** for the frontend and **Express.js** for the backend, it provides seamless **Google OAuth 2.0 authentication** and a **rich text editor** powered by ReactQuill.

---

## 📑 **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Security](#security)
- [Demo Video](#demo-video)
- [Screenshots](#screenshots)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)

---

## 🚀 **Project Overview**

CloudWrite enables users to **create, edit, and store documents** securely. Documents can be saved as **drafts** before being uploaded to **Google Drive**. The platform ensures **secure authentication** via **Google OAuth 2.0** and uses **JWT tokens with RSA encryption** for authorization.

---

## 🛠️ **Features**

### **Backend:**

- **Google OAuth 2.0 Authentication:** Secure sign-in via Google.
- **JWT Authentication:** Uses RSA algorithm with private/public key encryption.
- **Document Management:** Create, edit, save drafts, and upload documents.
- **MongoDB Integration:** Stores drafts and user document metadata.
- **Cookie-based Auth:** Tokens are stored securely in HTTP-only cookies.
- **Environment Variables:** Securely manage credentials and secrets.
- **Error Handling:** Structured error responses for API calls.

### **Frontend:**

- **Google OAuth Sign-In:** Smooth authentication experience.
- **Rich Text Editor:** ReactQuill-powered text editor for writing documents.
- **Draft Management:** Save documents before final upload.
- **Google Drive Integration:** Upload documents directly to Google Drive.
- **Responsive UI:** Optimized for all screen sizes.
- **State Management:** React Context and hooks for efficient data handling.

---

## 🔐 **Security**

- **OAuth 2.0 Authentication:** Secure sign-in via Google.
- **JWT with RSA Algorithm:** Uses private/public key encryption.
- **Passwordless Authentication:** Eliminates password vulnerabilities.
- **HTTP-Only Cookies:** Prevents XSS and CSRF attacks.
- **CORS Handling:** Secures cross-origin requests.

---

## 🎬 **Demo Video**

Watch CloudWrite in action!  

<a href="https://drive.google.com/file/d/1uQZlEtvScLQDR0SApsld9Cc2_pi5kflP/view?usp=drive_link">
    <img src="https://github.com/chandrika1645/CloudWrite/blob/main/app-preview/video-preview.gif" width="700">
</a>

---

## 📸 **Screenshots**

- **My Drive Page:**
 <img src="https://raw.githubusercontent.com/chandrika1645/CloudWrite/main/app-preview/my-drive.png" width="700">
  
- **Recents Page:**
<img src="https://raw.githubusercontent.com/chandrika1645/CloudWrite/main/app-preview/recents.png" width="700">

- **Google-drive uploads preview:**
<img src="https://raw.githubusercontent.com/chandrika1645/CloudWrite/main/app-preview/uploads.png" width="700">

---

## 🛠️ **Backend Setup**

### **Prerequisites:**

- Node.js
- MongoDB

### **Steps to Run the Backend:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/CloudWrite.git
2. Navigate to the Backend Directory:

    ```bash
    cd server
3. Install Dependencies:

    ```bash
    npm install
4. Generate RSA Keys for JWT Authentication:

    ```bash
    openssl genpkey -algorithm RSA -out private.pem
    openssl rsa -in private.pem -pubout -out public.pem
5. Configure Environment Variables:
 
    Create a .env file and add the following:

    ```bash

    NODE_ENV=development
    MONGO_URI=your-mongodb-uri
    CLIENT_ID=your-google-client-id
    CLIENT_SECRET=your-google-client-secret
    REDIRECT_URI=your-google-redirect-uri
    FRONTEND_URL=http://localhost:3000
6. Start the Backend Server:

    ```bash
    npm start
The frontend will be available at [http://localhost:3000](http://localhost:3000).



## 🚀 Frontend Setup

### 1️⃣ Navigate to the Frontend Directory:
```bash
cd client
```

### 2️⃣ Install Dependencies:
```bash
npm install
```

### 3️⃣ Configure Environment Variables:
Create a `.env` file and add the following:
```bash
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GOOGLE_REDIRECT_URI=your-google-redirect-uri
```

### 4️⃣ Start the Frontend Application:
```bash
npm run dev
```
The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## ⚠️ Error Handling
The backend is equipped with structured error handling to return appropriate responses.

### Example Error Response:
```json
{
  "error": "Unauthorized Access",
  "status": 401
}
```

---

## 🧑‍💻 Technologies Used

### Backend:
- Node.js - JavaScript runtime
- Express.js - Web framework for Node.js
- MongoDB - NoSQL database
- JWT with RSA - Secure authentication
- OAuth 2.0 - Google sign-in
- dotenv - Environment variable management

### Frontend:
- React.js - Frontend JavaScript library
- ReactQuill - Rich text editor
- Axios - API communication
- React Hooks - Efficient state management
- Toast Notifications - User feedback

CloudWrite simplifies document management with Google Drive integration, secure authentication, and a seamless writing experience. 🚀
