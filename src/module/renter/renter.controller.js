import mongoose from "mongoose";
import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import House from "../house/house.model.js";
import Booked from "./renter.model.js";
import ApiError from "../../errorHandler/apiErrorHandler.js";
import User from "../auth/auth.model.js";

const bookHouse = catchAsync(async (req, res) => {

    const {phoneNumber} = req.body;
    const isUserExist = await User.findById({_id:req.user._id});
    if(!isUserExist){
    throw new ApiError(404,"User not found")
    }
    const payload = {phoneNumber,email:isUserExist.email,name:isUserExist.fullName};
    const id = req.params.id
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const verifyAvilibality =await House.findById({_id:id})
        if(!verifyAvilibality || verifyAvilibality.isBooked === true){
            throw new ApiError(400, 'House is not available')
        }

        // create history
        const bookedHouse = await Booked.create( [{ ...payload, renter: req.user._id,house:id }],
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

  const getBookedHouse = catchAsync(async (req, res) => {
    const result = await Booked.find({renter:req.user._id})
    res.status(200).json(result);
  });

//   const deleteBooking = catchAsync(async (req, res) => {
//     const id = req.params.id
//     const isBookingExist = await Booked.findById({_id:id});
//     if(!isBookingExist){
//         throw new ApiError(404,'Booking not found')
//     }
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         // Delete history
//   const res = await Booked.findOneAndDelete( [{_id:id,renter:req.user._id}],
//             { session });
//         // find and update house data
//          const updateHouse = await House.findOneAndUpdate(
//             {_id:isBookingExist.house},
//             {isBooked:true},
//             { $unset: { renter: 1 } },
//             {  
//                 session,
//                 new: true,
//             }
//         )
//         if(!updateHouse){
//             throw new Error('Something went wrong')
//         }

//         await session.commitTransaction();
//         session.endSession();
//         res.status(200).json({message:"House removed successfully",status:true});
        
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         const errorMessage = (error).message;
//         throw new ApiError(500, errorMessage);
//     }
//   });

const deleteBooking = catchAsync(async (req, res) => {
    const id = req.params.id;
    const isBookingExist = await Booked.findById(id);
  
    if (!isBookingExist) {
      throw new ApiError(404, 'Booking not found');
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Delete booking
      await Booked.findOneAndDelete(
        { _id: id, renter: req.user._id },
        { session }
      );
  
      // Update house data
      const updateHouse = await House.findOneAndUpdate(
        { _id: isBookingExist.house },
        { $unset: { renter: 1 }, isBooked: false },
        {
          session,
          new: true,
        }
      );
  
      if (!updateHouse) {
        throw new Error('Something went wrong');
      }
  
      await session.commitTransaction();
      session.endSession();
      res
        .status(200)
        .json({ message: 'House removed successfully', status: true });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      const errorMessage = error.message;
      throw new ApiError(500, errorMessage);
    }
  });
  

  export const renterController = {bookHouse,getBookedHouse,deleteBooking}