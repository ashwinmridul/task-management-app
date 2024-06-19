# Task Management Application

This is a full-stack task management application built using React, Node.js, and PostgreSQL. The application allows users to create, update, and delete tasks, as well as view a list of tasks and filter them by status.

# Assumptions

* The application assumes that the user has a basic understanding of task management concepts.
* The application implements user authentication and authorization.
* The application uses a simple filtering mechanism to filter tasks by status.
* The application uses a text search which filters the tasks' title matching with search text. There is no highlighting done in the assignment.
* The applications uses a sort by title or due date mechanism. Sorting will be done only in ascending order in the assignment.

# Node versions

* `node`: 18.20.2
* `npm`: 10.5.0

# Setup and Run

To set up and run the application, follow these steps:

* Clone the repository using git clone https://github.com/ashwinmridul/task-management-app.git
* Install the dependencies using `npm install` in both the client and server directories
* PostgreSQL is hosted on a free cloud service.
* Start the Node.js server using `npm start` in the `server` directory
* Start the React application using `npm start` in the `client` directory
* Open the application in a web browser using http://localhost:3000

# Database

The application uses a PostgreSQL database to store task data. The database has a table called tasks, which has the following fields:

* `title`: String
* `description`: String
* `status`: String (e.g., "To Do," "In Progress," "Done")
* `user_id`: id of the owner
* `due_date`: Date

It also has a table called users to store user information, which has the following fields:

* `name`: String
* `email`: String
* `password`: String

# API Endpoints

The application provides the following API endpoints:

* `POST /tasks`: Create a new task
* `GET /tasks`: Retrieve a list of tasks
* `GET /tasks/:id`: Retrieve a single task by ID
* `PUT /tasks/:id`: Update a task
* `DELETE /tasks/:id`: Delete a task

# Testing

Unit tests are written for critical parts of the application, including API endpoints and data validation. The tests are written using Jest and Enzyme.

# Security

Security measures are implemented to protect the application from common vulnerabilities, including input validation and error handling.
The application uses JWT for authentication and authorization and bcrypt to store passwords securely.

# Bonus Features

The application implement bonus features, such as user authentication and authorization, task due dates and reminders, task sorting and searching capabilities, user profiles with avatars.

# License

This application is licensed under ISC.