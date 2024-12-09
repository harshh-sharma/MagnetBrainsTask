import { Router } from "express";
import { profile, login, register, logout } from "../controllers/userController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/profile',isAuthenticated,profile);
userRouter.get('/logout',logout);

export default userRouter;