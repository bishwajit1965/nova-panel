# 🚀 Project Core

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.txt)
[![GitHub stars](https://img.shields.io/github/stars/bishwajit1965/nova-cart?style=social)](https://github.com/bishwajit1965/nova-cart/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/bishwajit1965/nova-cart)](https://github.com/bishwajit1965/nova-cart/issues)
[![GitHub forks](https://img.shields.io/github/forks/bishwajit1965/nova-cart?style=social)](https://github.com/bishwajit1965/nova-cart/network)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blueviolet)](https://your-demo-link.com)

A modular, production-ready **SaaS backend engine** built with **Node.js, Express, and MongoDB**.
It includes authentication, role-based access control, subscription plans, feature gating, and a scalable Cloudinary-based file upload system.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Feature System Example](#feature-system-example)

---

## Features✨

### 🔐 Authentication System

- JWT-based authentication (access + refresh tokens)
- Secure login / registration flow
- Role-based access control (user, admin, superAdmin)

### 🧑‍💼 Role & Permission System

- Middleware-based role protection
- Flexible role assignment
- Scalable permission structure

### 📦 Plan-Based SaaS System

- Subscription plans stored in MongoDB
- Feature-based access control
- Plan limits (uploads, requests, etc.)

### ☁️ File Upload System (Cloudinary)

- Single file upload
- Multiple file upload
- File update (replace old file)
- File delete (sync with Cloudinary)
- User-based file ownership

### 📊 Upload Quota System

- Plan-based upload limits
- Automatic usage tracking
- Upload restriction enforcement

### 🧠 Clean Architecture

- Modular folder structure
- Service-controller separation
- Reusable middleware system

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary
- Multer
- JWT Authentication

---

## Project Structure

src/
├── config/
├── core/
├── middlewares/
├── modules/
│ ├── auth/
│ ├── users/
│ ├── plans/
│ └── uploads/
├── utils/
└── server.js

---

## API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Uploads

- `POST /api/uploads/single`
- `POST /api/uploads/multiple`
- `GET /api/uploads`
- `PUT /api/uploads/:id`
- `DELETE /api/uploads/:id`

---

## Feature System Example

```js
requireFeature("basic_upload");
requireFeature("advanced_upload");

⚙️ Environment Variables

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

📌 Goals
Build a reusable SaaS backend core
Enable fast startup for future projects
Provide scalable architecture for real-world apps
📈 Future Improvements
Payment integration (Stripe)
Admin dashboard analytics
Subscription upgrade system
Rate limiting per plan
Email notifications
👨‍💻 Author

Built with focus on real-world SaaS architecture and scalability.

⭐ If you like this project

Give it a ⭐ on GitHub and use it as a backend starter template.

Feature complete – Version 1.0.0

---



