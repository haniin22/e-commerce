import React, { useEffect, useState } from 'react'
import style from './templateName.module.css'

export default function templateName() {
    const [counter, setcounter] = useState(0)
    useEffect(() => {
    console.log("template name is mounted");
    
    }, [])
  return (
    <div>
        <h2>templateName</h2>
        <p>counter is {counter}</p>
    </div>
  )
}
