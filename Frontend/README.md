# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.'



# Employee Attendance Management System

##  Project Overview

The Employee Attendance Management System is a full-stack web application designed to manage employee information and track daily employee attendance.

The system provides authentication, employee management, attendance management, attendance summaries, and dashboard statistics.

---

##  Features

### Authentication

* User Login
* Username and Password Authentication
* Protected API Routes

### Employee Management

* Add Employee
* Edit Employee
* Delete Employee
* View Employee Details
* Search Employees
* Active / Inactive Employee Status

### Attendance Management

* Mark Attendance
* View Attendance Records
* Edit Attendance
* Delete Attendance
* Search Attendance Records
* Filter Attendance by Status
* Attendance Summary
* Employee-wise Attendance History

### Dashboard

* Total Employees
* Active Employees
* Inactive Employees
* Present Attendance
* Absent Attendance
* Late Attendance
* Leave Attendance
* Department-wise Employee Count

---

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTL5
* CSS3
* Axios

### Backend

* Python
* Flask
* Flask-CORS
* REST API

### Database

* MySQL

### Development Tools

* Visual Studio Code
* MySQL Workbench
* Git
* GitHub

---

## Project Structure

```text
attendance-management-system/
│
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── attendance_system.sql
│
├── README.md
│
└── .gitignore
```

---

## Database Setup

### Step 1: Open MySQL

Open MySQL Workbench or MySQL Command Line.

### Step 2: Create the Database

Run:

```sql
CREATE DATABASE attendance_system;
```

### Step 3: Select the Database

```sql
USE attendance_system;
```

### Step 4: Import Database Script

Run the SQL file:

```text
database/attendance_system.sql
```

The database contains the following main tables:

* users
* employees
* attendance

The `attendance` table is connected to the `employees` table using a foreign key.

---

## Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Configure the MySQL database connection in the backend:

```python
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "YOUR_MYSQL_PASSWORD",
    "database": "attendance_system"
}
```

Replace:

```text
YOUR_MYSQL_PASSWORD
```

with your MySQL password.

Run the Flask backend:

```bash
python app.py
```

The backend API will run on:

```text
http://127.0.0.1:5000
```

---

##  Frontend Setup

Open another terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## Login

Use the login credentials configured in the database or authentication system.

Example:

```text
Username: admin
Password: admin123
```

> Note: The actual login credentials depend on the authentication implementation used in the project.

---

## API Endpoints

### Authentication

```text
POST /api/auth/login
```

### Employee APIs

```text
GET    /api/employees
POST   /api/employees
GET    /api/employees/<id>
PUT    /api/employees/<id>
DELETE /api/employees/<id>
```

### Attendance APIs

```text
GET    /api/attendance
POST   /api/attendance
PUT    /api/attendance/<id>
DELETE /api/attendance/<id>
GET    /api/attendance/summary
GET    /api/attendance/employee/<employee_id>
```

### Dashboard API

```text
GET /api/dashboard/stats
```

---

##  How the System Works

1. User logs into the application.
2. The frontend sends the login request to the Flask backend.
3. The backend validates the user.
4. Employees can be added and managed through the Employee Management module.
5. Attendance can be marked for each employee.
6. Attendance records are stored in MySQL.
7. The Attendance module retrieves and displays attendance records.
8. The dashboard retrieves employee and attendance statistics from the database.
9. Users can search and filter employees and attendance records.

---

## Testing

The following functionalities should be tested:

* User Login
* Add Employee
* Edit Employee
* Delete Employee
* Search Employee
* Mark Attendance
* Edit Attendance
* Delete Attendance
* Attendance Summary
* Employee-wise Attendance History
* Dashboard Statistics
* Search and Filter

---

## Screenshots

Add project screenshots here:

```text
screenshots/
├── login.png
├── dashboard.png
├── employees.png
├── add-employee.png
├── attendance.png
└── attendance-summary.png
```

---

## Future Enhancements

* JWT Authentication
* Role-Based Access Control
* Pagination
* Advanced Search and Filtering
* Sorting
* CSV / Excel Attendance Export
* Swagger / OpenAPI Documentation
* Unit Testing
* Docker Setup
* Cloud Deployment

---

##  Author

**Vetrivel K**

BE Computer Science and Engineering

---

##  License

This project was developed for educational and project demonstration purposes.

