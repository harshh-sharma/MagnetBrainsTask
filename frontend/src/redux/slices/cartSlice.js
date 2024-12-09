import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


export const addToCart = createAsyncThunk('/cart/',async(productId) => {
    console.log("getAllProducts--",productId);
    
    try {
        const res = axiosInstance.post('/cart/',productId);

        toast.promise(res,{
            loading:"Wait !! while we add item in cart",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to add item in card products"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getCartProducts = createAsyncThunk('/cart/',async () => {
    try {
       const response = axiosInstance.get('/cart');
        
       toast.promise(response,{
        loading:"Wait !! while loading carts",
        success:(data) => {
            // console.log("dat",data);
            return data?.data?.message;
        },
        error:"Failed to load cart items"
    })
    return (await response).data
    } catch (error) {
        console.log(error);
        
    }
})

export const cleanCart = createAsyncThunk('/cart',() => {
    try {
        const response = axiosInstance.delete('/cart');
        toast.promise(response,{
            loading:"Wait !! deleting carts items",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to delete cart items"
        })
    } catch (error) {
       console.log(error);
        
    }
})

const cartSlice = createSlice({
    name:"product",
    initialState:{
        carts:[]
    },
    // reducers:{}
    extraReducers:(builder) => {
        builder.addCase(getCartProducts.fulfilled,(state,action) => {

            state.carts = action?.payload?.carts;
        })
        .addCase(cleanCart.fulfilled,(state,action) => {
            state.carts = [];
        })
    }
})

export default cartSlice.reducer;