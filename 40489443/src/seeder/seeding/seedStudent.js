export async function up(queryInterface) {
  const students = [
    { id: 1, student_number: '2022000001', first_name: 'Emma', last_name: 'Brown', dob: '2000-05-14', programme_id: 1, enrolled_date: new Date('2022-09-01'), graduation_year: 2025, active_student: true },
    { id: 2, student_number: '2022000002', first_name: 'Liam', last_name: 'Smith', dob: '1999-11-23', programme_id: 1, enrolled_date: new Date('2022-09-01'), graduation_year: 2025, active_student: true },
    { id: 3, student_number: '2021000003', first_name: 'Olivia', last_name: 'Johnson', dob: '2001-03-12', programme_id: 2, enrolled_date: new Date('2021-09-01'), graduation_year: 2024, active_student: true },
    { id: 4, student_number: '2021000004', first_name: 'Noah', last_name: 'Williams', dob: '2000-08-19', programme_id: 2, enrolled_date: new Date('2021-09-01'), graduation_year: 2024, active_student: true },
    { id: 5, student_number: '2023000005', first_name: 'Ava', last_name: 'Jones', dob: '2002-02-02', programme_id: 3, enrolled_date: new Date('2023-01-01'), graduation_year: 2026, active_student: true },
    { id: 6, student_number: '2023000006', first_name: 'Ethan', last_name: 'Garcia', dob: '2001-06-30', programme_id: 4, enrolled_date: new Date('2023-01-01'), graduation_year: 2026, active_student: true },
    { id: 7, student_number: '2023000007', first_name: 'Sophia', last_name: 'Martinez', dob: '2000-12-10', programme_id: 5, enrolled_date: new Date('2023-01-01'), graduation_year: 2026, active_student: true }
  ];

  await queryInterface.bulkInsert('students', students, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('students', null, {});
}