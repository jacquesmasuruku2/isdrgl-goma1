# ISDR-GL Backend API

Backend API for the ISDR-GL institution management system built with Express.js and Supabase (PostgreSQL).

## Features

- **Departments Management**: Create, read, update, and delete departments
- **Teachers Management**: Manage teacher information and qualifications
- **Admissions**: Handle student admission applications
- **Blog**: Publish and manage blog posts and announcements
- **Contact Form**: Capture and manage contact form submissions
- **Supabase Integration**: PostgreSQL database with real-time capabilities

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database with authentication
- **@supabase/supabase-js** - JavaScript client library

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the backend directory and set the following variables:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/isdr-gl
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

4. Start MongoDB
Ensure MongoDB is running on your system.

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Routes

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get a specific department
- `POST /api/departments` - Create a new department
- `PUT /api/departments/:id` - Update a department
- `DELETE /api/departments/:id` - Delete a department

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get a specific teacher
- `GET /api/teachers/department/:departmentId` - Get teachers by department
- `POST /api/teachers` - Create a new teacher
- `PUT /api/teachers/:id` - Update a teacher
- `DELETE /api/teachers/:id` - Delete a teacher

### Admissions
- `GET /api/admissions` - Get all admission applications
- `GET /api/admissions/:id` - Get a specific application
- `GET /api/admissions/status/:status` - Get applications by status
- `POST /api/admissions` - Create a new application
- `PUT /api/admissions/:id` - Update an application
- `PUT /api/admissions/:id/status` - Update application status
- `DELETE /api/admissions/:id` - Delete an application

### Blog
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/featured` - Get featured blog posts
- `GET /api/blog/category/:category` - Get posts by category
- `GET /api/blog/:slug` - Get a specific blog post
- `POST /api/blog` - Create a new blog post
- `PUT /api/blog/:id` - Update a blog post
- `DELETE /api/blog/:id` - Delete a blog post

### Contact
- `GET /api/contact` - Get all contact messages
- `GET /api/contact/:id` - Get a specific message
- `GET /api/contact/status/:status` - Get messages by status
- `POST /api/contact` - Submit a contact form
- `PUT /api/contact/:id` - Update a message
- `DELETE /api/contact/:id` - Delete a message

### Health Check
- `GET /api/health` - Check API health status

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Express middlewares
│   ├── models/
│   │   ├── Department.js
│   │   ├── Teacher.js
│   │   ├── Admission.js
│   │   ├── BlogPost.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── departments.js
│   │   ├── teachers.js
│   │   ├── admissions.js
│   │   ├── blog.js
│   │   └── contact.js
│   └── utils/
│       ├── validators.js   # Validation functions
│       └── errorHandler.js # Error handling
├── package.json
├── .env                    # Environment variables
└── README.md
```

## Database Models

### Department
- name (String, required, unique)
- description (String, required)
- image (String)
- headOfDepartment (Reference to Teacher)
- numberOfStudents (Number)
- numberOfTeachers (Number)
- isActive (Boolean)
- timestamps

### Teacher
- firstName, lastName (String, required)
- email (String, required, unique)
- phone (String)
- specialization (String, required)
- department (Reference to Department, required)
- bio (String)
- photo (String)
- qualifications (Array of objects)
- experience (Number)
- isActive (Boolean)
- timestamps

### Admission
- firstName, lastName (String, required)
- email (String, required)
- phone (String, required)
- dateOfBirth (Date, required)
- address (String, required)
- department (Reference to Department, required)
- qualifications (String, required)
- parentFullName (String)
- parentPhone (String)
- status (enum: pending, approved, rejected)
- documents (Array of objects)
- timestamps

### BlogPost
- title (String, required)
- slug (String, unique)
- excerpt (String)
- content (String, required)
- author (Reference to Teacher)
- category (enum: news, announcement, event, achievement, other)
- featured (Boolean)
- image (String)
- views (Number)
- isPublished (Boolean)
- tags (Array of Strings)
- timestamps

### Contact
- name (String, required)
- email (String, required)
- phone (String)
- subject (String, required)
- message (String, required)
- status (enum: new, read, resolved)
- response (String)
- respondedAt (Date)
- timestamps

## Future Enhancements

- [ ] Authentication and authorization
- [ ] File upload handling
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] Pagination
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit tests

## License

ISC
