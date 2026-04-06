
import { Student, Programme, Result, Module } from '../../seeder/models/index.js';

// Dashboard
export const dashboard = async (req, res) => {
  try {
    const programmeCount = await Programme.count();
    const studentCount = await Student.count();

    res.render('academic/dashboard', {
      user: req.session.user,
      programmeCount,
      studentCount,
    });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load dashboard' });
  }
};

//View Students
export const viewStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ include: Programme });
    res.render('academic/viewStudent', { user: req.session.user, students });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load students' });
  }
};

//Add students
export const addStudentForm = async (req, res) => {
  try {
    const programmes = await Programme.findAll();
    res.render('academic/addStudent', { user: req.session.user, programmes, error: null });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load form' });
  }
};

export const addStudent = async (req, res) => {
  const { first_name, last_name, student_number, programmeId } = req.body;
  try {
    await Student.create({ first_name, last_name, student_number, programmeId });
    res.redirect('/academic/students');
  } catch (err) {
    console.error(err);
    const programmes = await Programme.findAll();
    res.render('academic/addStudent', { user: req.session.user, programmes, error: 'Error adding student' });
  }
};

//Edit student
export const editStudentForm = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (!student) return res.render('error', { message: 'Student not found' });

    const programmes = await Programme.findAll();
    res.render('academic/editStudent', { user: req.session.user, student, programmes, error: null });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load form' });
  }
};

export const editStudent = async (req, res) => {
  const { first_name, last_name, student_number, programmeId } = req.body;
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (!student) return res.render('error', { message: 'Student not found' });

    student.first_name = first_name;
    student.last_name = last_name;
    student.student_number = student_number;
    student.programmeId = programmeId;
    await student.save();

    res.redirect(`/academic/students/${student.id}/details`);
  } catch (err) {
    console.error(err);
    const student = await Student.findByPk(req.params.studentId);
    const programmes = await Programme.findAll();
    res.render('academic/editStudent', { user: req.session.user, student, programmes, error: 'Error updating student' });
  }
};

//View results
export const viewResults = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId, { include: Result });
    if (!student) return res.render('error', { message: 'Student not found' });

    res.render('academic/manageResults', { user: req.session.user, student });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load results' });
  }
};

//Add results
export const addResultForm = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const modules = await Module.findAll();
    res.render('academic/addResult', { user: req.session.user, student, modules, error: null });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load form' });
  }
};

export const addResult = async (req, res) => {
  const { moduleId, mark, credits } = req.body;
  try {
    await Result.create({ studentId: req.params.studentId, moduleId, mark, credits });
    res.redirect(`/academic/students/${req.params.studentId}/results`);
  } catch (err) {
    console.error(err);
    const student = await Student.findByPk(req.params.studentId);
    const modules = await Module.findAll();
    res.render('academic/addResult', { user: req.session.user, student, modules, error: 'Error adding result' });
  }
};

//Edit results
export const editResultForm = async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.resultId);
    const student = await Student.findByPk(req.params.studentId);
    const modules = await Module.findAll();

    if (!result || !student) return res.render('error', { message: 'Result or student not found' });

    res.render('academic/editResult', { user: req.session.user, student, modules, result, error: null });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load form' });
  }
};

export const editResult = async (req, res) => {
  const { moduleId, mark, credits } = req.body;
  try {
    const result = await Result.findByPk(req.params.resultId);
    if (!result) return res.render('error', { message: 'Result not found' });

    result.moduleId = moduleId;
    result.mark = mark;
    result.credits = credits;
    await result.save();

    res.redirect(`/academic/students/${req.params.studentId}/results`);
  } catch (err) {
    console.error(err);
    const result = await Result.findByPk(req.params.resultId);
    const student = await Student.findByPk(req.params.studentId);
    const modules = await Module.findAll();
    res.render('academic/editResult', { user: req.session.user, student, modules, result, error: 'Error updating result' });
  }
};

//See student details
export const studentDetails = async (req, res) => {
};

//Override classification
export const overrideClassificationForm = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (!student) return res.render('error', { message: 'Student not found' });

    res.render('academic/overrideClassification', { user: req.session.user, student, error: null });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Unable to load form' });
  }
};

export const overrideClassification = async (req, res) => {
  const { classification, rationale } = req.body;
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (!student) return res.render('error', { message: 'Student not found' });

    student.overriddenClassification = classification;
    student.overrideRationale = rationale;
    await student.save();

    res.redirect(`/academic/students/${student.id}/details`);
  } catch (err) {
    console.error(err);
    const student = await Student.findByPk(req.params.studentId);
    res.render('academic/overrideClassification', {
      user: req.session.user,
      student,
      error: 'Error saving override',
    });
  }
};
