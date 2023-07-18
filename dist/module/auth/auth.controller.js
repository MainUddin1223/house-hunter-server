import { jwtHelpers } from "../../authHelper/jwtHelper.js";
import ApiError from "../../errorHandler/apiErrorHandler.js";
import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import User from "./auth.model.js";
import config from '../../config/index.js';
const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const isUserExist = await User.findOne({
    email: payload.email
  });
  if (isUserExist) {
    throw new ApiError(400, 'User already exist');
  }
  const result = await User.create(payload);
  if (result) {
    const {
      fullName,
      email,
      _id,
      role,
      phoneNumber
    } = result;
    const jwtPayload = {
      _id,
      role
    };
    const accessToken = jwtHelpers.createJwtToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    res.status(200).json({
      result: {
        fullName,
        email,
        _id,
        role,
        phoneNumber
      },
      accessToken
    });
  } else {
    throw new ApiError(500, 'Something went wrong');
  }
});
const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = new User();
  const isUserExist = await user.isUserExist(payload.email);
  if (!isUserExist) {
    throw new ApiError(404, 'User dose not exist');
  }
  const isPasswordMatched = await user.isPasswordMatched(payload.password, isUserExist.password);
  if (!isPasswordMatched) {
    throw new ApiError(401, 'Unauthorized');
  } else {
    const {
      fullName,
      email,
      _id,
      role,
      phoneNumber
    } = isUserExist;
    const jwtPayload = {
      _id,
      role
    };
    const accessToken = jwtHelpers.createJwtToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    res.status(200).json({
      result: {
        fullName,
        email,
        _id,
        role,
        phoneNumber
      },
      accessToken
    });
  }
});
const auth = catchAsync(async (req, res) => {
  const isUserExist = await User.findById({
    _id: req.user._id
  }).select('-password');
  const {
    fullName,
    email,
    _id,
    role,
    phoneNumber
  } = isUserExist;
  if (isUserExist) {
    res.status(200).json({
      result: {
        fullName,
        email,
        _id,
        role,
        phoneNumber
      }
    });
  } else {
    throw new ApiError(404, "User not found");
  }
});
export const authController = {
  registerUser,
  loginUser,
  auth
};