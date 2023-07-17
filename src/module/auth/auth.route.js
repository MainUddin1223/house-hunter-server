import express from 'express';
import { authController } from './auth.controller.js';
import { registerApiValidator } from './auth.validation.js';
const router = express.Router();
router
.route('/register')
.post(registerApiValidator,authController.registerUser)

export default { authRouter: router };