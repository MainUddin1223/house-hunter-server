import config from '../../config/index.js';
import { Schema, model } from 'mongoose';
import User from '../auth/auth.model.js';

const houseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    roomSize:{
        type:Number,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
// houseSchema.pre('save', async function (next) {
//     const user = await User.findOne({ _id: this._id });
//     if (user && user.role !== 'owner') {
//       throw new ApiError(
//         409,
//         'Renter can not list a house'
//       );
//     }
//     next();
//   });
  const House = model('house',houseSchema)
  export default House

