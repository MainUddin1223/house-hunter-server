import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import House from "../house/house.module.js";
import Booked from "./renter.model.js";
const bookHouse = catchAsync(async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // create history
    const bookedHouse = await Booked.create([{
      ...payload,
      renter: req.user._id
    }], {
      session
    });
    // find and update house data
    const renter = {
      renter: bookedHouse._id
    };
    console.log('-------------renter', renter);
    await House.findOneAndUpdate({
      _id: id
    }, renter, {
      session,
      new: true
    });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      message: "House booked successfully",
      status: true
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    const errorMessage = error.message;
    throw new ApiError(500, errorMessage);
  }
});
export const renterController = {
  bookHouse
};