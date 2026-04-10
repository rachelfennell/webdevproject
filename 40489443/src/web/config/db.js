
//http://localhost/phpmyadmin
//cd C:\Users\rache\hedclass\40489443\src\web
//npx nodemon app.js

//Seeding order
//Users → Programmes → Modules → ProgrammeModules → UserProgrammes 
//→ Students → Results → Classifications → AuditLog

import { Sequelize } from 'sequelize';

// Sequelize connection using URI
const sequelize = new Sequelize('mysql://root:@localhost:3306/40489443', {
  logging: false, //don't want to see queries in console
    dialectOptions: {
    decimalNumbers: true //Dont need to parse floats of anything
  }
});

// Test the connection
(async () => {
  try {
await sequelize.authenticate();
    console.log('Sequelize: Connection established successfully.');
    await sequelize.sync();
    console.log('All tables synced successfully.');
  } catch (error) {
    console.error('Sequelize: Database error:', error);
  }
})();



export default sequelize;

