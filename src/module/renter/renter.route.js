import express from 'express';
import { verifyRenter } from '../../authHelper/verifyAuth.js';
import { renterController } from './renter.controller.js';
const router = express.Router();
router
.route('/houses')
.get(verifyRenter,renterController.getBookedHouse)
router
.route('/house/:id')
.post(verifyRenter,renterController.bookHouse)
.delete(verifyRenter,renterController.deleteBooking)

export default { renterRouter: router };