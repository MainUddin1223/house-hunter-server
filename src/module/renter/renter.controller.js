import mongoose from "mongoose";
import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import House from "../house/house.module.js";
import Booked from "./renter.model.js";
import ApiError from "../../errorHandler/apiErrorHandler.js";

const bookHouse = catchAsync(async (req, res) => {

    const payload = req.body;
    const id = req.params.id
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const verifyAvilibality =await House.findById({_id:id})
        if(!verifyAvilibality || verifyAvilibality.isBooked === true){
            throw new ApiError(400, 'House is not available')
        }

        // create history
        const bookedHouse = await Booked.create( [{ ...payload, renter: req.user._id }],
            { session });
        // find and update house data

        const renter = {renter:bookedHouse[0]._id,isBooked:true};
         const updateHouse = await House.findOneAndUpdate(
            {_id:id},
            renter,
            {  
                session,
                new: true,
            }
        )

        if(!updateHouse){
            throw new Error('Something went wrong')
        }

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({message:"House booked successfully",status:true});
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        const errorMessage = (error).message;
        throw new ApiError(500, errorMessage);
    }
  });

  export const renterController = {bookHouse}