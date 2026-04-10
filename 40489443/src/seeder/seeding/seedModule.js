// seeder/seeding/seedModule.js
export async function up(queryInterface) {
  await queryInterface.bulkInsert('modules', [
    // Shared modules (used across programmes)
    { id: 1,  name: 'Introduction to Programming',     module_code: 'HEM000001', active: true },
    { id: 2,  name: 'Mathematics for Computing',       module_code: 'HEM000002', active: true },
    { id: 3,  name: 'Web Development Fundamentals',    module_code: 'HEM000003', active: true },
    { id: 4,  name: 'Data Structures and Algorithms',  module_code: 'HEM000004', active: true },
    { id: 5,  name: 'Database Systems',                module_code: 'HEM000005', active: true },
    { id: 6,  name: 'Software Engineering Principles', module_code: 'HEM000006', active: true },
    { id: 7,  name: 'Final Year Project',              module_code: 'HEM000007', active: true },
    { id: 8,  name: 'Artificial Intelligence',         module_code: 'HEM000008', active: true },
    { id: 9,  name: 'Computer Networks',               module_code: 'HEM000009', active: true },
    // BSc CS specific
    { id: 10, name: 'Operating Systems',               module_code: 'HEM000010', active: true },
    { id: 11, name: 'Computer Architecture',           module_code: 'HEM000011', active: true },
    { id: 12, name: 'Advanced Algorithms',             module_code: 'HEM000012', active: true },
    // BEng SE specific
    { id: 13, name: 'Systems Analysis and Design',     module_code: 'HEM000013', active: true },
    { id: 14, name: 'DevOps and Deployment',           module_code: 'HEM000014', active: true },
    { id: 15, name: 'Agile Development',               module_code: 'HEM000015', active: true },
    // Law specific
    { id: 16, name: 'Contract Law',                    module_code: 'HEM000016', active: true },
    { id: 17, name: 'Criminal Law',                    module_code: 'HEM000017', active: true },
    { id: 18, name: 'Constitutional Law',              module_code: 'HEM000018', active: true },
    { id: 19, name: 'Tort Law',                        module_code: 'HEM000019', active: true },
    { id: 20, name: 'Land Law',                        module_code: 'HEM000020', active: true },
    { id: 21, name: 'Equity and Trusts',               module_code: 'HEM000021', active: true },
    { id: 22, name: 'Legal Dissertation',              module_code: 'HEM000022', active: true },
    { id: 23, name: 'Commercial Law',                  module_code: 'HEM000023', active: true },
    { id: 24, name: 'International Law',               module_code: 'HEM000024', active: true },
    // Fine Art specific
    { id: 25, name: 'Drawing and Composition',         module_code: 'HEM000025', active: true },
    { id: 26, name: 'Art History',                     module_code: 'HEM000026', active: true },
    { id: 27, name: 'Digital Art',                     module_code: 'HEM000027', active: true },
    { id: 28, name: 'Sculpture and 3D',                module_code: 'HEM000028', active: true },
    { id: 29, name: 'Contemporary Art Practice',       module_code: 'HEM000029', active: true },
    { id: 30, name: 'Fine Art Dissertation',           module_code: 'HEM000030', active: true },
    { id: 31, name: 'Exhibition Design',               module_code: 'HEM000031', active: true },
    { id: 32, name: 'Photography',                     module_code: 'HEM000032', active: true },
    { id: 33, name: 'Printmaking',                     module_code: 'HEM000033', active: true }
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('modules', null, {});
}