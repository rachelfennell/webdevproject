export async function up(queryInterface) {
  const results = [
    { student_id: 1, module_id: 1, mark: 78.5, year_level: '1', is_resit: false },
    { student_id: 1, module_id: 2, mark: 82.0, year_level: '2', is_resit: false },
    { student_id: 1, module_id: 3, mark: 88.0, year_level: '3', is_resit: false },
    { student_id: 2, module_id: 1, mark: 65.5, year_level: '1', is_resit: false },
    { student_id: 2, module_id: 2, mark: 70.0, year_level: '2', is_resit: false },
    { student_id: 3, module_id: 4, mark: 90.0, year_level: '1', is_resit: false },
    { student_id: 3, module_id: 5, mark: 85.5, year_level: '2', is_resit: false },
    { student_id: 4, module_id: 4, mark: 55.0, year_level: '1', is_resit: false },
    { student_id: 5, module_id: 6, mark: 72.0, year_level: '1', is_resit: false },
    { student_id: 5, module_id: 7, mark: 68.0, year_level: '2', is_resit: false }
  ];

  await queryInterface.bulkInsert('results', results, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('results', null, {});
}