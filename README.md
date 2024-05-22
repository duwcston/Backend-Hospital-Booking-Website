# Hospital-Booking-Website
International University VNU - Web Application Development Project.  
This is the Backend for the [Hospital Booking System](https://github.com/duwcston/Frontend-Hospital-Booking-Website) project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
npm start
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## What I using in this project?
- Frontend: Reactjs + Redux.HTML/CSS-scss/Bootstrap4 (reactrap).
- Backend: Node.js (Express) + MySQL [(Sequelize)](https://sequelize.org/).
- MVC architecture.
- Using [bcyprt](https://www.npmjs.com/package/bcrypt) - a library to help hash user passwords.
- ORM
- Postman

## MVC Architecture
The Model-View-Controller [(MVC)](https://www.geeksforgeeks.org/mvc-framework-introduction/) architecture separates an application into three main components:
1. Model: Represents the data and business logic.
2. View: Handles the presentation and user interface.
3. Controller: Manages user input and communicates between the Model and View.

## ORM
Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm.
For example: to Insert a new user 
without ORM:
```bash
INSERT INTO table_name (column1, column2, column3, ...);
VALUES (value1, value2, value3, ...);
```
with ORM:
```bash
user.create()
```
