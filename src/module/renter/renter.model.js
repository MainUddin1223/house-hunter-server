import {Schema,model} from 'mongoose';
import ApiError from '../../errorHandler/apiErrorHandler.js';

const bookedHistorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    renter:{
        type:Schema.Types.ObjectId,
        required:true
    },
    house:{
      type:Schema.Types.ObjectId,
      required:true
    },
    email:{
        type:String,
        required:true
    }
})

bookedHistorySchema.pre('save', async function (next) {

    const count = await Booked.countDocuments({ renter:this.renter });
    if (count>2) {
      throw new ApiError(
        429,
        'You can not add more than two houses'
      );
    }
    next();
  });
  const Booked = model('bookedHistory',bookedHistorySchema)
export default Booked