export async function up(queryInterface) {
  const auditLogs = [
    { action_type: 'INSERT', action_details: 'Inserted user John Doe', table_name: 'users', record_id: 1, changed_by: 1, old_value: null, new_value: '{"username":"jdoe"}', changed_at: new Date('2022-01-01') },
    { action_type: 'INSERT', action_details: 'Inserted programme Computer Science', table_name: 'programmes', record_id: 1, changed_by: 1, old_value: null, new_value: '{"name":"computer science"}', changed_at: new Date('2022-01-01') },
    { action_type: 'INSERT', action_details: 'Inserted student Emma Brown', table_name: 'students', record_id: 1, changed_by: 1, old_value: null, new_value: '{"student_number":"2022000001"}', changed_at: new Date('2022-09-01') },
    { action_type: 'INSERT', action_details: 'Inserted classification for Emma Brown', table_name: 'classifications', record_id: 1, changed_by: 1, old_value: null, new_value: '{"final_average":86}', changed_at: new Date('2025-06-30') }
  ];

  await queryInterface.bulkInsert('audit_log', auditLogs, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('audit_log', null, {});
}