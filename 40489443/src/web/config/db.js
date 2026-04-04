
//http://localhost/phpmyadmin
//nodemon app.js


import { Sequelize } from 'sequelize';

// Sequelize connection using URI
const sequelize = new Sequelize('mysql://root:@localhost:3306/40489443', {
  logging: false, //don't want to see queries in console
});

// Test the connection
(async () => {
  try {
await sequelize.authenticate();
    console.log('Sequelize: Connection established successfully.');
    await sequelize.sync({ alter: true });
    console.log('All tables synced successfully.');
  } catch (error) {
    console.error('Sequelize: Database error:', error);
  }
})();



export default sequelize;

