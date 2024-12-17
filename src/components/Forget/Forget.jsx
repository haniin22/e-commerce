import React, { useEffect, useState } from 'react'
import style from './forget.module.css'
import { Formik, useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Forget() {
    const [counter, setcounter] = useState(0)
    const [Errmsg, setErrmsg] = useState("");
    const [Isloading, setIsloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    console.log("template name is mounted");
    }, [])

    const schema = yup.object().shape({
      email: yup.string().required("email is required").email("Invalid email format"),
    })


    const x = useFormik({
      initialValues : {
        email : '' ,
      },
      onSubmit : handleSubmit,
      validationSchema: schema
    })
    console.log(x.errors);


    async function handleSubmit(x) {
      console.log("hiiii");
      
      setIsloading(true);
      try {
        const {data} = await axios.post( "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", x);
        console.log(data);
        if(data.statusMsg == 'success'){
          navigate('/VerifyCode')
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
  <h2 className='text-green-500 my-5 font-semibold text-3xl'>enter your verification code</h2>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input name='email' 
    onChange={x.handleChange}
    onBlur={x.handleBlur} 
    value={x.values.email}
    type="email"
    id="email" 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  />
  </div>
  {
    x.errors.email && x.touched.email ? 
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium"></span> {x.errors.email}
</div>
:""
  }

  <button type="submit" 
  className="text-black border-green-400 border-2 bg-transparent hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Verfiy
  </button>
</form>

    </div>
  )
}
