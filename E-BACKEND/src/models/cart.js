import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,  // store in id
            ref:'User',   // this id
            required:true,
            unique:true // one cart per user
        },

        items:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
               },
                quantity:{
                    type:Number,
                    required:true,
                    default:1,
                    min:[1, ' Quantity connt be less thn 1']

                }    
            }
        ]
    },
    {
      timestamps:true // it automatically add 2 fields to every doucument fo / createdAt = when this document was created and /updateAT= when this document was last updated
    }
);

const Cart = mongoose.model('Cart',cartSchema)


export default Cart;