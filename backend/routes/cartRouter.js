import { Router } from "express";
import { addToCart, deleteAllCartItems, getCart } from "../controllers/cartController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const cartRouter = Router();


cartRouter.route('/').get(isAuthenticated,getCart)
                     .post(isAuthenticated,addToCart)
                     .delete(isAuthenticated,deleteAllCartItems);

// cartRouter.route('/:productId').delete(isAuthenticated,deleteCartItem);

export default cartRouter;