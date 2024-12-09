import mongoose, {Schema} from "mongoose";


const productSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[5,"Name contains atleast 5 character"],
        maxLength:[30,"Name only be contain 30 character"],
        unique:true
    },
    description:{
        type:String,
        required:[true,"Email is required"],
    },
    // image:{
    //     type:String,
    //     required:[true,"Password is required"],
    //     minLength:[5,"Password must be contain atleast 5 character"],
    //     maxLength:[16,"Password can only be contain 16 character"],
    //     select:false
    // },
    price:{
        type:Number,
        required:[true,'Product price is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
}
);



export const Product = mongoose.model("Product",productSchema);