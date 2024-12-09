import cookieParser from 'cookie-parser';
import cors from "cors";
import express from 'express';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));

console.log("req coming");


app.get('/ping',(req,res) => {
    res.send('Server is live')
})

app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/cart',cartRouter);

export default app;