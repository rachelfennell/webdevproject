import express from 'express';
import { Student, Programme, Classification, Module, Result, User, UserProgramme, ProgrammeModule,   } from '../../seeder/models/index.js';

const server = express();
const PORT = 4000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));



// GET all students
// http://localhost:4000/students
server.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll({
      include: { model: Programme, attributes: ['name', 'programme_code', 'degree_type'] }
    });
    res.json({ count: students.length, students });

    if (!students) return res.status(404).json({ error: 'Students not found' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET one student
// http://localhost:4000/students/(number 1-20)
server.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        { model: Programme, attributes: ['name', 'programme_code', 'degree_type'] },
        { model: Result, include: { model: Module, attributes: ['name', 'module_code'] } },
        { model: Classification }
      ]
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    res.json({ student });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all programmes
//http://localhost:4000/programmes
server.get('/programmes', async (req, res) => {
  try {
    const programmes = await Programme.findAll();

    res.json({ count: programmes.length, programmes });

    if (!programmes) return res.status(404).json({ error: 'Programmes not found' });

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
});

//GET one program
// http://localhost:4000/programmes/(number 1-4)
server.get('/programmes/:id', async (req, res) => {
  try {
    const programme = await Programme.findByPk(req.params.id, {
      include: {
        model: Module,
        through: { attributes: ['year_level', 'credits', 'mandatory', 'active'] }
      }
    });

    if (!programme) return res.status(404).json({ error: 'Programs not found' });
    res.json({ programme });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all student classifications
// http://localhost:4000/classifications  (only shows those that have been run on website so far!)
server.get('/classifications', async (req, res) => {
  try {

    const classifications = await Classification.findAll({
      include: {
        model: Student,
        attributes: ['first_name', 'last_name', 'student_number']
      }
    });

    res.json({ count: classifications.length, classifications });

    if (!classifications) return res.status(404).json({ error: 'Classifications not found' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Server Running
server.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

//cd C:\Users\rache\hedclass\40489443\src\web
//node api/server.js