import React, { useContext, useEffect, useState } from 'react'
import style from './wishList.module.css'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'


export default function WishList() {
    const [counter, setcounter] = useState(0)
    const [isLoading, setisLoading] = useState(false)
    const [wishlistDetails, setwishlistDetails] = useState("")
    useEffect(() => {
      console.log("template name is mounted");
      getWishlist()
    }, [])
    const{addProduct} = useContext(CartContext)


    async function getWishlist() {
      setisLoading(true)
      try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {
          headers :{
            token: localStorage.getItem("userToken")
          }
        })
        console.log(data);
        setwishlistDetails(data)
      } catch (error) {
        console.log(error);
      }
      finally{
        setisLoading(false)
      }
    }
    async function DeleteWish(id){
      console.log("Deleting wishlist item with ID:", id); 
      try {
        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
          headers :{
            token: localStorage.getItem("userToken")
          }
        })
        console.log(data);
        setwishlistDetails(data)
        
      } catch (error) {
        console.log(error);
      }finally{
        setisLoading(false)
      }
    }

   
    
  return (
    <div>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div className="flex justify-between mx-8 m-4">
    <h2 className='font-semibold text-4xl mt-5 px-6'>My Wish List</h2>
  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          add
        </th>
      </tr>
    </thead>

    {wishlistDetails?.data?.map((wishProd)=>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={wishProd.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <div className="flex flex-col ">
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {wishProd.title}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {wishProd.price} EGP
        </td>
        <td className="px-6 py-4">
          <button onClick={() => DeleteWish(wishProd._id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
        </div>
        <td>
          {/* احط زرار اللبي بيربط بالكارت */}
      <button onClick={()=>addProduct(wishProd.id)} className='border-green-500 border-2 bg-transparent rounded-xl text-black mx-auto p-5 hover:bg-green-500' >Add To Cart</button>
        </td>
      </tr>
    </tbody>
    )}
  </table>
</div>



    </div>
  )
}
