import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getSpecificProduct } from "../controllers/productController.js";

const productRouter = Router();

productRouter.route('/').post(createProduct)
                        .get(getProducts);
                        

productRouter.route('/:id').get(getSpecificProduct)
                           .delete(deleteProduct);



export default productRouter;