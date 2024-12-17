import React, { useContext, useEffect, useState } from 'react'
import style from './cart.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';



export default function Cart() {
  const{getCart ,pay , isLoading , Errmsg , numOfCartItems , CartDetails  , DeleteProduct  , updateCart , clearCart} = useContext(CartContext)
    
    useEffect(() => {
    console.log("template name is mounted");
    getCart()
    }, [])
    console.log({getCart , isLoading , Errmsg , numOfCartItems , CartDetails});
    

    // if(isLoading){
    //   return <>
      
    //   <div className="fixed inset-0 flex items-center justify-center text-7xl z-50 ">
    //       <div>
    //         <i className="fa-duotone fa-solid fa-spinner fa-spin-pulse text-black  " />
    //       </div>
    //     </div>
    //   </>
    // }
    if(CartDetails==null){
      return <> 
          <h2 className='font-bold text-4xl mt-5 px-6'>Cart Shop</h2>
      <div className='font-semibold text-3xl mt-5 px-6'>Your Cart is empty </div>
        </>
    }
    if (isLoading.getCart) {
      return (
        <div className='fixed inset-0 flex items-center justify-center text-9xl z-50'> 
          <div> <i className="fa-duotone fa-solid fa-spinner fa-spin-pulse" />
          </div>
            </div>
        )
    }
    
  return (
  <>
  

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div className="flex flex-col sm:flex-row justify-between mx-8 m-4">
    <h2 className="font-bold text-4xl mb-4 sm:mb-0">Cart Shop</h2>
    {/* احط الفانكشن بتاعت الدفع */}
    <button
      onClick={() => pay}
      className="bg-blue-600 text-white rounded-md p-3 text-2xl"
    >
      <Link to={"/Checkout"}> Check out</Link>
    </button>
  </div>

  <div className="flex flex-col sm:flex-row justify-between mx-8 mb-4">
    <span className="font-medium text-2xl mb-2 sm:mb-0">
      Total Price:{" "}
      <span className="text-green-500 font-bold">
        {CartDetails?.data?.totalCartPrice}
      </span>
    </span>
    <span className="font-medium text-2xl">
      Items:{" "}
      <span className="text-green-500 font-bold">
        {CartDetails?.numOfCartItems}
      </span>
    </span>
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
          Qty
        </th>
      </tr>
    </thead>

    {CartDetails?.data?.products?.map((item) => (
            <tbody key={item.product.id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item.product.title}
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.product?.title}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <svg onClick={() => updateCart(item.product.id, item.count - 1)} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <p>{item.count}</p>
                    <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                      <svg onClick={() => updateCart(item.product.id, item.count + 1)} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => DeleteProduct(item.product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>



              </tr>
            </tbody>
          ))}



    {/* {CartDetails?.data?.products?.map((item) => (
      <tbody key={item.product.id}>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <img
              src={item.product.imageCover}
              className="w-16 md:w-32 max-w-full max-h-full"
              alt={item.product.title}
            />
          </td>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item.product.title}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item.product.Price} EGP
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => DeleteProduct(item.product.id)}
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Remove
              </button>
            </td>
          </div>

          <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <button
                
                className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-black border-green-600 rounded-lg focus:outline-none"
                type="button"
              >
                <svg
                onClick={() => updateCart(item.product.id, item.product.count - 1)}
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <div>
                <p>{item.count}</p>
              </div>
              <button
                
                className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <svg
                onClick={() => updateCart(item.product.id, item.product.count + 1)}
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    ))} */}
  </table>

  <div className="flex justify-center items-center mt-4">
    <button
      onClick={clearCart}
      className="border-2 border-green-500 bg-transparent rounded-xl text-black p-5 transition-colors duration-300 hover:bg-green-500 hover:text-white"
    >
      Clear Your Cart
    </button>
  </div>
</div>



  </>
  )
}
