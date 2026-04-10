// seeder/seeding/seedProgramme.js
export async function up(queryInterface) {
  await queryInterface.bulkInsert('programmes', [
    {
      id: 1,
      name: 'computer science',
      programme_code: 'HE000001',
      degree_type: 'BSc',
      school: 'EEECS',
      y2_weight: 0.30,
      y3_weight: 0.70,
      resit_cap: 40,
      pass_mark: 40,
      active: true,
      date_created: new Date('2023-01-01')
    },
    {
      id: 2,
      name: 'software engineering',
      programme_code: 'HE000002',
      degree_type: 'BEng',
      school: 'EEECS',
      y2_weight: 0.30,
      y3_weight: 0.70,
      resit_cap: 40,
      pass_mark: 40,
      active: true,
      date_created: new Date('2023-01-01')
    },
    {
      id: 3,
      name: 'law',
      programme_code: 'HE000003',
      degree_type: 'LLB',
      school: 'Law',
      y2_weight: 0.40,
      y3_weight: 0.60,
      resit_cap: 55,
      pass_mark: 50,
      active: true,
      date_created: new Date('2023-01-01')
    },
    {
      id: 4,
      name: 'fine art',
      programme_code: 'HE000004',
      degree_type: 'BA',
      school: 'Arts',
      y2_weight: 0.50,
      y3_weight: 0.50,
      resit_cap: 40,
      pass_mark: 40,
      active: true,
      date_created: new Date('2023-01-01')
    }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('programmes', null, {});
}