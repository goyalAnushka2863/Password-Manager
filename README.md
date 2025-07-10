
# Password Manager

A full-stack password manager built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to securely store and manage passwords, protected by JWT-based authentication.

---

## Features

- User authentication (signup/login)
- Store, update, and delete credentials
- Passwords encrypted before storage
- Protected routes using middleware
- JWT-based access control
- Clean, responsive UI using Tailwind CSS
- Project ready for deployment on Vercel

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)
- MongoDB (local instance or Atlas cluster)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/goyalAnushka2863/Password-Manager
cd Password-Manager
````

2. Install dependencies:

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

3. Set environment variables:

Create a `.env` file in the `backend/` folder with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Running the App

**Start backend:**

```bash
cd backend
npm start
```

**Start frontend (in a new terminal):**

```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Folder Structure

```
Password-Manager/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── vercel.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── utils/
    ├── index.html
    └── vite.config.js
```

---

## Project Roadmap

* [x] Basic user authentication
* [x] Password encryption
* [x] Token-based access
* [x] Password CRUD operations
* [ ] Add search/filter feature
* [ ] Update UI responsiveness
* [ ] Add password strength indicators
* [ ] Enable password export/import
* [ ] Dark mode

---

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-xyz`)
3. Make your changes
4. Commit your changes (`git commit -m "Add feature xyz"`)
5. Push to GitHub (`git push origin feature-xyz`)
6. Submit a pull request




