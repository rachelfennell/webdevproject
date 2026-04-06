export async function up(queryInterface) {
  const modules = [
    { id: 1, name: 'Introduction to Programming', module_code: 'HEM000001', active: true },
    { id: 2, name: 'Data Structures and Algorithms', module_code: 'HEM000002', active: true },
    { id: 3, name: 'Software Engineering Project', module_code: 'HEM000003', active: true },
    { id: 4, name: 'Foundations of Law', module_code: 'HEM000004', active: true },
    { id: 5, name: 'Criminology and Society', module_code: 'HEM000005', active: true },
    { id: 6, name: 'Drawing and Painting', module_code: 'HEM000006', active: true },
    { id: 7, name: 'Sculpture Techniques', module_code: 'HEM000007', active: true },
    { id: 8, name: 'Circuits and Electronics', module_code: 'HEM000008', active: true },
    { id: 9, name: 'Electromagnetism', module_code: 'HEM000009', active: true },
    { id: 10, name: 'Business Law', module_code: 'HEM000010', active: true },
    { id: 11, name: 'Creative Arts Project', module_code: 'HEM000011', active: true }
  ];

  await queryInterface.bulkInsert('modules', modules, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('modules', null, {});
}