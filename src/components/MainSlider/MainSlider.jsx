import React, { useEffect, useState } from 'react'
import style from './mainSlider.module.css'
import Slider from 'react-slick'
import img1 from '../../assets//XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg' 
import img2 from '../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import img3 from '../../assets/41nN4nvKaAL._AC_SY200_.jpg'
import img4 from '../../assets/61cSNgtEISL._AC_SY200_.jpg'
import img5 from '../../assets/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'


export default function MainSlider() {
    const [counter, setcounter] = useState(0)
    useEffect(() => {
    console.log("template name is mounted");
    
    }, [])
  return (
    <div>
  <div className="grid grid-cols-12 gap-4 mb-16 mt-6">
    
    <div className="col-span-12 md:col-span-8 flex justify-center items-center">
      <Slider 
        arrows={false} 
        dots={true} 
        className="w-full max-w-md md:max-w-lg lg:max-w-xl"
      >
        <img className="h-[300px] md:h-[400px]  w-full " src={img3} alt="" />
        <img className="h-[300px] md:h-[400px]  w-full " src={img5} alt="" />
        <img className="h-[300px] md:h-[400px]  w-full " src={img4} alt="" />
      </Slider>
    </div>

    
    <div className="col-span-12 md:col-span-4 flex flex-col ">
      <img className="w-full h-[150px] md:h-[200px] " src={img1} alt="" />
      <img className="w-full h-[150px] md:h-[200px] " src={img2} alt="" />
    </div>
  </div>
</div>

  )
}
