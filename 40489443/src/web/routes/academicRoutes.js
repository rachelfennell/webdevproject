
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

// Programme Dashboard
router.get(
  '/academic/programmeDashboard',
  isAuthenticated,
  isAcademicAdmin,
  academicController.programmeDashboard
);