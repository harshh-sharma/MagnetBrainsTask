import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import { getCartProducts } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const carts = useSelector(store => store?.cart?.carts);
 
  const loadCartItem = async () => {
    const response = await dispatch(getCartProducts());
    console.log(response);
    
  }

  useEffect(() => {
    loadCartItem()
  },[])
  

  return (
    <>
    <Navbar/>
    <div className='flex w-full justify-center items-center min-h-screen bg-indigo-400 flex-col'>
        <h1 className='text-2xl text-white my-[10px] mb-[20px]'>Cart Items</h1>
        <div className='flex flex-wrap justify-center items-center gap-[10px]'>
            {
                carts?.map(item => <Card title={item?.name} description={item?.description} cartButton={false} />)
            }
        </div>

        <div className='w-full flex justify-center item-center my-[40px]'>
            {carts?.length > 0 && <button className='text-center text-lg bg-white text-indigo-600 font-semibold px-[6px] rounded-md py-[2px]' onClick={() => navigate('/checkout')}>Go To Checkout </button>}
        </div>
    </div>
    </>
  )
}

export default CartPage