import { User } from "../models/userModel.js";
import sendJwtToken from "../utils/sendJwtToken.js";

const register = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        console.log("name",name,"Email",email,"Password",password);
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isUserExistOrNot = await User.findOne({ email });
        if (isUserExistOrNot) {
            return res.status(400).json({
                success: false,
                message: "User already registered !!"
            })
        }

        const user = await User.create({name,email,password});
        
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "server error while registering"
            })
        }
        sendJwtToken(res,user,"User registered successfully");
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User are not registered"
            })
        }

        const isCorrectPassword = await user.correctPassword(password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })
        }

        sendJwtToken(res,user,"User loggedIn successfully");
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly:true
    }).json({
        success: true,
        message: "user successfully logout"
    })
}

const profile = async(req,res) => {
    const {id} = req.user;
    // console.log("name",req.user);
    try {
        const user = await User.findById(id);
        // console.log(user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user are not registered"
            })
        }
        res.status(200).json({
            success:true,
            message:"succefully get user profile",
            data:user
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}




export {
    register,
    login,
    logout,
    profile
}