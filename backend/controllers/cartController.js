import { Product } from "../models/ProductModel.js";
import { User } from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    console.log(req.user);
    
    const { id } = req.user;
    const { productId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Add product to user's cart
    user.products.push(productId);
    await user.save();

    console.log("user",user);
    

    return res.status(200).json({
      success: true,
      message: "Product successfully added to cart",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req,res) => {
    try {
        const {id} = req.user;
        console.log(req.user);
        
        const user = await User.findById(id);

        const allProductsId = user.products?.filter(item => item);

        const carts = await Promise.all(
            allProductsId?.map(async (item) => await Product.findById(item))
          );
        

        return res.status(200).json({
            success: false,
            message: 'successfully get all carts',
            carts
          });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

const deleteAllCartItems = async (req,res) => {
    try {
        const {id} = req.user;

        const user = await User.findById(id);

        user.products = [];
        user.save();

         return res.status(200).json({
            success:true,
            message:"All cart item successfully deleted"
         })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

export { addToCart ,getCart,deleteAllCartItems };
