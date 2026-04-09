
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

// View Student List
router.get(
  '/academic/studentList',
  isAuthenticated,
  isAcademicAdmin,
  academicController.studentList
);

// View Student Profile Page
router.get(
  '/academic/studentProfile/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.viewStudentProfile
);

// Edit Student Profile Page
router.get(
  '/academic/editStudent/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getEditStudentPage
);

router.post(
  '/academic/editStudent/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postEditStudentPage
);

// Remove Student from List (Inactivate)
router.post(
  '/academic/deactivateStudent/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.deactivateStudent
);

// Programme Dashboard
router.get(
  '/academic/programmeDashboard/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.programmeDashboard
);

// Edit Programme
router.get(
  '/academic/editProgramme/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getEditProgrammePage
);

router.post(
  '/academic/editProgramme/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postEditProgrammePage
);

// Assign Module to Programme
router.post(
  '/academic/assignModule/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.assignModule
);

// Remove Module from Programme
router.post(
  '/academic/removeModule/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.removeModule
);






export default router;