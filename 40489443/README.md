Assignment for module CSC7062 Web development at Queen's University Belfast

- This README is for CSC7062: Web Development Assignment.
- It is an grade classification web application designed for the above module.
-The web app does not contain the node_modules folder.

***How to install & run the project***

Prerequisites: Node.js and MySQL

Run all of these commands in the terminal:

1. Clone the repository: 
- git clone https://gitlab.eeecs.qub.ac.uk/40489443/hedclass.git

2. Install dependencies:
- npm install (this will pull every dependency listed in package.json)
or
- npm install axios bcrypt ejs express express-rate-limit express-session mysql2 sequelize

3. Run this to create the database tables: 
- cd C:\Users\rache\hedclass\40489443\src\web 
then 
- npx nodemon app.js

4. Run the seeder file to populate the database tables: 
- cd C:\Users\rache\hedclass\40489443\src\seeder 
then 
- node seed.js

***NOTE***
- There are 2 projects here (the web application and the webAPI).
- Please run the correct script below for each project.

5. To start the web application:
- cd C:\Users\rache\hedclass\40489443\src\web 
then 
- npx nodemon app.js
- This runs on port 3000

Web Application URL:	http://localhost:3000

OR

5. To start the API: 
- cd C:\Users\rache\hedclass\40489443\src\web 
then 
- node api/server.js
- This runs on port 4000

API URL: 	http://localhost:4000

