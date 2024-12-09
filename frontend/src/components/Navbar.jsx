import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice';
import { getCartProducts } from '../redux/slices/cartSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cartItems = useSelector(store => store?.cart?.carts);
  
  const handleLogout = async () => {
    // e.preventDefault();

    const response = await dispatch(logout());
    console.log(response);
    
    if(response?.payload?.success){
      navigate('/');
    }
  }

  return (
    <div className='w-full flex justify-around bg-indigo-500 h-[50px] items-center'>
        <div>
            <h1 className='text-lg text-white font-semibold'>E-commerce</h1>
        </div>
        <div className='flex justify-center items-center gap-5'>
             <li onClick={() => navigate('/product')} className='list-none text-lg text-white font-semibold cursor-pointer hover:border-white px-[5px] rounded-md hover:underline'>Products</li>
            <div className='list-none flex text-white cursor-pointer ' onClick={() => navigate('/cart')}>
                 <p className='text-lg text-white font-semibold hover:underline'>Cart </p>
                 <div className='bg-red-500 flex justify-center items-center w-[20px] h-[20px] rounded-full'>
                 <p className='bg-red-500 text-white w-[3px] h-[3px] flex justify-center items-center rounded-full'>{cartItems?.length}</p>
                 </div>
                 
              </div>
        </div>

        <div>
            <button className='flex py-[2px]text-lg font-semibold bg-white hover:bg-red-500 px-[10px] text-indigo-500 py-[1px] hover:text-white rounded-md' onClick={() => handleLogout()}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar