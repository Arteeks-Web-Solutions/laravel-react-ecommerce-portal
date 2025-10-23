# laravel-react-ecommerce-portal
Fullstack Laravel + React + Tailwind ecommerce platform met gebruikersauthenticatie, klant- &amp; adminportaal en shopmodule. Toont secure API’s, role-based access en moderne frontend integratie.
# laravel-react-ecommerce-portal
Fullstack Laravel + React + Tailwind ecommerce platform met gebruikersauthenticatie, klant- &amp; adminportaal en shopmodule. Toont secure API’s, role-based access en moderne frontend integratie.
# Laravel + React Fullstack Ecommerce Platform

A modern fullstack example project built with **Laravel**, **React**, and **Tailwind CSS**.
This project demonstrates how we can build scalable platforms with user roles, a store module, customer portal, and administrative dashboard — all in one integrated codebase.

## 🚀 Features

### 🔐 Authentication & Roles
- Laravel Sanctum API authentication
- Admin permissions which allows access to the admin dashboard
- Registration, login, password reset, profile management
- Secured routes in both backend and frontend

### 🛒 Store Module
- Product management (CRUD via admin portal)
- Storefront with filters and product details
- Shopping cart and checkout with **Stripe** integration
- Automatic shopping cart merging for logged in users.
- Order history and email confirmation

### 👤 Customer Portal
- Overview of orders
- Profile settings

### 🧾 Admin Dashboard
- Manage products and orders
- Insights into revenue and activity
- Role-based access

## 🧰 Tech Stack

| Category | Technology |
|----------|------------|
| **Backend** | Laravel 12, Laravel Sanctum, Eloquent ORM |
| **Frontend** | React 18, Vite, Tailwind CSS, React DOM Router |
| **Payments** | Stripe (via Stripe PHP SDK) |
| **Database** | MySQL |
| **Other** | GitHub Actions (CI/CD), ESLint + Prettier |

## 💡 Project Purpose
This project is set up as a **portfolio** to showcase a base of our skills in modern fullstack development.
It is suitable as:
- A base for a SaaS product
- A demo of API architecture + frontend integration
- A reference project

## 🧱 Project Structure

- `/api/client` → Laravel API endpoints for the client-facing functionality
- `/api/application` → Laravel API endpoints for the application/admin interface
- `/shop` → Frontend rendering of the shop/store area
- `/client` → Frontend rendering of the client/customer portal
- `/admin` → Frontend rendering of the admin dashboard
- `/auth` → Frontend rendering of the authentication system (login, registration, password reset)

## ⚙️ Installation
Set up a database and add its login credentials to your `.env` file before running the migrations.

```bash
# Backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Frontend
npm install
npm run dev
```

Then set up your (local) web server to access the app.

## 🌍 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password |
| Customer | user@example.com | password |

## 🧑‍💻 Contribution
Pull requests, feedback, and feature suggestions are welcome!
Use issues to report bugs or ideas.

## 🪪 License
Open-source under the **MIT License**.
Free to use for study, portfolio, or commercial purposes with attribution.

### ✨ Preview
*To be added*

> 💬 *Built with Laravel, React, and Tailwind — by Arteeks.*
