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
// .delete(verifyOwner,ownerController.deleteHouse)
// router
// .route('/houses')
// .get(verifyOwner,ownerController.getHouseList)
// router
// .route('/list-house')
// .post(verifyOwner,listHouseValidator,ownerController.listAHouse)

export default { renterRouter: router };