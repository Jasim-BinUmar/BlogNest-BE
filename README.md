# Blog API Backend

## Description
A robust RESTful API backend for a blog application built with Node.js, Express, and MongoDB. This API provides comprehensive functionality for blog management, including user authentication, blog post creation with image support, commenting system, and user authorization.

### Key Features
- User authentication (signup/login) with JWT
- Blog post management (CRUD operations)
- Image upload and storage for blog posts
- Commenting system
- Role-based authorization (Admin/User)
- Error handling and validation
- Secure password hashing
- Image conversion for optimized delivery

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing
- Express Async Handler for error management

## Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn package manager

## Project Setup

### 1. Clone the Repository
bash
git clone [repository-url]
cd blog-backend
### 2. Install Dependencies
bash
npm install
### 3. Environment Configuration
Create a .env file in the root directory with the following variables:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


### 4. Database Setup
- Ensure MongoDB is running locally or
- Use MongoDB Atlas and update the MONGO_URI in .env

### 5. Start the Server
Development mode:
bash
npm run dev

Production mode:
bash
npm start
Ask
Copy
Apply


## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Blog Posts
- GET /api/blogs - Get all blogs
- GET /api/blogs/:id - Get single blog
- POST /api/blogs - Create new blog (Auth required)
- PUT /api/blogs/:id - Update blog (Auth required)
- DELETE /api/blogs/:id - Delete blog (Auth required)
- GET /api/blogs/user/:userId - Get user's blogs

### Comments
- POST /api/blogs/:blogId/comments - Add comment (Auth required)
- GET /api/blogs/:blogId/comments - Get blog comments
- PUT /api/comments/:id - Update comment (Auth required)
- DELETE /api/comments/:id - Delete comment (Auth required)

## Authentication
The API uses JWT for authentication. Include the token in the Authorization header:


## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Blog Posts
- GET /api/blogs - Get all blogs
- GET /api/blogs/:id - Get single blog
- POST /api/blogs - Create new blog (Auth required)
- PUT /api/blogs/:id - Update blog (Auth required)
- DELETE /api/blogs/:id - Delete blog (Auth required)
- GET /api/blogs/user/:userId - Get user's blogs

### Comments
- POST /api/blogs/:blogId/comments - Add comment (Auth required)
- GET /api/blogs/:blogId/comments - Get blog comments
- PUT /api/comments/:id - Update comment (Auth required)
- DELETE /api/comments/:id - Delete comment (Auth required)

## Authentication
The API uses JWT for authentication. Include the token in the Authorization header:

Authorization: Bearer [your_token]



## File Upload
Blog images should be sent as multipart/form-data with the following fields:
- title: string
- content: string
- category: string[]
- image: file

## Error Handling
The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- File upload errors
- Database errors
- Not found errors

## Development

bash
Run in development mode
npm run dev
Run in production mode
npm start


## Project Structure

blog-backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── server.js
├── .env
├── .gitignore
└── package.json
Ask
Copy
Apply


## Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Contact
Jasim jasimbinumar@gmail.com
Project Link: https://github.com/Jasim-BinUmar/BlogNest-BE
