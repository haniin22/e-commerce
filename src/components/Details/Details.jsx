import React, { useEffect, useState } from 'react'
import style from './details.module.css'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function Details() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
  };
    const [counter, setcounter] = useState(0)
    const x =useParams()
    console.log(x);
    const [productDetails, setproductDetails] = useState()
    const [isLoading, setisLoading] = useState(false)

    async function getproductDetails() {
      setisLoading(true)
      try {
        const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + x.id)
        console.log(data.data);
        setproductDetails(data.data)
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false)
      }
    }
  
    useEffect(() => {
      console.log("template name is mounted");
      getproductDetails()
      }, [])
  
      if(isLoading){
        return (
        <div className='fixed inset-0 flex items-center justify-center text-9xl z-50'> 
          <div> <i className="fa-duotone fa-solid fa-spinner fa-spin-pulse  " />
          </div>
            </div>
        )
      }
  return (
    <div>
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 sm:col-span-4'>
        <Slider {...settings}>
          {
            productDetails?.images.map((img, index) => (
              <div key={index}>
                <img src={img} className='w-full' alt={`product-image-${index}`} />
              </div>
            ))
          }
        </Slider>
      </div>
      
      <div className='col-span-12 sm:col-span-8 flex flex-col justify-center gap-4'>
        <h2 className="text-xl sm:text-2xl font-semibold">{productDetails?.title}</h2>
        <p className="text-sm sm:text-base">{productDetails?.description}</p>
  
        <div className='flex justify-between items-center'>
          <span className="text-lg font-semibold">{productDetails?.price} EGP</span>
          <span className="flex items-center text-lg">
            {productDetails?.ratingsAverage}
            <i className="fa-solid fa-star" style={{color: '#e0b20b'}} />
          </span>
        </div>
        
        <div className='flex items-center gap-4'>
        <button className='bg-green-400 w-full text-white py-2 px-4 rounded-md hover:bg-green-500 transition-all'>
          + ADD
        </button>
        <span>
          <i className="fa-solid fa-heart text-3xl" style={{color: '#000000'}} />
        </span>
      </div>
      </div>
    </div>
  </div>
  
  )
}
