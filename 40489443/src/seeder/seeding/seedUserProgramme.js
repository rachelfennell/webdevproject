// seeder/seeding/seedUserProgramme.js
export async function up(queryInterface) {
  await queryInterface.bulkInsert('user_programmes', [
    // Carol (id:3) assigned to programmes 1 and 2
    {
      user_id: 3,
      programme_id: 1,
      assigned_date: new Date('2023-01-15'),
      active: true
    },
    {
   
      user_id: 3,
      programme_id: 2,
      assigned_date: new Date('2023-01-15'),
      active: true
    },
    // David (id:4) assigned to programme 3 only
    {
 
      user_id: 4,
      programme_id: 3,
      assigned_date: new Date('2023-01-15'),
      active: true
    }
    // Programme 4 has no officer assigned
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('user_programmes', null, {});
}