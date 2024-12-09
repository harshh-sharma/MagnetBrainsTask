import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, getCartProducts } from '../redux/slices/cartSlice';
import { getAllProducts } from '../redux/slices/productSlice';

const Card = ({productId,title,description,cartButton}) => {
  const dispatch = useDispatch();

  const addItem = async () => {
    const response = await dispatch(addToCart({productId}));
    console.log("response Of add to cart",response);
    
    if(response?.payload?.success){
      await dispatch(getAllProducts());
      await dispatch(getCartProducts());
    }
  }
  return (
    <div className='w-[300px] h-auto rounded-md flex flex-col justify-center items-center bg-white'>
      {!cartButton && <div className='relative flex justify-center items-center w-[20px] h-[20px] right-0 bg-red-500 rounded-full mt-2'>
        <p className='text-white'>X</p>
      </div>}

       <div className=' h-auto flex-col px-2  py-5 rounded-md'>
       <img src="https://images.pexels.com/photos/1322360/pexels-photo-1322360.jpeg?auto=compress&cs=tinysrgb&w=600" width={250} alt="" className='rounded-md' height={'200px'} />
    </div>
    <div>
      <h1 className='text-center text-xl font-semibold'>{title}</h1>
      <p className='text-center text-lg'>{description}</p>
    </div>
    {cartButton && <div className= 'mt-2 bg-indigo-600 hover:text-indigo-600 hover:bg-white border-[2px] border-indigo-600 text-white flex justify-center items-center px-5 py-2 rounded-md mb-[10px]'>
      <button onClick={addItem}>Add To Cart</button>
    </div>}
    </div>
  )
}

export default Card