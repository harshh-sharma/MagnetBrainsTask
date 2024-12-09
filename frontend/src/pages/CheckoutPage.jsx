import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { cleanCart, getCartProducts } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../redux/slices/productSlice';

const CheckoutPage = () => {

    const navigate = useNavigate(); 

    const dispatch = useDispatch();

   const removeAllItemFromCart = async () => {
        const response = await dispatch(cleanCart());
        console.log(response);
        await dispatch(getCartProducts());
        
        toast.success('Your Order Successfully placed')
   }

   useEffect(() => {
      removeAllItemFromCart();
   },[])


  return (
    <>
        <Navbar/>
        <div className='w-full flex justify-center items-center min-h-screen bg-indigo-400 flex-col gap-5'>
            <p className='text-2xl text-white font-bold'>Thank you for Shopping with </p>
            <button onClick={() => navigate('/product')} className='bg-white font-semibold text-indigo-600 px-5 py-2 rounded-md'>Go back</button>
        </div>
    </>
  )
}

export default CheckoutPage