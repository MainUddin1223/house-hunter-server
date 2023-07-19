import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import House from "../house/house.model.js";

const listAHouse = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await House.create({...payload,owner:req.user._id});
    if (result) {
  res.status(200).json({message:'House listed successfully',status:true});
    } else {
      throw new ApiError(500, 'Something went wrong');
    }
  });

const getHouseList = catchAsync(async (req, res) => {
    const result = await House.find({owner:req.user._id})
    res.status(200).json({result,status:true});
  });

const updateHouse = catchAsync(async (req, res) => {
    const payload = req.body
    const {id} = req.params
     await House.findOneAndUpdate(
        {_id:id,owner:req.user._id},
        { $set:payload}
        )
    res.status(200).json({message:"House updated successfully",status:true});
  });

const deleteHouse = catchAsync(async (req, res) => {
    const {id} = req.params
   await House.findOneAndDelete({_id:id,owner:req.user._id})
    res.status(200).json({message:"House deleted successfully",status:true});
  });

  export const ownerController = {listAHouse, getHouseList, updateHouse, deleteHouse}