import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[5,"Name contains atleast 5 character"],
        maxLength:[30,"Name only be contain 30 character"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already registered"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[5,"Password must be contain atleast 5 character"],
        maxLength:[16,"Password can only be contain 16 character"],
        select:false
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
},{
    timestamps:true
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.correctPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJwtToken = async function(){
    return jwt.sign(
        {id:this._id,email:this.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES}
    )
}


export const User = mongoose.model("User",userSchema);