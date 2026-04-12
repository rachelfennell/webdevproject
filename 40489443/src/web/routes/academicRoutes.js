
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

// View Programme Student List
router.get(
  '/academic/programmeStudentList/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.programmeStudentList
);

// View Module Results for All Students
router.get(
  '/academic/moduleResults/:programmeId/:moduleId',
  isAuthenticated,
  isAcademicAdmin,
  academicController.viewModuleResults
);

// Edit Students Results Page
router.get(
  '/academic/editResults/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getEditResultsPage
);

router.post(
  '/academic/editResults/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postEditResultsPage
);

// Generate Students Classification Page
router.get(
  '/academic/studentClassification/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getClassificationPage
);

router.post(
  '/academic/studentClassification/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postClassificationPage
);

// Manually Override Student Classification
router.post(
  '/academic/classificationOverride/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postOverrideClassification
);

// Flag Student for Review
router.post(
  '/academic/flagStudent/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postFlagStudentReview
);

// Programme Classification Page
router.get(
  '/academic/programmeClassification/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getProgrammeClassificationPage
);

router.post(
  '/academic/programmeClassification/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postProgrammeClassification
);

// Academic Admin Audit Log Page
router.get(
  '/academic/auditLog',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getAuditPage
);

//Create Student Page
router.get(
  '/academic/createStudent',
  isAuthenticated,
  isAcademicAdmin,
  academicController.getAddStudentPage
);

router.post(
  '/academic/createStudent',
  isAuthenticated,
  isAcademicAdmin,
  academicController.postAddStudent
);

//Reactivate a Student
router.post(
  '/academic/reactivateStudent/:id',
  isAuthenticated,
  isAcademicAdmin,
  academicController.reactivateStudent
);

export default router;