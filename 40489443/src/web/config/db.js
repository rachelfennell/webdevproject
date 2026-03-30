import mysql from 'mysql2';

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

export default db;