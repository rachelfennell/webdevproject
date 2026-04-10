// seeder/seeding/seedStudent.js
export async function up(queryInterface) {
  await queryInterface.bulkInsert('students', [

    // Programme 1 — BSc Computer Science (5 students)
    { id: 1,  student_number: '4000000001', first_name: 'James',   last_name: 'Anderson', dob: '1999-03-15', programme_id: 1, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 2,  student_number: '4000000002', first_name: 'Sophie',  last_name: 'Clarke',   dob: '1999-07-22', programme_id: 1, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 3,  student_number: '4000000003', first_name: 'Liam',    last_name: 'Davies',   dob: '2000-01-10', programme_id: 1, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 4,  student_number: '4000000004', first_name: 'Emma',    last_name: 'Evans',    dob: '1999-11-05', programme_id: 1, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 5,  student_number: '4000000005', first_name: 'Noah',    last_name: 'Fletcher', dob: '2000-04-18', programme_id: 1, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },

    // Programme 2 — BEng Software Engineering (5 students)
    { id: 6,  student_number: '4000000006', first_name: 'Olivia',  last_name: 'Graham',   dob: '1999-06-30', programme_id: 2, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 7,  student_number: '4000000007', first_name: 'Harry',   last_name: 'Harris',   dob: '2000-02-14', programme_id: 2, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 8,  student_number: '4000000008', first_name: 'Isla',    last_name: 'Jackson',  dob: '1999-09-25', programme_id: 2, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 9,  student_number: '4000000009', first_name: 'Jack',    last_name: 'King',     dob: '2000-08-03', programme_id: 2, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 10, student_number: '4000000010', first_name: 'Amelia',  last_name: 'Lewis',    dob: '1999-12-20', programme_id: 2, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },

    // Programme 3 — LLB Law (5 students)
    { id: 11, student_number: '4000000011', first_name: 'George',  last_name: 'Martin',   dob: '1999-05-08', programme_id: 3, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 12, student_number: '4000000012', first_name: 'Freya',   last_name: 'Moore',    dob: '2000-03-17', programme_id: 3, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 13, student_number: '4000000013', first_name: 'Charlie', last_name: 'Parker',   dob: '1999-10-12', programme_id: 3, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 14, student_number: '4000000014', first_name: 'Grace',   last_name: 'Roberts',  dob: '2000-07-29', programme_id: 3, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 15, student_number: '4000000015', first_name: 'Oliver',  last_name: 'Scott',    dob: '1999-01-24', programme_id: 3, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },

    // Programme 4 — BA Fine Art (5 students)
    { id: 16, student_number: '4000000016', first_name: 'Poppy',   last_name: 'Taylor',   dob: '1999-08-11', programme_id: 4, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 17, student_number: '4000000017', first_name: 'Alfie',   last_name: 'Thomas',   dob: '2000-05-06', programme_id: 4, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 18, student_number: '4000000018', first_name: 'Lily',    last_name: 'Turner',   dob: '1999-04-23', programme_id: 4, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 19, student_number: '4000000019', first_name: 'Archie',  last_name: 'Walker',   dob: '2000-09-14', programme_id: 4, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true },
    { id: 20, student_number: '4000000020', first_name: 'Chloe',   last_name: 'White',    dob: '1999-02-28', programme_id: 4, enrolled_date: '2021-09-01', graduation_year: 2024, active_student: true }

  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('students', null, {});
}