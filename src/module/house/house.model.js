import { Schema, model } from 'mongoose';

const houseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    renter:{
        type:Schema.Types.ObjectId,
        ref:'bookedHistory'
    },
    availableFrom:{
        type:String,
        required:true
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
  const House = model('house',houseSchema)
  export default House

