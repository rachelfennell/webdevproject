
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

export default router;