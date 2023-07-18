import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import House from "./house.module.js";
const listAHouse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await House.create({
    ...payload,
    owner: req.user._id
  });
  if (result) {
    res.status(200).json({
      message: 'House listed successfully',
      status: true
    });
  } else {
    throw new ApiError(500, 'Something went wrong');
  }
});
export const houseController = {
  listAHouse
};