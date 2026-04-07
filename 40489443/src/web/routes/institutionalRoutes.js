
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

// Create New Academic Admin Page
router.get(
  '/institutional/createAdmin',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.createAdminPage
);

// Edit Academic Admins Page
router.get(
  '/institutional/editAdmin',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.editAdminPage
);

// View Academic Admins Profile Page
router.get(
  '/institutional/adminProfile/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.viewAdminProfile
);






















// Add Academic Admin
router.get(
  '/institutional/admins/add',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.addAdminForm
);

router.post(
  '/institutional/admins/add',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.addAdmin
);


// Edit Academic Admin
router.get(
  '/institutional/admins/edit/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.editAdminForm
);
router.post(
  '/institutional/admins/edit/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.editAdmin
);

// Assign Programmes to Admin
router.get(
  '/institutional/admins/assign/:adminId',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.assignProgrammesForm
);
router.post(
  '/institutional/admins/assign/:adminId',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.assignProgrammes
);

// View all Programmes
router.get(
  '/institutional/programmes',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.viewProgrammes
);

// Create Programme
router.get(
  '/institutional/programmes/create',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.createProgrammeForm
);
router.post(
  '/institutional/programmes/create',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.createProgramme
);

// Edit Programme
router.get(
  '/institutional/programmes/edit/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.editProgrammeForm
);
router.post(
  '/institutional/programmes/edit/:id',
  isAuthenticated,
  isInstitutionalAdmin,
  institutionalController.editProgramme
);

export default router;