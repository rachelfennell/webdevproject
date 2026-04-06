export async function up(queryInterface) {
  const classifications = [
    { student_id: 1, classified_by: 1, y2_average: 82.0, y3_average: 88.0, final_average: 86.0, proposed_outcome: 'First Class Honours', final_outcome: 'First Class Honours', is_overridden: false, rationale: 'Excellent performance', classified_at: new Date('2025-06-30') },
    { student_id: 2, classified_by: 1, y2_average: 70.0, y3_average: 75.0, final_average: 73.0, proposed_outcome: 'Upper Second Class (2:1)', final_outcome: 'Upper Second Class (2:1)', is_overridden: false, rationale: 'Consistent grades', classified_at: new Date('2025-06-30') },
    { student_id: 3, classified_by: 2, y2_average: 85.5, y3_average: 88.0, final_average: 87.0, proposed_outcome: 'First Class Honours', final_outcome: 'First Class Honours', is_overridden: false, rationale: 'High achievement', classified_at: new Date('2024-06-30') },
    { student_id: 4, classified_by: 2, y2_average: 55.0, y3_average: 60.0, final_average: 58.0, proposed_outcome: 'Lower Second Class (2:2)', final_outcome: 'Lower Second Class (2:2)', is_overridden: false, rationale: 'Average performance', classified_at: new Date('2024-06-30') },
    { student_id: 5, classified_by: 1, y2_average: 68.0, y3_average: 72.0, final_average: 70.0, proposed_outcome: 'Upper Second Class (2:1)', final_outcome: 'Upper Second Class (2:1)', is_overridden: false, rationale: 'Good performance', classified_at: new Date('2026-06-30') }
  ];

  await queryInterface.bulkInsert('classifications', classifications, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('classifications', null, {});
}