
import { User, UserProgramme, Programme, ProgrammeModule, Student, Result, Module, Classification } from '../../seeder/models/index.js';
import sequelize from '../config/db.js';
import { Op } from 'sequelize';
import { classifyStudent } from '../utils/classificationEngine.js';

//Method to calculate students overall mark
const getOverallMark = (moduleId, results, resitCap) => {
  const original = results.find(r => r.module_id === moduleId && r.is_resit === false);
  const resit = results.find(r => r.module_id === moduleId && r.is_resit === true);
  if (resit) return Math.min(resit.mark, resitCap);
  if (original) return original.mark;
  return null;
};


// Main Dashboard
export const dashboard = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

    res.render('academic/dashboard', {
      user: req.session.user,
      programmes: userProgrammes,
      userProgrammes,
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
      attributes: ['programme_id'],
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

    const assignedProgrammeIds = userProgrammes.map(up => up.programme_id);

    const allStudents = await Student.findAll({
      where: { active_student: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code']
      },
      order: [['student_number', 'ASC']]
    });

    const inactiveStudents = await Student.findAll({
      where: { active_student: false },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code']
      },
      order: [['student_number', 'ASC']]
    });


    const assignedStudents = allStudents.filter(s => assignedProgrammeIds.includes(s.programme_id));
    const unassignedStudents = allStudents.filter(s => !assignedProgrammeIds.includes(s.programme_id));

    res.render('academic/studentList', {
      user: req.session.user,
      inactiveStudents,
      assignedStudents,
      unassignedStudents,
      message: allStudents.length === 0 ? 'No students are currently enrolled.' : null,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load student list' });
  }
};

// View Student PRofile PAge
export const viewStudentProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school'],
      }
    });



    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: [
        {
          model: Programme,
          attributes: ['name', 'programme_code', 'degree_type', 'school'],
          include: {
            model: Module,
            through: {
              attributes: ['credits', 'year_level', 'mandatory', 'active']
            }
          }
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

    student.Results.forEach(r => {
      const pm = student.Programme.Modules.find(m => m.id === r.module_id);
      r.Module.credits = pm ? pm.ProgrammeModule.credits : 0;
    });


    if (!student) return res.render('error', { message: 'Student not found' });

    res.render('academic/studentProfile', {
      user: req.session.user,
      student,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
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
      programmes: userProgrammes,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
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

    let errorMessage = 'Something went wrong';

    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors[0].message;
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      errorMessage = err.errors[0].message;
    } else if (err.message) {
      errorMessage = err.message;
    }
  }
};

// Deactivate A Student Profile
export const deactivateStudent = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

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

// Reactivate a Student Again
export const reactivateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);
    if (!student) return res.render('error', { message: 'Student not found' });

    student.active_student = true;
    await student.save();

    return res.redirect(`/academic/studentProfile/${studentId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to reactivate student' });
  }
};



// Programme Dashboard
export const programmeDashboard = async (req, res) => {
  try {

    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

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
      where: { programme_id: programmeId, active_student: true },
      include: [
        { model: Result },
        { model: Classification }
      ]
    });

    res.render('academic/programmeDashboard', {
      user: req.session.user,
      programme,
      students,
      getOverallMark,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load programme dashboard' });
  }
};

// Academic Admin Edit Programme Page
export const getEditProgrammePage = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

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
      activeModules,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit programme page' });
  }
};

export const postEditProgrammePage = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { name, programme_code, degree_type, school, y2_weight, y3_weight, resit_cap, pass_mark, active } = req.body;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found' });

    // Programme code must be unique
    const existingCode = await Programme.findOne({
      where: {
        programme_code,
        id: { [Op.ne]: programmeId }
      }
    });

    if (existingCode) {
      return res.render('error', { message: 'This programme code is already in use by another programme' });
    }

    // Weights together must equal 1
    const y2 = parseFloat(y2_weight);
    const y3 = parseFloat(y3_weight);

    if (Math.abs(y2 + y3 - 1.0) > 0.001) {
      return res.render('error', { message: 'Year 2 and Year 3 weights must add up to 1.0 (e.g. 0.30 and 0.70)' });
    }

    // Cannot inactivate if has active students
    if (active !== 'on') {
      const activeStudents = await Student.findOne({
        where: { programme_id: programmeId, active_student: true }
      });

      if (activeStudents) {
        return res.render('error', { message: 'This programme cannot be deactivated as it has active students enrolled. Please deactivate all students first.' });
      }
    }

    programme.name = name;
    programme.programme_code = programme_code;
    programme.degree_type = degree_type;
    programme.school = school;
    programme.y2_weight = y2_weight;
    programme.y3_weight = y3_weight;
    programme.resit_cap = resit_cap;
    programme.pass_mark = pass_mark;
    programme.active = active === 'on';

    await programme.save();

    return res.redirect(`/academic/programmeDashboard/${programmeId}`);

  } catch (err) {
    console.error(err);

    let errorMessage = 'Something went wrong';

    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors[0].message;
    }
    else if (err.name === 'SequelizeUniqueConstraintError') {
      errorMessage = err.errors[0].message;
    }
    else if (err.message) {
      errorMessage = err.message;
    }

    const programme = await Programme.findByPk(req.params.id, {
      include: {
        model: Module,
        through: {
          attributes: ['year_level', 'mandatory', 'credits', 'active'],
          where: { active: true }
        }
      }
    });

    const activeModules = await Module.findAll({
      where: { active: true },
      include: {
        model: Programme,
        where: { id: { [Op.ne]: req.params.id } },
        required: false
      }
    });

    const userId = req.session.user.id;
    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

    return res.status(400).render('academic/editProgramme', {
      user: req.session.user,
      programme,
      activeModules,
      userProgrammes,
      error: errorMessage
    });
  }
};

// Assign Module to Programme
export const assignModule = async (req, res) => {
  try {
    const programmeId = req.params.id;
    const { moduleId, year_level, mandatory, credits } = req.body;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found.' });

    const module = await Module.findByPk(moduleId);
    if (!module) return res.render('error', { message: 'Module not found.' });

    // Cannot assign a module already assigned to this programme
    const existingModule = await ProgrammeModule.findOne({
      where: {
        programme_id: programmeId,
        module_id: moduleId
      }
    });

    if (existingModule) {
      if (existingModule.active) {
        return res.render('error', { message: 'This module is already assigned to this programme.' });
      } else {
        // Reactivate if previously removed
        existingModule.active = true;
        existingModule.year_level = year_level;
        existingModule.mandatory = mandatory;
        existingModule.credits = credits;
        await existingModule.save();
        return res.redirect(`/academic/editProgramme/${programmeId}`);
      }
    }

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
    res.status(500).render('error', { message: 'Error removing module from programme' });
  }
};







// View All Students Assigned to a Programme
export const programmeStudentList = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });
    const programmeId = req.params.id;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found' });

    const students = await Student.findAll({
      where: { programme_id: programmeId },
      order: [['last_name', 'ASC']]
    });

    const activeStudents = students.filter(s => s.active_student);
    const inactiveStudents = students.filter(s => !s.active_student);

    res.render('academic/programmeStudentList', {
      user: req.session.user,
      programme,
      activeStudents,
      inactiveStudents,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load programme student list' });
  }
};

// View All Students Results for a Module
export const viewModuleResults = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

    const programmeId = req.params.programmeId;
    const moduleId = req.params.moduleId;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found' });

    const module = await Module.findByPk(moduleId);
    if (!module) return res.render('error', { message: 'Module not found' });

    const programmeModule = await ProgrammeModule.findOne({
      where: { programme_id: programmeId, module_id: moduleId }
    });

    const students = await Student.findAll({
      where: { programme_id: programmeId, active_student: true },
      order: [['last_name', 'ASC']]
    });


    const originalResults = await Result.findAll({
      where: { module_id: moduleId, is_resit: false }
    });

    const resitResults = await Result.findAll({
      where: { module_id: moduleId, is_resit: true }
    });

    res.render('academic/moduleResults', {
      user: req.session.user,
      programme,
      module,
      programmeModule,
      students,
      originalResults,
      resitResults,
      getOverallMark,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load module results' });
  }
};

// Add/Edit Students Results for a Module Page
export const getEditResultsPage = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: { model: Programme }
    });

    if (!student) return res.render('error', { message: 'Student not found' });

    const programmeModules = await ProgrammeModule.findAll({
      where: { programme_id: student.programme_id, active: true },
      include: { model: Module, attributes: ['id', 'name', 'module_code'] }
    });

    const results = await Result.findAll({
      where: { student_id: studentId }
    });

    res.render('academic/editResults', {
      user: req.session.user,
      student,
      programmeModules,
      results,
      from: req.query.from || `/academic/studentProfile/${studentId}`,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load edit results page' });
  }
};

// Post Edit Results Page
export const postEditResultsPage = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { module_id, year_level, original_mark, resit_mark } = req.body;

    if (original_mark !== '') {
      const existingOriginal = await Result.findOne({
        where: { student_id: studentId, module_id, is_resit: false }
      });

      if (existingOriginal) {
        existingOriginal.mark = original_mark;
        existingOriginal.year_level = year_level;
        await existingOriginal.save();
      } else {
        await Result.create({
          student_id: studentId,
          module_id,
          mark: original_mark,
          year_level,
          is_resit: false
        });
      }
    }

    if (resit_mark !== '') {
      const existingResit = await Result.findOne({
        where: { student_id: studentId, module_id, is_resit: true }
      });

      if (existingResit) {
        existingResit.mark = resit_mark;
        existingResit.year_level = year_level;
        await existingResit.save();
      } else {
        await Result.create({
          student_id: studentId,
          module_id,
          mark: resit_mark,
          year_level,
          is_resit: true
        });
      }
    }

    return res.redirect(`/academic/editResults/${studentId}?from=${req.query.from || `/academic/studentProfile/${studentId}`}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to save results' });
  }
};

// Students Degree Classification Page
export const getClassificationPage = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: [
        { model: Programme },
        {
          model: Result,
          include: { model: Module, attributes: ['id', 'name', 'module_code'] }
        },
        { model: Classification }
      ]
    });

    if (!student) return res.render('error', { message: 'Student not found' });

    const programmeModules = await ProgrammeModule.findAll({
      where: { programme_id: student.programme_id, active: true }
    });

    student.Results.forEach(r => {
      const pm = programmeModules.find(pm => pm.module_id === r.module_id);
      r.Module.credits = pm ? pm.credits : 0;
    });

    res.render('academic/studentClassification', {
      user: req.session.user,
      student,
      classification: student.Classification || null,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load classification page' });
  }
};

export const postClassificationPage = async (req, res) => {
  try {
    console.log('postClassificationPage hit', req.params.id);
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, {
      include: [
        { model: Programme },
        {
          model: Result,
          include: { model: Module, attributes: ['id', 'name', 'module_code'] }
        }
      ]
    });

    if (!student) return res.render('error', { message: 'Student not found' });

    const programmeModules = await ProgrammeModule.findAll({
      where: { programme_id: student.programme_id, active: true }
    });

    student.Results.forEach(r => {
      const pm = programmeModules.find(pm => pm.module_id === r.module_id);
      r.Module.credits = pm ? pm.credits : 0;
    });

    const result = classifyStudent(student.Results, student.Programme);
    const autoFlag = !result.eligible || result.proposed_outcome === 'Fail';

    const classification = await Classification.findOne({ where: { student_id: studentId } });



    if (classification) {
      classification.y2_average = result.eligible ? result.y2_average : null;
      classification.y3_average = result.eligible ? result.y3_average : null;
      classification.final_average = result.eligible ? result.final_average : null;
      classification.proposed_outcome = result.eligible ? result.proposed_outcome : 'Not Eligible';
      classification.final_outcome = result.eligible ? result.proposed_outcome : 'Not Eligible';
      classification.classified_by = req.session.user.id;
      classification.classified_at = new Date();
      classification.is_overridden = false;
      classification.rationale = result.eligible ? null : result.reason;
      classification.overridden_by = null;
      classification.overridden_at = null;
      classification.is_flagged = autoFlag;
      classification.flag_reason = autoFlag
        ? `Automatically flagged: ${!result.eligible ? result.reason : 'Fail'}`
        : null;
      classification.flagged_by = autoFlag ? req.session.user.id : null;
      classification.flagged_at = autoFlag ? new Date() : null;
      await classification.save();
    } else {
      await Classification.create({
        student_id: studentId,
        classified_by: req.session.user.id,
        classified_at: new Date(),
        y2_average: result.eligible ? result.y2_average : null,
        y3_average: result.eligible ? result.y3_average : null,
        final_average: result.eligible ? result.final_average : null,
        proposed_outcome: result.eligible ? result.proposed_outcome : 'Not Eligible',
        final_outcome: result.eligible ? result.proposed_outcome : 'Not Eligible',
        is_overridden: false,
        rationale: result.eligible ? null : result.reason,
        overridden_by: null,
        overridden_at: null,
        is_flagged: autoFlag,
        flag_reason: autoFlag ? 'Automatically flagged: ' + (result.eligible ? 'Fail' : 'Not Eligible') : null,
        flagged_by: autoFlag ? req.session.user.id : null,
        flagged_at: autoFlag ? new Date() : null
      });
    }

    return res.redirect(`/academic/studentClassification/${studentId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to run classification' });
  }
};

// Manually Override Classification
export const postOverrideClassification = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { final_outcome, rationale } = req.body;

    const classification = await Classification.findOne({
      where: { student_id: studentId }
    });

    if (!classification) return res.render('error', { message: 'No classification found for this student' });

    const autoFlag = final_outcome === 'Fail' || final_outcome === 'Not Eligible';

    classification.final_outcome = final_outcome;
    classification.rationale = rationale;
    classification.is_overridden = true;
    classification.overridden_by = req.session.user.id;
    classification.overridden_at = new Date();
    classification.is_flagged = autoFlag;
    classification.flag_reason = autoFlag
      ? `Automatically flagged: ${final_outcome}`
      : null;
    classification.flagged_by = autoFlag ? req.session.user.id : null;
    classification.flagged_at = autoFlag ? new Date() : null;

    await classification.save();

    return res.redirect(`/academic/studentClassification/${studentId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to override classification' });
  }
};

// Manually Flag Student for Review
export const postFlagStudentReview = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { is_flagged, flag_reason } = req.body;

    const classification = await Classification.findOne({
      where: { student_id: studentId }
    });

    if (!classification) return res.render('error', { message: 'No classification found for this student' });

    classification.is_flagged = is_flagged === 'on';
    classification.flag_reason = is_flagged === 'on' ? flag_reason : null;
    classification.flagged_by = is_flagged === 'on' ? req.session.user.id : null;
    classification.flagged_at = is_flagged === 'on' ? new Date() : null;

    await classification.save();

    return res.redirect(`/academic/studentClassification/${studentId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to flag student for review' });
  }
};

// Programme Classification Page
export const getProgrammeClassificationPage = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });
    const programmeId = req.params.id;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found' });

    const students = await Student.findAll({
      where: { programme_id: programmeId, active_student: true },
      include: [
        {
          model: Result,
          include: { model: Module, attributes: ['id', 'name', 'module_code'] }
        },
        { model: Classification }
      ],
      order: [['last_name', 'ASC']]
    });

    const programmeModules = await ProgrammeModule.findAll({
      where: { programme_id: programmeId, active: true }
    });

    students.forEach(student => {
      student.Results.forEach(r => {
        const pm = programmeModules.find(pm => pm.module_id === r.module_id);
        r.Module.credits = pm ? pm.credits : 0;
      });
    });

    res.render('academic/programmeClassification', {
      user: req.session.user,
      programme,
      students,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load programme classification page' });
  }
};

export const postProgrammeClassification = async (req, res) => {
  try {
    const programmeId = req.params.id;

    const programme = await Programme.findByPk(programmeId);
    if (!programme) return res.render('error', { message: 'Programme not found' });

    const students = await Student.findAll({
      where: { programme_id: programmeId, active_student: true },
      include: [
        {
          model: Result,
          include: { model: Module, attributes: ['id', 'name', 'module_code'] }
        }
      ]
    });

    const programmeModules = await ProgrammeModule.findAll({
      where: { programme_id: programmeId, active: true }
    });

    for (const student of students) {
      student.Results.forEach(r => {
        const pm = programmeModules.find(pm => pm.module_id === r.module_id);
        r.Module.credits = pm ? pm.credits : 0;
      });

      const result = classifyStudent(student.Results, programme);

      const classification = await Classification.findOne({
        where: { student_id: student.id }
      });
      const autoFlag = !result.eligible || result.proposed_outcome === 'Fail';
      if (classification) {
        classification.y2_average = result.eligible ? result.y2_average : null;
        classification.y3_average = result.eligible ? result.y3_average : null;
        classification.final_average = result.eligible ? result.final_average : null;
        classification.proposed_outcome = result.eligible ? result.proposed_outcome : 'Not Eligible';
        classification.final_outcome = result.eligible ? result.proposed_outcome : 'Not Eligible';
        classification.classified_by = req.session.user.id;
        classification.classified_at = new Date();
        classification.is_overridden = false;
        classification.rationale = result.eligible ? null : result.reason;
        classification.overridden_by = null;
        classification.overridden_at = null;
        classification.is_flagged = autoFlag;
        classification.flag_reason = autoFlag
          ? `Automatically flagged: ${!result.eligible ? result.reason : 'Fail'}`
          : null;
        classification.flagged_by = autoFlag ? req.session.user.id : null;
        classification.flagged_at = autoFlag ? new Date() : null;
        await classification.save();
      } else {
        await Classification.create({
          student_id: student.id,
          classified_by: req.session.user.id,
          classified_at: new Date(),
          y2_average: result.eligible ? result.y2_average : null,
          y3_average: result.eligible ? result.y3_average : null,
          final_average: result.eligible ? result.final_average : null,
          proposed_outcome: result.eligible ? result.proposed_outcome : 'Not Eligible',
          final_outcome: result.eligible ? result.proposed_outcome : 'Not Eligible',
          is_overridden: false,
          rationale: result.eligible ? null : result.reason,
          overridden_by: null,
          overridden_at: null,
          is_flagged: autoFlag,
          flag_reason: autoFlag ? 'Automatically flagged: ' + (result.eligible ? 'Fail' : 'Not Eligible') : null,
          flagged_by: autoFlag ? req.session.user.id : null,
          flagged_at: autoFlag ? new Date() : null
        });
      }
    }

    return res.redirect(`/academic/programmeClassification/${programmeId}`);

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to run programme classification' });
  }
};

// Audit Log Page
export const getAuditPage = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });


    const classifications = await Classification.findAll({
      where: {
        [Op.or]: [
          { is_overridden: true },
          { is_flagged: true }
        ]
      },
      include: [
        {
          model: Student,
          attributes: ['first_name', 'last_name', 'student_number'],
          required: true,
          include: {
            model: Programme,
            attributes: ['name', 'programme_code'],
            required: true,
            include: {
              model: User,
              where: { id: userId },
              through: { where: { active: true } },
              required: true,
              attributes: []
            }
          }
        },
        { model: User, attributes: ['first_name', 'last_name'] }
      ],
      order: [['classified_at', 'DESC']]
    });

    res.render('academic/auditLog', {
      user: req.session.user,
      classifications,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load audit log' });
  }
};

//Create New Student Page
export const getAddStudentPage = async (req, res) => {
  try {
    const userId = req.session.user.id;


    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: {
        model: Programme,
        attributes: ['id', 'name', 'programme_code', 'degree_type', 'school']
      }
    });

    res.render('academic/createStudent', {
      user: req.session.user,
      programmes: userProgrammes,
      error: null,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });

  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load create student page' });
  }
};

export const postAddStudent = async (req, res) => {
  const { student_number, first_name, last_name, dob, programme_id, enrolled_date, graduation_year } = req.body;

  try {
    const existing = await Student.findOne({ where: { student_number } });

    if (existing) {
      const userId = req.session.user.id;
      const userProgrammes = await UserProgramme.findAll({
        where: { user_id: userId, active: true },
        include: { model: Programme, attributes: ['id', 'name', 'programme_code', 'degree_type', 'school'] }
      });



      return res.status(400).render('academic/createStudent', {
        user: req.session.user,
        userProgrammes,
        message: userProgrammes.length === 0
          ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
          : null,
        programmes: userProgrammes,
        error: 'A student with this student number already exists'
      });
    }

    const newStudent = Student.build({
      student_number,
      first_name,
      last_name,
      dob,
      programme_id,
      enrolled_date,
      graduation_year,
      active_student: true
    });

    await newStudent.save();

    return res.redirect('/academic/studentList');

  } catch (err) {
    console.error(err);

    let errorMessage = 'Something went wrong';

    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors[0].message;
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      errorMessage = err.errors[0].message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    const userId = req.session.user.id;
    const userProgrammes = await UserProgramme.findAll({
      where: { user_id: userId, active: true },
      include: { model: Programme, attributes: ['id', 'name', 'programme_code', 'degree_type', 'school'] }
    });

    return res.status(400).render('academic/createStudent', {
      user: req.session.user,
      programmes: userProgrammes,
      error: errorMessage,
      userProgrammes,
      message: userProgrammes.length === 0
        ? 'You are not currently assigned to any programmes. Please contact your institutional administrator.'
        : null
    });
  }
};