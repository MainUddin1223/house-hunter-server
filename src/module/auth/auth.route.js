import express from 'express';
import { authController } from './auth.controller.js';
import { loginApiValidator, registerApiValidator } from './auth.validation.js';
const router = express.Router();
router
.route('/register')
.post(registerApiValidator,authController.registerUser)
router
.route('/login')
.post(loginApiValidator,authController.loginUser)

export default { authRouter: router };