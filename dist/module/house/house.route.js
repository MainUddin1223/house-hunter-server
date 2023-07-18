import express from 'express';
import { houseController } from './house.controller.js';
import { listHouseValidator } from './house.validaton.js';
import { verifyOwner } from '../../authHelper/verifyAuth.js';
const router = express.Router();
router.route('/list-house').post(verifyOwner, listHouseValidator, houseController.listAHouse);
export default {
  houseRouter: router
};