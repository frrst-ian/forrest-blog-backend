# Forrest - Blog Backend

A RESTful blog API with JWT authentication and admin dashboard, designed to serve both public readers and private content management.

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [API Endpoints](#api-endpoints)
7. [Project Challenges](#project-challenges)
8. [License](#license)

## Overview

This backend API powers a complete blog system with two main components: a public blog for readers and a private admin panel for content management. The API handles everything from user authentication to content delivery, ensuring secure and efficient blog operations.

**API Base URL:** https://forrest-blog-backend.onrender.com

## Architecture

This API serves two distinct frontend applications:

### Public Frontend
- **Repository:** [forrest-blog-frontend](https://github.com/frrst-ian/forrest-blog-frontend)
- **Live Site:** [ianforrest.netlify.app](https://ianforrest.netlify.app)
- **Purpose:** Public blog interface for readers
- **Features:** Browse posts, read content, view comments

### Design

<div align='center'>
<img src='/public/745shots_so.png' alt='Screenshot of desktop design'>
</div>

### Private Admin Frontend  
- **Repository:** [forrest-blog-private](https://github.com/frrst-ian/forrest-blog-private)
- **Admin Panel:** [ianforrest.netlify.app](https://ianforrest-admin.netlify.app/auth/login)
- **Purpose:** Content management interface (restricted access)
- **Features:** Create/edit/delete posts, manage drafts, moderate comments

### Design

<div align='center'>
<img src='/public/258shots_so.png' alt='Screenshot of desktop design - Main dashboard view'>
</div>

## Features

### Core Functionality
- **JWT Authentication** - Secure token-based authentication with Passport.js
- **Role-based Access Control** - Separate permissions for public users and administrators
- **CRUD Operations** - Full content management capabilities
- **Draft/Published System** - Post status management with publication control
- **Commenting System** - Public commenting on published posts
- **CORS Configuration** - Configured to serve multiple frontend applications

### Security & Performance
- Password hashing with bcryptjs
- Input validation and sanitization
- Error handling and logging
- RESTful API design patterns

## Technologies Used

**Backend Framework:**
- Node.js & Express.js
- Prisma ORM with PostgreSQL
- JWT & Passport.js for authentication
- bcryptjs for password hashing

**Frontend Applications:**
- React.js (both public and admin interfaces)
- CSS3 for styling
- React Router for navigation

**Deployment:**
- Render (cloud platform)
- PostgreSQL database hosting
- Netlify (frontend hosting)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/frrst-ian/forrest-blog-backend.git
   cd forrest-blog-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL="http://localhost:3001"
   ADMIN_URL="http://localhost:3002"
   ```

4. **Database Setup:**
   ```bash
   # Create and run migrations
   npx prisma migrate dev
   
   # Generate Prisma client
   npx prisma generate
   
   # (Optional) Seed database with admin user
   npx prisma db seed
   ```

5. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Public Routes
- `GET /` - API status and health check
- `GET /posts` - Fetch all published posts
- `GET /posts/:id` - Get specific post with comments
- `POST /posts/:id/comments` - Create new comment

### Authentication
- `POST /auth/login` - User authentication (returns JWT)

### Admin Routes (Authentication Required)
- `GET /admin/posts` - Get all posts (including drafts)
- `GET /admin/posts/:id` - Get specific post for editing
- `POST /admin/posts` - Create new post
- `PUT /admin/posts/:id` - Update existing post
- `PUT /admin/posts/:id/published` - Toggle post publication status
- `DELETE /admin/posts/:id` - Delete post

## Project Challenges

The biggest learning experience came from initially building a working API and then refactoring for modularity and DRY principles. This taught me the critical importance of planning architecture upfront rather than retrofitting later.

**Key Learnings:**
- Implementing comprehensive error handling across all endpoints
- Designing RESTful endpoints that scale with growing requirements
- Managing authentication flows between multiple frontend applications
- Database schema design for flexible content management

The refactoring process, while challenging, ultimately resulted in a much more maintainable and scalable codebase.

## License

This project is open source and available under the [Apache License](LICENSE).