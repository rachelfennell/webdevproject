//cd C:\Users\rache\hedclass\40489443\src\seeder
//node seed.js

//Import each Seeding File 
//Seeding order
//Users → Programmes → Modules → ProgrammeModules → UserProgrammes 
//→ Students → Results → Classifications → AuditLog

import { up as seedUsers } from './seeding/seedUser.js';
import { up as seedProgrammes } from './seeding/seedProgramme.js';
import { up as seedModules } from './seeding/seedModule.js';
import { up as seedProgrammeModules } from './seeding/seedProgrammeModule.js';
import { up as seedUserProgrammes } from './seeding/seedUserProgramme.js';
import { up as seedStudents } from './seeding/seedStudent.js';
import { up as seedResults } from './seeding/seedResult.js';
import { up as seedClassifications } from './seeding/seedClassification.js';
import { up as seedAuditLog } from './seeding/seedAuditLog.js';

import sequelize from '../web/config/db.js';
import '../seeder/models/index.js';

const runSeed = sequelize.getQueryInterface();

// Seeding
const seed = async () => {
  try {
    console.log('Seeding users');
    await seedUsers(runSeed);

    console.log('Seeding programmes');
    await seedProgrammes(runSeed);

    console.log('Seeding modules');
    await seedModules(runSeed);

    console.log('Seeding programme modules');
    await seedProgrammeModules(runSeed);

    console.log('Seeding user programmes');
    await seedUserProgrammes(runSeed);

    console.log('Seeding students');
    await seedStudents(runSeed);

    console.log('Seeding results');
    await seedResults(runSeed);

    console.log('Seeding classifications');
    await seedClassifications(runSeed);

    console.log('Seeding audit log');
    await seedAuditLog(runSeed);

    console.log('All data seeded successfully.');

  } catch (err) {
    console.error('Seeding failed:', err);
  }
};

seed();