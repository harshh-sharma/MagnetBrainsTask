import { Product } from "../models/ProductModel.js";

const createProduct = async (req,res) => {
    try {
        const {name,price,description} = req.body;

        if(!name || !price || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const product = await Product.create({name,price,description});

        if(!product){
            return res.status(400).json({
                success:false,
                message:"something went wrong ,Please try again"
            })
        }


        return res.status(200).json({
            success:true,
            message:'product successfully created',
            product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success:true,
            message:'Successfully get all products',
            products
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getSpecificProduct = async (req,res) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id);

        if(!product){
            return res.status(400).json({
                success:false,
                message:'product does not exist'
            })
        }

        return res.status(200).json({
            success:true,
            message:'successfully get product',
            product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;

        const productExits = await Product.findById(id);

        if(!productExits){
            return res.status(400).json({
                success:false,
                message:'product does not exist'
            })
        }

        const product = await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:'successfully deleted product',
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export {
    createProduct,
    getProducts,
    getSpecificProduct,
    deleteProduct
}