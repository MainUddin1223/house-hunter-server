import { jwtHelpers } from "../../authHelper/jwtHelper.js";
import ApiError from "../../errorHandler/apiErrorHandler.js";
import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import User from "./auth.model.js";
import config from '../../config/index.js'

const registerUser=catchAsync(
    async(req,res)=>{
        const payload = req.body;
        const isUserExist = await User.findOne({email:payload.email});
        if(isUserExist){
            throw new ApiError(400,'User already exist')
        }
        const result = await User.create(payload);
        if(result){
            const {fullName,email,_id,role,phoneNumber} = result
            const jwtPayload = {_id,role}
            const accessToken = jwtHelpers.createJwtToken(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in)
            res.status(200).json({result:{fullName,email,_id,role,phoneNumber} ,accessToken})
        }else{
            throw new ApiError(500,'Something went wrong')
        }
    }
)
export const authController ={registerUser}