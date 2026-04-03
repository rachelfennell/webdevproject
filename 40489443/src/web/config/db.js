/*import mysql from 'mysql2';

//http://localhost/phpmyadmin/

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',                 
    database: '40489443',  //  name of your database - student number
    port: '3306'                       
});

db.getConnection((err) => {
    if (err) return console.log("DB connection error:", err.message);
    console.log("Connected successfully to DB");
});

export default db;*/

import { Sequelize } from 'sequelize';

// Sequelize connection using URI
const sequelize = new Sequelize('mysql://root:@localhost:3306/40489443', {
  logging: false, //don't want to see queries in console
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize: Connection has been established successfully.');
  } catch (error) {
    console.error('Sequelize: Unable to connect to the database:', error);
  }
})();

export default sequelize;

