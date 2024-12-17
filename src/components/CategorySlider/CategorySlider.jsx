import React, { useEffect, useState } from 'react'
import style from './categorySlider.module.css'
import Slider from 'react-slick'
import axios from 'axios';


export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 5,
    
    customPaging: (i) => (
      <div
        style={{
          width: "15px",
          height: "10px",
          backgroundColor: "gray",
          borderRadius: "30%",
          cursor: "pointer",
        }}
      />
    ),
  };
    const [counter, setcounter] = useState(0)
    const [categories, setcategories] = useState([])
    
    async function getcategory() {
      try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data.data);
        setcategories(data.data)
        
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
    console.log("template name is mounted");
    getcategory()
    }, [])
  return (
    <div className="px-4 md:px-8 ">
  <Slider {...settings}>
    {categories?.map((cat, index) => (
      <div key={index} className=" p-2 sm:p-4">
        <div className=" rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img 
            className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px]  object-cover " 
            src={cat.image} 
            alt={cat.image} 
          />
          <div className="p-3 md:p-4 bg-white text-center">
            <h3 className=" h-[50px] s text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 md:mb-2">
              {cat.name}
            </h3>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>


  )
}
