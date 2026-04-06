
import express from 'express';
import { isAuthenticated, isAcademicAdmin } from '../middleware/auth.js';
import * as academicController from '../controllers/academicController.js';

const router = express.Router();

//Dashboard
router.get(
  '/academic/dashboard',
  isAuthenticated,
  isAcademicAdmin,
  academicController.dashboard
);

//View student
router.get(
  '/academic/students',
  isAuthenticated,
  isAcademicAdmin,
  academicController.viewStudents
);

// Add student
router.get(
  '/academic/students/add',
  isAuthenticated,
  isAcademicAdmin,
  academicController.addStudentForm
);

router.post(
  '/academic/students/add',
  isAuthenticated,
  isAcademicAdmin,
  academicController.addStudent
);

// Edit students
router.get(
  '/academic/students/edit/:studentId',
  isAuthenticated,
  isAcademicAdmin,
  academicController.editStudentForm
);

router.post(
  '/academic/students/edit/:studentId',
  isAuthenticated,
  isAcademicAdmin,
  academicController.editStudent
);

//Manage student results
router.get(
  '/academic/students/:studentId/results',
  isAuthenticated,
  isAcademicAdmin,
  academicController.viewResults
);

router.get(
  '/academic/students/:studentId/results/add',
  isAuthenticated,
  isAcademicAdmin,
  academicController.addResultForm
);

router.post(
  '/academic/students/:studentId/results/add',
  isAuthenticated,
  isAcademicAdmin,
  academicController.addResult
);

router.get(
  '/academic/students/:studentId/results/edit/:resultId',
  isAuthenticated,
  isAcademicAdmin,
  academicController.editResultForm
);

router.post(
  '/academic/students/:studentId/results/edit/:resultId',
  isAuthenticated,
  isAcademicAdmin,
  academicController.editResult
);

// See student details
router.get(
  '/academic/students/:studentId/details',
  isAuthenticated,
  isAcademicAdmin,
  academicController.studentDetails
);

// Override classification
router.get(
  '/academic/students/:studentId/override',
  isAuthenticated,
  isAcademicAdmin,
  academicController.overrideClassificationForm
);

router.post(
  '/academic/students/:studentId/override',
  isAuthenticated,
  isAcademicAdmin,
  academicController.overrideClassification
);

export default router;