# 🛠️ Helpdesk Ticket System

A full-stack ticket management system that enables users to create, track, and manage support tickets with filtering and real-time updates.

---

## 🚀 Live Demo

* 🌐 Frontend: https://helpdesk-ticket-system.vercel.app
* ⚙️ Backend API: https://helpdesk-ticket-system-ndxv.onrender.com

---

## 📌 Features

* Full CRUD functionality (create, update, delete tickets)
* Filter tickets by status, priority, and assignee
* Dynamic UI updates with seamless API integration
* Clean and responsive user interface

---

## 🧱 Tech Stack

### Frontend

* React
* Axios
* CSS

### Backend

* Node.js
* Express

### Database

* PostgreSQL (Neon)

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📁 Project Structure

```
Helpdesk-Ticket-System/
│
├── frontend/        # React app
│   ├── src/
│   └── package.json
│
├── server/          # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
```

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)

```env
# Example only (do not use real credentials)
DATABASE_URL=postgresql://username:password@host:port/database
```

### Frontend (`/frontend/.env`)

```env
REACT_APP_API_URL=https://helpdesk-ticket-system-ndxv.onrender.com
```

---

## 🛠️ Installation (Local Setup)

### 1. Clone the repository

```
git clone https://github.com/Parthegon/Helpdesk-Ticket-System.git
cd Helpdesk-Ticket-System
```

---

### 2. Install backend dependencies

```
cd server
npm install
```

---

### 3. Install frontend dependencies

```
cd ../frontend
npm install
```

---

### 4. Run the application

#### Start backend

```
cd server
node server.js
```

#### Start frontend

```
cd frontend
npm start
```

---

## 🧪 API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | /api/tickets     | Retrieve all tickets  |
| GET    | /api/tickets/:id | Retrieve ticket by ID |
| POST   | /api/tickets     | Create a ticket       |
| PUT    | /api/tickets/:id | Update a ticket       |
| DELETE | /api/tickets/:id | Delete a ticket       |

---

## 🧠 Key Learnings

* Developed and deployed a full-stack web application
* Managed environment variables across local and production environments
* Debugged real-world deployment issues (dependency conflicts, caching, configuration)
* Integrated frontend and backend across different cloud platforms

---

## 📈 Future Improvements

* User authentication (JWT)
* Role-based access control (admin/user)
* Dashboard analytics
* Enhanced commenting system

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
