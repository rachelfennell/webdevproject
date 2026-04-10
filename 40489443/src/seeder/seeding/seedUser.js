// seeder/seeding/seedUser.js
import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  const password = await bcrypt.hash('password1234', 10);

  await queryInterface.bulkInsert('users', [
    {
      id: 1,
      username: 'asmith',
      password_hash: password,
      role: 'institutional_admin',
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'asmith@hedemo.co.uk',
      active: true,
      date_created: new Date('2023-01-01')
    },
    {
      id: 2,
      username: 'bjones',
      password_hash: password,
      role: 'institutional_admin',
      first_name: 'Bob',
      last_name: 'Jones',
      email: 'bjones@hedemo.co.uk',
      active: true,
      date_created: new Date('2023-01-01')
    },
    {
      id: 3,
      username: 'cmurphy',
      password_hash: password,
      role: 'academic_admin',
      first_name: 'Carol',
      last_name: 'Murphy',
      email: 'cmurphy@hedemo.co.uk',
      active: true,
      date_created: new Date('2023-01-01')
    },
    {
      id: 4,
      username: 'dwilson',
      password_hash: password,
      role: 'academic_admin',
      first_name: 'David',
      last_name: 'Wilson',
      email: 'dwilson@hedemo.co.uk',
      active: true,
      date_created: new Date('2023-01-01')
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('users', null, {});
}