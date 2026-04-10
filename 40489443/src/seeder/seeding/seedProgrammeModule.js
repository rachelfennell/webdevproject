export async function up(queryInterface) {
  const programmeModules = [
    { programme_id: 1, module_id: 1, year_level: '1', mandatory: true, credits: 15, active: true },
    { programme_id: 1, module_id: 2, year_level: '2', mandatory: true, credits: 15,  active: true },
    { programme_id: 1, module_id: 3, year_level: '3', mandatory: true, credits: 15,  active: true },
    { programme_id: 1, module_id: 8, year_level: '2', mandatory: false, credits: 10, active: true },
    { programme_id: 1, module_id: 9, year_level: '3', mandatory: false, credits: 10, active: true },

    { programme_id: 2, module_id: 4, year_level: '1', mandatory: true, credits: 15, active: true },
    { programme_id: 2, module_id: 5, year_level: '2', mandatory: true, credits: 15, active: true },
    { programme_id: 2, module_id: 10, year_level: '3', mandatory: true, credits: 15,active: true },

    { programme_id: 3, module_id: 6, year_level: '1', mandatory: true, credits: 15, active: true },
    { programme_id: 3, module_id: 7, year_level: '2', mandatory: true, credits: 15, active: true },
    { programme_id: 3, module_id: 11, year_level: '3', mandatory: true, credits: 15, active: true },

    { programme_id: 4, module_id: 8, year_level: '1', mandatory: true, credits: 15,active: true },
    { programme_id: 4, module_id: 9, year_level: '2', mandatory: true, credits: 15,active: true },

    { programme_id: 5, module_id: 10, year_level: '2', mandatory: true, credits: 15, active: true },

    { programme_id: 6, module_id: 11, year_level: '3', mandatory: true, credits: 15,active: true },
  ];

  await queryInterface.bulkInsert('programme_modules', programmeModules, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('programme_modules', null, {});
}