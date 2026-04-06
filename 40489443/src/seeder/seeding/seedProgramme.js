export async function up(queryInterface) {
  const programmes = [
    { id: 1, name: 'computer science', programme_code: 'HE000001', degree_type: 'BSc', school: 'EEECS', y2_weight: 0.3, y3_weight: 0.7, resit_cap: 40, active: true },
    { id: 2, name: 'law with criminology', programme_code: 'HE000002', degree_type: 'LLB', school: 'Law', y2_weight: 0.3, y3_weight: 0.7, resit_cap: 40, active: true },
    { id: 3, name: 'fine arts', programme_code: 'HE000003', degree_type: 'BA', school: 'Arts', y2_weight: 0.3, y3_weight: 0.7, resit_cap: 40, active: true },
    { id: 4, name: 'electrical engineering', programme_code: 'HE000004', degree_type: 'BEng', school: 'EEECS', y2_weight: 0.3, y3_weight: 0.7, resit_cap: 40, active: true },
    { id: 5, name: 'business law', programme_code: 'HE000005', degree_type: 'LLB', school: 'Law', y2_weight: 0.3, y3_weight: 0.7, resit_cap: 40, active: true },
    { id: 6, name: 'creative arts', programme_code: 'HE000006', degree_type: 'BA', school: 'Arts', y2_weight: 0.3, y3_weight: 0.7, resit_cap: 40, active: true }
  ];

  await queryInterface.bulkInsert('programmes', programmes, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('programmes', null, {});
}