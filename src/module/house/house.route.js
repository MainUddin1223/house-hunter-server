import express from 'express';
import { houseController } from './house.controller.js';
import { verifyAuth } from '../../authHelper/verifyAuth.js';
const router = express.Router();
router
.route('/:id')
.get(verifyAuth,houseController.getHouseById)
router
.route('')
.get(houseController.getAllHouse)

export default { houseRouter: router };