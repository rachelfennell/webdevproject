import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  
  const users = [
    {
      id: 1,
      username: 'jdoe',
      password_hash: await bcrypt.hash('password1234', 10),
      role: 'academic_admin',
      first_name: 'John',
      last_name: 'Doe',
      email: 'jdoe@hedemo.co.uk',
      active: true,
      date_created: new Date('2022-01-01')
    },
    {
      id: 2,
      username: 'asmith',
      password_hash: await bcrypt.hash('password1234', 10),
      role: 'institutional_admin',
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'asmith@hedemo.co.uk',
      active: true,
      date_created: new Date('2022-01-02')
    },
    {
      id: 3,
      username: 'bwilson',
      password_hash: await bcrypt.hash('password1234', 10),
      role: 'academic_admin',
      first_name: 'Bob',
      last_name: 'Wilson',
      email: 'bwilson@hedemo.co.uk',
      active: true,
      date_created: new Date('2022-01-03')
    },
    {
      id: 4,
      username: 'cjones',
      password_hash: await bcrypt.hash('password1234', 10),
      role: 'institutional_admin',
      first_name: 'Carol',
      last_name: 'Jones',
      email: 'cjones@hedemo.co.uk',
      active: true,
      date_created: new Date('2022-01-04')
    }
  ];

  await queryInterface.bulkInsert('users', users, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('users', null, {});
}