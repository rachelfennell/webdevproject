// seeder/seeding/seedProgrammeModule.js
// Each programme has 9 modules — 3 per year level
// Each year totals exactly 120 credits
// Year structure: 1x40 credit module + 2x40 credit modules = 120 per year

export async function up(queryInterface) {
  await queryInterface.bulkInsert('programme_modules', [

    // ── Programme 1: BSc Computer Science ──
    // Year 1 (120 credits)
    { programme_id: 1, module_id: 1,  year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 1, module_id: 2,  year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 1, module_id: 10, year_level: '1', credits: 40, mandatory: true,  active: true },
    // Year 2 (120 credits)
    { programme_id: 1, module_id: 4,  year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 1, module_id: 5,  year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 1, module_id: 11, year_level: '2', credits: 40, mandatory: true,  active: true },
    // Year 3 (120 credits)
    { programme_id: 1, module_id: 7,  year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 1, module_id: 8,  year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 1, module_id: 12, year_level: '3', credits: 40, mandatory: false, active: true },

    // ── Programme 2: BEng Software Engineering ──
    // Year 1 (120 credits) — shares modules 1 and 2 with BSc CS
    { programme_id: 2, module_id: 1,  year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 2, module_id: 2,  year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 2, module_id: 13, year_level: '1', credits: 40, mandatory: true,  active: true },
    // Year 2 (120 credits)
    { programme_id: 2, module_id: 6,  year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 2, module_id: 5,  year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 2, module_id: 14, year_level: '2', credits: 40, mandatory: true,  active: true },
    // Year 3 (120 credits)
    { programme_id: 2, module_id: 7,  year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 2, module_id: 15, year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 2, module_id: 9,  year_level: '3', credits: 40, mandatory: false, active: true },

    // ── Programme 3: LLB Law (pass_mark: 50, resit_cap: 55) ──
    // Year 1 (120 credits)
    { programme_id: 3, module_id: 16, year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 3, module_id: 17, year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 3, module_id: 18, year_level: '1', credits: 40, mandatory: true,  active: true },
    // Year 2 (120 credits)
    { programme_id: 3, module_id: 19, year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 3, module_id: 20, year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 3, module_id: 23, year_level: '2', credits: 40, mandatory: true,  active: true },
    // Year 3 (120 credits)
    { programme_id: 3, module_id: 21, year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 3, module_id: 22, year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 3, module_id: 24, year_level: '3', credits: 40, mandatory: false, active: true },

    // ── Programme 4: BA Fine Art ──
    // Year 1 (120 credits)
    { programme_id: 4, module_id: 25, year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 4, module_id: 26, year_level: '1', credits: 40, mandatory: true,  active: true },
    { programme_id: 4, module_id: 27, year_level: '1', credits: 40, mandatory: true,  active: true },
    // Year 2 (120 credits)
    { programme_id: 4, module_id: 28, year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 4, module_id: 29, year_level: '2', credits: 40, mandatory: true,  active: true },
    { programme_id: 4, module_id: 32, year_level: '2', credits: 40, mandatory: false, active: true },
    // Year 3 (120 credits)
    { programme_id: 4, module_id: 30, year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 4, module_id: 31, year_level: '3', credits: 40, mandatory: true,  active: true },
    { programme_id: 4, module_id: 33, year_level: '3', credits: 40, mandatory: false, active: true }

  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('programme_modules', null, {});
}