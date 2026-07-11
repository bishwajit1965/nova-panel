
# 🚀 Nova Panel

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.txt)
[![GitHub stars](https://img.shields.io/github/stars/bishwajit1965/nova-panel?style=social)](https://github.com/bishwajit1965/nova-panel/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/bishwajit1965/nova-panel)](https://github.com/bishwajit1965/nova-panel/issues)
[![GitHub forks](https://img.shields.io/github/forks/bishwajit1965/nova-panel?style=social)](https://github.com/bishwajit1965/nova-panel/network)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blueviolet)](https://your-demo-link.com)

A production-ready modular MERN Admin Platform & Starter Framework designed to accelerate the development of scalable web applications.

Nova Panel combines authentication, authorization, role-based access control, reusable CRUD architecture, uploads, notifications, audit logging, system settings, subscription plans, and shared infrastructure into a single extensible platform.

## 📌 Goals

- Build a reusable SaaS backend core
- Build client projects faster.
- Serve as a reusable foundation for future applications.
- Evolve into a commercial-quality admin panel framework.
- Enable fast startup for future projects
- Provide scalable architecture for real-world apps
- 📈 Future Improvements
- Payment integration (Stripe)
- Admin dashboard analytics
- Subscription upgrade system
- Rate limiting per plan
- Email notifications

## 📚 Table of Contents

- [Overview](#overview)
- [Project Vision](#project-vision)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development Roadmap](#development-roadmap)
- [Current Development Status](#current-development-status)
- [License](#license)
- [Author](#author)

---

## 📖 Overview

Modern web applications repeatedly require the same infrastructure:

- Authentication
- Authorization
- Users
- Roles
- Permissions
- Uploads
- Settings
- Notifications
- Audit Logs

Instead of rebuilding these components for every project, Nova Panel provides a reusable and extensible foundation so developers can focus on solving business problems rather than recreating common backend functionality.

## 🎯 Project Vision {#project-vision}

Nova Panel aims to become a professional MERN starter framework that enables developers to launch secure, scalable, maintainable applications with minimal setup.

## 📌 The project emphasizes

- Modular architecture
- Clean code
- Reusable components
- Production-ready structure
- Scalability
- Maintainability
- Developer productivity

✨ Key Features

## 🔐 Authentication System

- JWT-based authentication (access + refresh tokens)
- Secure login / registration flow
- Role-based access control (user, admin, superAdmin)
- Access Token
- Refresh Token
- Login
- Registration
- Logout
- Forgot Password
- Password Reset
- Token Validation
- Protected Routes

## 🛡 Authorization

- Role-Based Access Control (RBAC)
- Permission-Based Authorization
- Middleware Protection
- Dynamic Permission Assignment
- Access Management

## 🧑‍💼 Role & Permission System

- Middleware-based role protection
- Flexible role assignment
- Scalable permission structure

## 👥 User Management

- User CRUD
- User Status Management
- User Profile
- Role Assignment
- Permission Assignment

## 📦 Plan Management - Plan-Based SaaS System

- Subscription plans stored in MongoDB
- Feature-based access control
- Plan limits (uploads, requests, etc.)
- Subscription Plans
- Feature Gating
- Plan Management
- Upgrade Ready
- Scalable Pricing Structure

## ☁ File Upload Management System (Cloudinary)

- Cloudinary Integration
- Single file Upload
- Multiple Upload
- Replace Upload
- File update (replace old file)
- Delete Upload
- User-based file ownership
- Upload Tracking
- File delete (sync with Cloudinary)

### 📊 Upload Quota System

- Plan-based upload limits
- Automatic usage tracking
- Upload restriction enforcement

### 🧠 Clean Architecture

- Modular folder structure
- Service-controller separation
- Reusable middleware system

## 🔔 Notification Management

- Draft Notices
- Published Notices
- Archive Notices
- Revoke Archived Notices
- Soft Delete
- Hard Delete
- Search
- Pagination
- Modal Preview
- Audit Logging
- Real-time Refresh

## ⚙ System Settings

- Site Settings
- Branding
- General Configuration
- Feature Toggles
- Application Configuration

## 📜 Audit Logs

- Create Logs
- Update Logs
- Delete Logs
- Action History
- User Activity Tracking

## 🧠 Shared Infrastructure

Nova Panel provides reusable infrastructure shared across all modules.

- Shared Hooks
- useApiQuery
- useApiMutation
- usePermission
- useValidator
- useFetchedDataStatusHandler
- Shared UI Components
- Button
- Input
- Modal
- SearchBox
- Pagination
- Confirm Dialogue
- Confirm Action Dialogue
- Cards
- Tables
- Badges
- Read More Component
- Shared Architecture
- Base Service
- Shared CRUD Pattern
- Modular Controllers
- Modular Services
- Validation Layer
- Reusable API Structure

## 🏗 Tech Stack

- Frontend
- React
- React Router
- React Query
- Tailwind CSS
- DaisyUI
- Lucide React
- Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Authentication
- JWT
- Refresh Tokens
- bcrypt
- Uploads
- Cloudinary
- Multer

## 📂 Project Structure

client/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── modules/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── utils/

server/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── core/
│   ├── middlewares/
│   ├── modules/
│   ├── routes/
│   └── utils/

- 📦 Current Modules
- Authentication
- Users
- Roles
- Permissions
- Access Management
- Plans
- Uploads
- Notifications
- System Settings
- Audit Logs

## 🔒 Security Features

- JWT Authentication
- Refresh Tokens
- Password Encryption
- Protected APIs
- Role Middleware
- Permission Middleware
- Route Guards

## ⚙ Installation

- git clone `https://github.com/bishwajit1965/nova-panel.git`

- cd nova-panel

- npm install

- Client

- cd client

- npm install

- npm run dev

- Server

- cd server

- npm install

- npm run dev

## ⚙️ 🌍 Environment Variables

- PORT=5000
- MONGO_URI=your_mongodb_url
- JWT_SECRET=your_secret
- JWT_REFRESH_SECRET=
- CLOUDINARY_CLOUD_NAME=your_name
- CLOUDINARY_API_KEY=your_key
- CLOUDINARY_API_SECRET=your_secret

## 🛣 Development Roadmap

✅ Completed

- Authentication
- Authorization
- RBAC
- Users
- Roles
- Permissions
- Access Management
- Plans
- Uploads
- Notifications
- System Settings
- Audit Logs
- Shared CRUD Infrastructure
- Shared UI Components
- Search
- Pagination

## 🚧 Remaining Before V1 Release

- Email System
- Profile Enhancements
- Dashboard Improvements
- Additional Documentation
- Testing & Optimization
- Performance Review

## 🔮 Planned Beyond V1

- Multi-language Support (i18n)
- Theme Management
- Analytics Dashboard
- Scheduler
- Background Jobs
- Plugin Architecture
- Multi-tenancy
- WebSocket Notifications

## 📈 Current Development Status

Version: V1 (Under Active Development)

Nova Panel is actively being developed and continuously improved. The focus of Version 1 is to deliver a stable, reusable, production-ready admin platform that can serve as the foundation for future projects and commercial applications.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Bishwajit Paul

Building reusable, production-ready software with modern MERN technologies.

⭐ If you find this project useful, consider giving it a ⭐ on GitHub and use it as a backend starter template.

Current Status

🚧 Nova Panel V1 is under active development.

The project is approaching its first stable production release.
