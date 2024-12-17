import React, { useEffect, useState } from 'react'
import style from './layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    const [counter, setcounter] = useState(0)
    useEffect(() => {
    console.log("template name is mounted");
    
    }, [])
  return (
    <div>
        <Navbar />
        
        {/* <p>counter is {counter}</p> */}

        <Outlet />


    </div >
  )
}
