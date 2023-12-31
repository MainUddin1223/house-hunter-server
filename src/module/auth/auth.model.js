import bcrypt from 'bcrypt';
import config from '../../config/index.js'

import {Schema , model} from 'mongoose'
const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['owner','renter']
    },
    phoneNumber:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})
userSchema.methods.isUserExist = async function (
    email
  ) {
    const userData = await User.findOne(
      { email },
      { _id: 1,email:1,phoneNumber:1, password: 1, role: 1, name: 1 }
    );
    return userData;
  };
userSchema.methods.isPasswordMatched = async function (
    password,
    savedPassword,
  ) {
    const isPasswordMatched =await bcrypt.compare( password,savedPassword);
    return isPasswordMatched;
  };

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
      );
      next();
})
const User = model('user',userSchema)
export default User