# Forrest - Blog Backend

## Table of Contents
1. [Description](#description)
1. [Demo](#demo)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Challenges](#project-challenges)
5. [Installation](#installation)

## Description
RESTful blog API with JWT authentication and admin dashboard. Built to practice modern backend development patterns and authentication flows.

## Demo
**Frontend:** https://ianforrest.netlify.app/posts  
**API:** https://forrest-blog-backend.onrender.com

## Features
- JWT-based authentication with Passport.js
- Admin dashboard for post management (CRUD operations)
- Public blog with commenting system
- Role-based access control
- Published/draft post status
- CORS configuration for multiple front-ends

## Technologies Used
**Backend:**
- Node.js & Express.js
- Prisma ORM with PostgreSQL
- JWT & Passport.js for authentication
- bcryptjs for password hashing

**Deployment & Hosting:**
- Render (cloud platform for hosting)

## Project Challenges
Initially built a working API then refactored for modularity and DRY principles, which taught me the importance of planning architecture upfront. The biggest learning was implementing proper error handling and designing RESTful endpoints that scale.

## Installation

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
- `GET /` - API status
- `POST /auth/login` - User authentication
- `GET /posts` - Public published posts
- `GET /posts/:id` - Post with comments
- `POST /posts/:id/comments` - Create comment
- `GET /admin/posts` - All posts (auth required)
- `GET /admin/posts/:id` - Single posts (auth required)
- `POST /admin/posts` - Create post (auth required)
- `PUT /admin/posts/:id` - Update post (auth required)
- `PUT /admin/posts/:id/published` - Toggle post publish status (auth required)
- `DELETE /admin/posts/:id` - Delete post (auth required)

## License
This project is open source and available under the [APACHE License](LICENSE).