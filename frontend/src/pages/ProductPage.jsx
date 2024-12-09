import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

const ProductPage = () => {

const dispatch = useDispatch();
const products = useSelector(store => store?.product?.products);
console.log("products",products);

const loadProducts = async () => {
    const response = await dispatch(getAllProducts());
    console.log("response ",response);
    
}

useEffect(() => {
  loadProducts();
},[])

  return (
    <div>
     <Navbar/>
    <div className='bg-indigo-400 w-full flex justify-center items-center flex-wrap gap-5 min-h-screen'>
      {
        products?.length > 0 ? products?.map(item => <Card productId={item?._id} title={item?.name} description={item?.description} cartButton={true} />) : <p>There is no Products</p>
      }
    </div>
    </div>
  )
}

export default ProductPage