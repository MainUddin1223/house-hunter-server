import express from 'express';
import { authController } from './auth.controller.js';
import { loginApiValidator, registerApiValidator } from './auth.validation.js';
import { verifyAuth } from '../../authHelper/verifyAuth.js';
const router = express.Router();
router.route('/register').post(registerApiValidator, authController.registerUser);
router.route('/login').post(loginApiValidator, authController.loginUser);
router.route('').get(verifyAuth, authController.auth);
export default {
  authRouter: router
};