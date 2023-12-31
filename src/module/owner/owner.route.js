import express from 'express';
import { listHouseValidator, updateHouseValidator } from './owner.validator.js';
import { ownerController } from './owner.controller.js';
import { verifyAuth, verifyOwner } from '../../authHelper/verifyAuth.js';
const router = express.Router();
router
.route('/house/:id')
.patch(verifyOwner,updateHouseValidator,ownerController.updateHouse)
.delete(verifyOwner,ownerController.deleteHouse)
.get(verifyAuth,ownerController.getHouseById)
router
.route('/houses')
.get(verifyOwner,ownerController.getHouseList)
router
.route('/list-house')
.post(verifyOwner,listHouseValidator,ownerController.listAHouse)

export default { ownerRouter: router };