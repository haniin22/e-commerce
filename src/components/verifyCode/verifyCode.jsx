import React, { useEffect, useState } from 'react'
import style from './verifyCode.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { Formik, useFormik } from 'formik';



export default function VerifyCode() {
    const [counter, setcounter] = useState(0)
    const [Errmsg, setErrmsg] = useState("");
    const [Isloading, setIsloading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
    console.log("template name is mounted");
    }, [])

    const schema = yup.object().shape({
      resetCode : yup.string().required("code is required"),
    })


    const x = useFormik({
      initialValues : {
        resetCode : '' ,
      },
      onSubmit : handleSubmit,
      validationSchema: schema
    })
    console.log(x.errors);


    async function handleSubmit(x) {
      console.log("hiiii");
      
      setIsloading(true);
      try {
        const {data} = await axios.post( "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", x);
        console.log(data);
        if(data.status == 'Success'){
          navigate('/ResetPassword')
        }

      } catch (error) {
        console.log(error.response.data.message);
        setErrmsg(error.response.data.message);
      } finally {
        setIsloading(false);
      }
    }




  return (
    <div>
  <form onSubmit={x.handleSubmit} className="max-w-sm mx-auto">
  {
    Errmsg ? 
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span class="font-medium"></span> {Errmsg}
  </div>
  : null
  }
  <h2 className='text-green-500 my-5 font-semibold text-2xl'> reset your account password </h2>
  <div className="mb-5">
    <input  name='resetCode'
    onChange={x.handleChange}
    onBlur={x.handleBlur} 
    value={x.values.resetCode}
    type="text"
    placeholder='Code'
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  />
  </div>
  

  <button type="submit" 
  className="text-black border-green-400 border-2 bg-transparent hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Verfiy
  </button>
</form>
    </div>
  )
}
