import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";


export const register = createAsyncThunk("/user/register",async(data) => {
    try {
        const res = axiosInstance.post("/user/register",data);
        toast.promise(res,{
            loading:"Wait !! creating your account",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/user/login",async(data) => {
    try {
        const res = axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading:"wait for loggedIn",
            success:(data) => {
                return data?.data?.message;
            },
            error:"failed to login"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/user/logout",async() => {
   try {
     const res = axiosInstance.get("/user/logout");
     toast.promise(res,{
         loading:"wait !! logged out",
         success:(data) => {
             return data?.data?.message;
         },
         error:"Failed to logout"
     })
     return (await res).data;
   } catch (error) {
    toast.error(error?.response?.data?.message);
   }
})


export const getUserProfile = createAsyncThunk("/auth/profile",async() => {
    try {
        const response = axiosInstance.get("/user/profile");
        toast.promise(response,{
            loading:"wait || profile is loaded",
            success:"profile get succesfully",
            error:"failed to get profile"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: false,
        user:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            state.isLoggedIn = true,
            state.user = action?.payload?.user;
        })
        .addCase(logout.fulfilled,(state,action) => {
            state.user = {};
            state.isLoggedIn = false
        })
        .addCase(getUserProfile.fulfilled,(state,action) => {
            state.user = action?.payload?.data;
        })
    }
})


// export const {} = authSlice.actions;
export default authSlice.reducer;