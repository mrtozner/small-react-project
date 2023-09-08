import express from 'express';
import * as userController from '../controllers/userController.js';
import catchError from '../helpers/catchError.js';
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/authorized', authMiddleware, catchError(userController.authorized));

router.post('/login', catchError(userController.login));

router.post('/register', catchError(userController.register));

export default router;
