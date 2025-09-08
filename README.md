🍴 Food Delivery Platform

A full-stack MERN application (MongoDB, Express.js, React, Node.js) for ordering home-cooked meals. It supports user authentication, admin management, chef dashboards, meals, cart, and order tracking.

🚀 Features

👤 User Authentication (Register/Login with JWT + Google login)

🧑‍🍳 Chef Role (add and manage menus & meals)

🛒 Cart & Orders (add meals to cart, place orders, track status)

🛠 Admin Panel (manage users, promote to chef/admin, delete users)

🔐 Role-based access control (User / Chef / Admin)

🌐 Frontend built with React + Vite

⚡ Backend built with Node.js + Express + MongoDB

🛠 Tech Stack

Frontend: React, Vite, Axios, TailwindCSS
Backend: Node.js, Express.js, JWT, Bcrypt
Database: MongoDB
Other: Passport.js, ESLint

📂 Project Structure
Food_Delivery_Platform/
  frontend/         # React + Vite frontend
  backend/          # Node.js + Express backend
    config/         # DB connection & passport setup
    controllers/    # Business logic
    middleware/     # Auth middleware
    models/         # MongoDB models (User, Meal, Cart, Order, Chef)
    routes/         # API routes (users, admin, meals, orders, cart)

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/Food_Delivery_Platform.git
cd Food_Delivery_Platform

2️⃣ Backend Setup
cd backend
npm install


Create a .env file in backend/ with:

MONGO_URI=mongodb://127.0.0.1:27017/food_delivery
JWT_SECRET=your_jwt_secret
PORT=5000


Start backend:

npm run dev   # or: node server.js

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend will start at: http://localhost:5173

Backend runs at: http://localhost:5000

🔑 Authentication

Register: POST /api/users/register

Login: POST /api/users/login

Google Login: POST /api/users/google-login

👩‍💻 Admin APIs

Once you set isAdmin: true for a user in MongoDB, login with that account to get admin token.

Get Users: GET /api/admin/users

Promote User: PATCH /api/users/make-admin/:id

Delete User: DELETE /api/admin/users/:id

Authorization:

Authorization: Bearer <admin_token>

🛒 Other APIs

Meals: Add & list meals (/api/meals)

Cart: Add to cart, remove, fetch (/api/cart)

Orders: Place order, get orders (/api/orders)

🧪 Testing with Postman

Register → Login → Get JWT token

Use token in Authorization: Bearer <token> header

Test protected routes (cart, orders, admin, etc.)

--- Harika Bondapalli

