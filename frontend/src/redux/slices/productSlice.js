import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


export const getAllProducts = createAsyncThunk('/product/',async() => {
    console.log("getAllProducts--");
    
    try {
        const res = axiosInstance.get('/product');

        toast.promise(res,{
            loading:"Wait !! while we load data",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to load products"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[]
    },
    // reducers:{}
    extraReducers:(builder) => {
        builder.addCase(getAllProducts.fulfilled,(state,action) => {
            state.products = action?.payload?.products;
        })
    }
})

export default productSlice.reducer;