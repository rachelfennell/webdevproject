
import { User, UserProgramme, Programme, ProgrammeModule, Student, Result, Module, Classification } from '../../seeder/models/index.js';
import sequelize from '../config/db.js';
import { Op } from 'sequelize';

// Main Dashboard
export const dashboard = async (req, res) => {
  try { 
  const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      } });

 res.render('academic/dashboard', {
      user: req.session.user,
      programmes: userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });
  } catch (err) {
    console.error(err);
    res.render('dashboard', { message: 'An error occurred while loading your programmes.' });
  }
};

// View Full Student List
export const studentList = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      attributes: ['programme_id']
    });

    const assignedProgrammeIds = userProgrammes.map(up => up.programme_id);

    const allStudents = await Student.findAll({
      where: { active_student: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code']
      },
      order: [['last_name', 'ASC']]
    });

    const inactiveStudents = await Student.findAll({
      where: { active_student: false },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code']
      },
      order: [['last_name', 'ASC']]
    });


    const assignedStudents = allStudents.filter(s => assignedProgrammeIds.includes(s.programme_id));
    const unassignedStudents = allStudents.filter(s => !assignedProgrammeIds.includes(s.programme_id));

    res.render('academic/studentList', {
      user: req.session.user,
      inactiveStudents,
      assignedStudents,
      unassignedStudents,
      message: allStudents.length === 0 ? 'No students are currently enrolled.' : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load student list' });
  }
};

// View Student PRofile PAge
export const viewStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: [
        { 
          model: Programme, 
          attributes: ['name', 'programme_code', 'degree_type', 'school'] 
        },
        {
          model: Result,
          include: {
            model: Module,
            attributes: ['name', 'module_code']
          }
        },
        { model: Classification }
      ]
    });

    if (!student) return res.render('error', { message: 'Student not found' });

    res.render('academic/studentProfile', {
      user: req.session.user,
      student
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load student profile' });
  }
};

// Edit Existing Student Page
export const getEditStudentPage = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code']
      }
    });

    if (!student) {
      return res.render('error', { message: 'Student not found' });
    }

    const userId = req.session.user.id;
    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code']
      }
    });

    res.render('academic/editStudent', {
      user: req.session.user,
      student,
      programmes: userProgrammes
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit student page' });
  }
};

export const postEditStudentPage = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { student_number, first_name, last_name, dob, programme_id, enrolled_date, graduation_year, active_student } = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.render('error', { message: 'Student not found' });
    }

    student.student_number = student_number;
    student.first_name = first_name;
    student.last_name = last_name;
    student.dob = dob;
    student.programme_id = programme_id;
    student.enrolled_date = enrolled_date;
    student.graduation_year = graduation_year;
    student.active_student = active_student === 'on';

    await student.save();

    return res.redirect(`/academic/studentProfile/${studentId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to update student' });
  }
};

// Deactivate A Student Profile
export const deactivateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.render('error', { message: 'Student not found' });
    }

    student.active_student = false;
    await student.save();

    return res.redirect('/academic/studentList');

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to deactivate student' });
  }
};



























// Programme Dashboard
export const programmeDashboard = async (req, res) => {
  try {
    const programmeId = req.params.id;

    const programme = await Programme.findByPk(programmeId, {
      include: {
        model: Module,
        through: {
          attributes: ['year_level', 'mandatory', 'credits', 'active']
        }
      }
    });

    if (!programme) {
      return res.render('error', { message: 'Programme not found' });
    }

    const students = await Student.findAll({
      where: { programme_id: programmeId, active_student: true }
    });

    res.render('academic/programmeDashboard', {
      user: req.session.user,
      programme,
      students
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load programme dashboard' });
  }
};

// Academic Admin Edit Programme Page
export const getEditProgrammePage = async (req, res) => {
  try {
    const programmeId = req.params.id;

    const programme = await Programme.findByPk(programmeId, {
      include: {
        model: Module,
        through: {
          attributes: ['year_level', 'mandatory', 'credits', 'active'],
          where: { active: true }
        }
      }
    });

    if (!programme) return res.render('error', { message: 'Programme not found' });

    const activeModules = await Module.findAll({
      where: { active: true },
      include: {
        model: Programme,
        where: { id: { [Op.ne]: programmeId } },
        required: false
      }
    });

    res.render('academic/editProgramme', {
      user: req.session.user,
      programme,
      activeModules
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit programme page' });
  }
};

export const postEditProgrammePage = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { name, programme_code, degree_type, school, y2_weight, y3_weight, resit_cap, active } = req.body;

    const programme = await Programme.findByPk(programmeId);

    if (!programme) return res.render('error', { message: 'Programme not found' });

    programme.name = name;
    programme.programme_code = programme_code;
    programme.degree_type = degree_type;
    programme.school = school;
    programme.y2_weight = y2_weight;
    programme.y3_weight = y3_weight;
    programme.resit_cap = resit_cap;
    programme.active = active === 'on';

    await programme.save();

    return res.redirect(`/academic/programmeDashboard/${programmeId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to update programme' });
  }
};

// Assign Module to Programme
export const assignModule = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { moduleId, year_level, mandatory, credits } = req.body;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.status(404).render('error', { message: 'Programme not found.' });

    const module = await Module.findByPk(moduleId);
    if (!module) return res.status(404).render('error', { message: 'Module not found.' });

    await ProgrammeModule.create({
      programme_id: programmeId,
      module_id: moduleId,
      year_level,
      mandatory,
      credits,
      active: true
    });

    return res.redirect(`/academic/editProgramme/${programmeId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error assigning module to programme' });
  }
};

// Remove Module from Programme
export const removeModule = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { moduleId } = req.body;

    const programmeModule = await ProgrammeModule.findOne({
      where: {
        programme_id: programmeId,
        module_id: moduleId
      }
    });

    if (!programmeModule) {
      return res.status(404).render('error', { message: 'Module not found for this programme.' });
    }

    programmeModule.active = false;
    await programmeModule.save();

    res.redirect(`/academic/programmeDashboard/${programmeId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error removing module from programme' });
  }
};

