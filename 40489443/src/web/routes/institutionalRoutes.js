
import express from 'express';
import { isAuthenticated, isInstitutionalAdmin } from '../middleware/auth.js';
import * as institutionalController from '../controllers/institutionalController.js';

const router = express.Router();

// Dashboard 
router.get(
  '/institutional/dashboard',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.dashboard
);

// Admin Dashboard
router.get(
  '/institutional/manageAdmins',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.manageAdmins
);

// View all Academic Admins Page
router.get(
  '/institutional/viewAdmins',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.viewAllAdminsPage
);

// View Academic Admins Profile Page
router.get(
  '/institutional/adminProfile/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.viewAdminProfile
);

// Edit Academic Admins Page
router.get(
  '/institutional/editAdmin/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.getEditAdminPage
);

router.post(
  '/institutional/editAdmin/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.postAdminPage
);

// Remove Programme from Admin (Inactivate)
router.post(
  '/institutional/removeProgramme/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.removeProgramme
);

// Create New Academic Admin Page
router.get(
  '/institutional/createAdmin',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.getCreateAdminPage
);

router.post(
  '/institutional/createAdmin',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.postCreateAdminPage
);

// View Programmes Dashboard
router.get(
  '/institutional/manageProgrammes',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.manageProgrammes
);


// View all Programmes
router.get(
  '/institutional/viewProgrammes',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.viewProgrammes
);

// View Programmes Profile Page
router.get(
  '/institutional/programmeProfile/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.viewProgrammeProfile
);

// Edit Programme
router.get(
  '/institutional/editProgramme/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.getEditProgrammePage
);
router.post(
  '/institutional/editProgramme/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.postEditProgrammePage
);

// Remove Module from Programme (Inactivate)
router.post(
  '/institutional/removeModule/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.removeModule
);

// Create New Programme Page
router.get(
  '/institutional/createProgramme',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.getCreateProgrammePage
);
router.post(
  '/institutional/createProgramme',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.postCreateProgrammePage
);

// Assign Programmes to Admin
router.post(
  '/institutional/assignProgramme/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.assignProgramme
);

// Assign modules to programme
router.post(
  '/institutional/assignModule/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.assignModule
);



export default router;