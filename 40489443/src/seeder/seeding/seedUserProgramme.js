export async function up(queryInterface) {
  const userProgrammes = [
    { user_id: 1, programme_id: 1, assigned_date: new Date('2022-09-01'), active: true },
    { user_id: 1, programme_id: 2, assigned_date: new Date('2022-09-01'), active: true },
    { user_id: 1, programme_id: 3, assigned_date: new Date('2021-09-01'), active: true },
    { user_id: 1, programme_id: 4, assigned_date: new Date('2021-09-01'), active: true },
    { user_id: 3, programme_id: 5, assigned_date: new Date('2023-01-01'), active: true },
    { user_id: 3, programme_id: 6, assigned_date: new Date('2023-01-01'), active: true },
  ];

  await queryInterface.bulkInsert('user_programmes', userProgrammes, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('user_programmes', null, {});
}