// seeder/seeding/seedResult.js
// Each student needs results for all 9 modules across 3 years
// Mix of outcomes: First, 2:1, 2:2, Third, fails, resits, not eligible
// Programme 3 has pass_mark: 50 so marks need to reflect that

export async function up(queryInterface) {
  await queryInterface.bulkInsert('results', [

    // ── Student 1 (BSc CS) — First Class Honours ──
    // Year 1
    { student_id: 1, module_id: 1,  mark: 75, year_level: '1', is_resit: false },
    { student_id: 1, module_id: 2,  mark: 72, year_level: '1', is_resit: false },
    { student_id: 1, module_id: 10, mark: 68, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 1, module_id: 4,  mark: 78, year_level: '2', is_resit: false },
    { student_id: 1, module_id: 5,  mark: 71, year_level: '2', is_resit: false },
    { student_id: 1, module_id: 11, mark: 74, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 1, module_id: 7,  mark: 82, year_level: '3', is_resit: false },
    { student_id: 1, module_id: 8,  mark: 76, year_level: '3', is_resit: false },
    { student_id: 1, module_id: 12, mark: 79, year_level: '3', is_resit: false },

    // ── Student 2 (BSc CS) — Upper Second (2:1) ──
    // Year 1
    { student_id: 2, module_id: 1,  mark: 65, year_level: '1', is_resit: false },
    { student_id: 2, module_id: 2,  mark: 62, year_level: '1', is_resit: false },
    { student_id: 2, module_id: 10, mark: 60, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 2, module_id: 4,  mark: 63, year_level: '2', is_resit: false },
    { student_id: 2, module_id: 5,  mark: 67, year_level: '2', is_resit: false },
    { student_id: 2, module_id: 11, mark: 61, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 2, module_id: 7,  mark: 65, year_level: '3', is_resit: false },
    { student_id: 2, module_id: 8,  mark: 68, year_level: '3', is_resit: false },
    { student_id: 2, module_id: 12, mark: 62, year_level: '3', is_resit: false },

    // ── Student 3 (BSc CS) — Lower Second (2:2) ──
    // Year 1
    { student_id: 3, module_id: 1,  mark: 55, year_level: '1', is_resit: false },
    { student_id: 3, module_id: 2,  mark: 52, year_level: '1', is_resit: false },
    { student_id: 3, module_id: 10, mark: 50, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 3, module_id: 4,  mark: 53, year_level: '2', is_resit: false },
    { student_id: 3, module_id: 5,  mark: 57, year_level: '2', is_resit: false },
    { student_id: 3, module_id: 11, mark: 51, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 3, module_id: 7,  mark: 55, year_level: '3', is_resit: false },
    { student_id: 3, module_id: 8,  mark: 58, year_level: '3', is_resit: false },
    { student_id: 3, module_id: 12, mark: 52, year_level: '3', is_resit: false },

    // ── Student 4 (BSc CS) — Resit in Y1, passes, gets Third Class ──
    // Year 1
    { student_id: 4, module_id: 1,  mark: 35, year_level: '1', is_resit: false },
    { student_id: 4, module_id: 1,  mark: 55, year_level: '1', is_resit: true  },
    { student_id: 4, module_id: 2,  mark: 42, year_level: '1', is_resit: false },
    { student_id: 4, module_id: 10, mark: 41, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 4, module_id: 4,  mark: 43, year_level: '2', is_resit: false },
    { student_id: 4, module_id: 5,  mark: 45, year_level: '2', is_resit: false },
    { student_id: 4, module_id: 11, mark: 41, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 4, module_id: 7,  mark: 45, year_level: '3', is_resit: false },
    { student_id: 4, module_id: 8,  mark: 42, year_level: '3', is_resit: false },
    { student_id: 4, module_id: 12, mark: 44, year_level: '3', is_resit: false },

    // ── Student 5 (BSc CS) — Not Eligible (Y1 fail, resit still fails) ──
    // Year 1
    { student_id: 5, module_id: 1,  mark: 30, year_level: '1', is_resit: false },
    { student_id: 5, module_id: 1,  mark: 35, year_level: '1', is_resit: true  },
    { student_id: 5, module_id: 2,  mark: 65, year_level: '1', is_resit: false },
    { student_id: 5, module_id: 10, mark: 70, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 5, module_id: 4,  mark: 72, year_level: '2', is_resit: false },
    { student_id: 5, module_id: 5,  mark: 68, year_level: '2', is_resit: false },
    { student_id: 5, module_id: 11, mark: 74, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 5, module_id: 7,  mark: 78, year_level: '3', is_resit: false },
    { student_id: 5, module_id: 8,  mark: 71, year_level: '3', is_resit: false },
    { student_id: 5, module_id: 12, mark: 75, year_level: '3', is_resit: false },

    // ── Student 6 (BEng SE) — First Class ──
    // Year 1
    { student_id: 6, module_id: 1,  mark: 80, year_level: '1', is_resit: false },
    { student_id: 6, module_id: 2,  mark: 77, year_level: '1', is_resit: false },
    { student_id: 6, module_id: 13, mark: 75, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 6, module_id: 6,  mark: 82, year_level: '2', is_resit: false },
    { student_id: 6, module_id: 5,  mark: 79, year_level: '2', is_resit: false },
    { student_id: 6, module_id: 14, mark: 76, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 6, module_id: 7,  mark: 85, year_level: '3', is_resit: false },
    { student_id: 6, module_id: 15, mark: 81, year_level: '3', is_resit: false },
    { student_id: 6, module_id: 9,  mark: 78, year_level: '3', is_resit: false },

    // ── Student 7 (BEng SE) — 2:1 ──
    // Year 1
    { student_id: 7, module_id: 1,  mark: 64, year_level: '1', is_resit: false },
    { student_id: 7, module_id: 2,  mark: 66, year_level: '1', is_resit: false },
    { student_id: 7, module_id: 13, mark: 61, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 7, module_id: 6,  mark: 65, year_level: '2', is_resit: false },
    { student_id: 7, module_id: 5,  mark: 62, year_level: '2', is_resit: false },
    { student_id: 7, module_id: 14, mark: 67, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 7, module_id: 7,  mark: 63, year_level: '3', is_resit: false },
    { student_id: 7, module_id: 15, mark: 68, year_level: '3', is_resit: false },
    { student_id: 7, module_id: 9,  mark: 64, year_level: '3', is_resit: false },

    // ── Student 8 (BEng SE) — 2:2 with resit in Y3 ──
    // Year 1
    { student_id: 8, module_id: 1,  mark: 54, year_level: '1', is_resit: false },
    { student_id: 8, module_id: 2,  mark: 56, year_level: '1', is_resit: false },
    { student_id: 8, module_id: 13, mark: 51, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 8, module_id: 6,  mark: 55, year_level: '2', is_resit: false },
    { student_id: 8, module_id: 5,  mark: 52, year_level: '2', is_resit: false },
    { student_id: 8, module_id: 14, mark: 57, year_level: '2', is_resit: false },
    // Year 3 — resit on module 7, resit mark 65 capped to 40
    { student_id: 8, module_id: 7,  mark: 32, year_level: '3', is_resit: false },
    { student_id: 8, module_id: 7,  mark: 65, year_level: '3', is_resit: true  },
    { student_id: 8, module_id: 15, mark: 55, year_level: '3', is_resit: false },
    { student_id: 8, module_id: 9,  mark: 52, year_level: '3', is_resit: false },

    // ── Student 9 (BEng SE) — Third Class ──
    // Year 1
    { student_id: 9, module_id: 1,  mark: 44, year_level: '1', is_resit: false },
    { student_id: 9, module_id: 2,  mark: 41, year_level: '1', is_resit: false },
    { student_id: 9, module_id: 13, mark: 43, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 9, module_id: 6,  mark: 42, year_level: '2', is_resit: false },
    { student_id: 9, module_id: 5,  mark: 45, year_level: '2', is_resit: false },
    { student_id: 9, module_id: 14, mark: 43, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 9, module_id: 7,  mark: 44, year_level: '3', is_resit: false },
    { student_id: 9, module_id: 15, mark: 41, year_level: '3', is_resit: false },
    { student_id: 9, module_id: 9,  mark: 43, year_level: '3', is_resit: false },

    // ── Student 10 (BEng SE) — Not Eligible (missing Y2 module) ──
    // Year 1
    { student_id: 10, module_id: 1,  mark: 70, year_level: '1', is_resit: false },
    { student_id: 10, module_id: 2,  mark: 68, year_level: '1', is_resit: false },
    { student_id: 10, module_id: 13, mark: 72, year_level: '1', is_resit: false },
    // Year 2 — only 2 modules entered, missing module 14 (credits only 80)
    { student_id: 10, module_id: 6,  mark: 71, year_level: '2', is_resit: false },
    { student_id: 10, module_id: 5,  mark: 69, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 10, module_id: 7,  mark: 75, year_level: '3', is_resit: false },
    { student_id: 10, module_id: 15, mark: 72, year_level: '3', is_resit: false },
    { student_id: 10, module_id: 9,  mark: 70, year_level: '3', is_resit: false },

    // ── Student 11 (LLB Law, pass_mark:50) — First Class ──
    // Year 1
    { student_id: 11, module_id: 16, mark: 78, year_level: '1', is_resit: false },
    { student_id: 11, module_id: 17, mark: 75, year_level: '1', is_resit: false },
    { student_id: 11, module_id: 18, mark: 72, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 11, module_id: 19, mark: 80, year_level: '2', is_resit: false },
    { student_id: 11, module_id: 20, mark: 76, year_level: '2', is_resit: false },
    { student_id: 11, module_id: 23, mark: 74, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 11, module_id: 21, mark: 82, year_level: '3', is_resit: false },
    { student_id: 11, module_id: 22, mark: 79, year_level: '3', is_resit: false },
    { student_id: 11, module_id: 24, mark: 77, year_level: '3', is_resit: false },

    // ── Student 12 (LLB Law) — 2:1 ──
    // Year 1
    { student_id: 12, module_id: 16, mark: 65, year_level: '1', is_resit: false },
    { student_id: 12, module_id: 17, mark: 62, year_level: '1', is_resit: false },
    { student_id: 12, module_id: 18, mark: 60, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 12, module_id: 19, mark: 63, year_level: '2', is_resit: false },
    { student_id: 12, module_id: 20, mark: 67, year_level: '2', is_resit: false },
    { student_id: 12, module_id: 23, mark: 61, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 12, module_id: 21, mark: 65, year_level: '3', is_resit: false },
    { student_id: 12, module_id: 22, mark: 68, year_level: '3', is_resit: false },
    { student_id: 12, module_id: 24, mark: 62, year_level: '3', is_resit: false },

    // ── Student 13 (LLB Law) — Not Eligible (below pass_mark of 50 in Y1) ──
    // Year 1 — mark of 45 is below pass_mark of 50
    { student_id: 13, module_id: 16, mark: 45, year_level: '1', is_resit: false },
    { student_id: 13, module_id: 16, mark: 52, year_level: '1', is_resit: true  },
    { student_id: 13, module_id: 17, mark: 68, year_level: '1', is_resit: false },
    { student_id: 13, module_id: 18, mark: 72, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 13, module_id: 19, mark: 71, year_level: '2', is_resit: false },
    { student_id: 13, module_id: 20, mark: 65, year_level: '2', is_resit: false },
    { student_id: 13, module_id: 23, mark: 69, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 13, module_id: 21, mark: 74, year_level: '3', is_resit: false },
    { student_id: 13, module_id: 22, mark: 70, year_level: '3', is_resit: false },
    { student_id: 13, module_id: 24, mark: 68, year_level: '3', is_resit: false },

    // ── Student 14 (LLB Law) — Third Class (just above 40 threshold) ──
    // Year 1
    { student_id: 14, module_id: 16, mark: 55, year_level: '1', is_resit: false },
    { student_id: 14, module_id: 17, mark: 52, year_level: '1', is_resit: false },
    { student_id: 14, module_id: 18, mark: 51, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 14, module_id: 19, mark: 44, year_level: '2', is_resit: false },
    { student_id: 14, module_id: 20, mark: 46, year_level: '2', is_resit: false },
    { student_id: 14, module_id: 23, mark: 43, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 14, module_id: 21, mark: 45, year_level: '3', is_resit: false },
    { student_id: 14, module_id: 22, mark: 42, year_level: '3', is_resit: false },
    { student_id: 14, module_id: 24, mark: 44, year_level: '3', is_resit: false },

    // ── Student 15 (LLB Law) — 2:2 with resit ──
    // Year 1
    { student_id: 15, module_id: 16, mark: 58, year_level: '1', is_resit: false },
    { student_id: 15, module_id: 17, mark: 55, year_level: '1', is_resit: false },
    { student_id: 15, module_id: 18, mark: 52, year_level: '1', is_resit: false },
    // Year 2 — resit on module 20, resit mark 60 capped to 55
    { student_id: 15, module_id: 19, mark: 56, year_level: '2', is_resit: false },
    { student_id: 15, module_id: 20, mark: 44, year_level: '2', is_resit: false },
    { student_id: 15, module_id: 20, mark: 60, year_level: '2', is_resit: true  },
    { student_id: 15, module_id: 23, mark: 57, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 15, module_id: 21, mark: 54, year_level: '3', is_resit: false },
    { student_id: 15, module_id: 22, mark: 58, year_level: '3', is_resit: false },
    { student_id: 15, module_id: 24, mark: 55, year_level: '3', is_resit: false },

    // ── Student 16 (BA Fine Art) — First Class ──
    // Year 1
    { student_id: 16, module_id: 25, mark: 76, year_level: '1', is_resit: false },
    { student_id: 16, module_id: 26, mark: 73, year_level: '1', is_resit: false },
    { student_id: 16, module_id: 27, mark: 71, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 16, module_id: 28, mark: 78, year_level: '2', is_resit: false },
    { student_id: 16, module_id: 29, mark: 75, year_level: '2', is_resit: false },
    { student_id: 16, module_id: 32, mark: 72, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 16, module_id: 30, mark: 80, year_level: '3', is_resit: false },
    { student_id: 16, module_id: 31, mark: 77, year_level: '3', is_resit: false },
    { student_id: 16, module_id: 33, mark: 74, year_level: '3', is_resit: false },

    // ── Student 17 (BA Fine Art) — 2:1 ──
    // Year 1
    { student_id: 17, module_id: 25, mark: 63, year_level: '1', is_resit: false },
    { student_id: 17, module_id: 26, mark: 66, year_level: '1', is_resit: false },
    { student_id: 17, module_id: 27, mark: 61, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 17, module_id: 28, mark: 65, year_level: '2', is_resit: false },
    { student_id: 17, module_id: 29, mark: 62, year_level: '2', is_resit: false },
    { student_id: 17, module_id: 32, mark: 67, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 17, module_id: 30, mark: 64, year_level: '3', is_resit: false },
    { student_id: 17, module_id: 31, mark: 68, year_level: '3', is_resit: false },
    { student_id: 17, module_id: 33, mark: 63, year_level: '3', is_resit: false },

    // ── Student 18 (BA Fine Art) — 2:2 ──
    // Year 1
    { student_id: 18, module_id: 25, mark: 53, year_level: '1', is_resit: false },
    { student_id: 18, module_id: 26, mark: 56, year_level: '1', is_resit: false },
    { student_id: 18, module_id: 27, mark: 51, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 18, module_id: 28, mark: 55, year_level: '2', is_resit: false },
    { student_id: 18, module_id: 29, mark: 52, year_level: '2', is_resit: false },
    { student_id: 18, module_id: 32, mark: 57, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 18, module_id: 30, mark: 54, year_level: '3', is_resit: false },
    { student_id: 18, module_id: 31, mark: 58, year_level: '3', is_resit: false },
    { student_id: 18, module_id: 33, mark: 52, year_level: '3', is_resit: false },

    // ── Student 19 (BA Fine Art) — Third Class ──
    // Year 1
    { student_id: 19, module_id: 25, mark: 43, year_level: '1', is_resit: false },
    { student_id: 19, module_id: 26, mark: 41, year_level: '1', is_resit: false },
    { student_id: 19, module_id: 27, mark: 44, year_level: '1', is_resit: false },
    // Year 2
    { student_id: 19, module_id: 28, mark: 42, year_level: '2', is_resit: false },
    { student_id: 19, module_id: 29, mark: 45, year_level: '2', is_resit: false },
    { student_id: 19, module_id: 32, mark: 43, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 19, module_id: 30, mark: 44, year_level: '3', is_resit: false },
    { student_id: 19, module_id: 31, mark: 41, year_level: '3', is_resit: false },
    { student_id: 19, module_id: 33, mark: 43, year_level: '3', is_resit: false },

    // ── Student 20 (BA Fine Art) — Not Eligible (Y2 fail) ──
    // Year 1
    { student_id: 20, module_id: 25, mark: 68, year_level: '1', is_resit: false },
    { student_id: 20, module_id: 26, mark: 72, year_level: '1', is_resit: false },
    { student_id: 20, module_id: 27, mark: 65, year_level: '1', is_resit: false },
    // Year 2 — fails module 28, resit also fails
    { student_id: 20, module_id: 28, mark: 28, year_level: '2', is_resit: false },
    { student_id: 20, module_id: 28, mark: 35, year_level: '2', is_resit: true  },
    { student_id: 20, module_id: 29, mark: 70, year_level: '2', is_resit: false },
    { student_id: 20, module_id: 32, mark: 68, year_level: '2', is_resit: false },
    // Year 3
    { student_id: 20, module_id: 30, mark: 74, year_level: '3', is_resit: false },
    { student_id: 20, module_id: 31, mark: 71, year_level: '3', is_resit: false },
    { student_id: 20, module_id: 33, mark: 69, year_level: '3', is_resit: false }

  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('results', null, {});
}