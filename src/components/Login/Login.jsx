import React, { useEffect, useState } from 'react'
import style from './login.module.css'
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import axios from 'axios';



export default function login() {
    const [Errmsg, setErrmsg] = useState("");
    const navigate = useNavigate();
    const [Isloading, setIsloading] = useState(false);
    

    useEffect(() => {
    console.log("template name is mounted");
    }, [])

    const schema = yup.object().shape({
          email: yup.string().required("email is required").email("Invalid email format"),
          password: yup.string().required("password is required").matches(/^[A-Za-z0-9]{6,10}$/ )
        })

const x = useFormik({
      initialValues : {
        email : '' ,
        password : ""
      },
      onSubmit : handleSubmit,
      validationSchema: schema
    })
    console.log(x.errors);



    async function handleSubmit(values) {
      setIsloading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        console.log("Login successful:", data);
        localStorage.setItem("userToken", data.token); 
        navigate("/Home");
      } catch (error) {
        console.error("Error during login:", error.response?.data?.message || error.message);
        setErrmsg(error.response?.data?.message || "An error occurred during login.");
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
  <h2 className='text-green-500 my-5'>login Form</h2>
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


  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input  name='password'
    onChange={x.handleChange}
    onBlur={x.handleBlur} 
    value={x.values.password} 
    type="password"
    id="password" 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
  </div>
  {
    x.errors.password && x.touched.password ? 
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium"></span> {x.errors.password}
</div>
:""
}


  <button type="submit" 
  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {
      Isloading? <i className="fa-regular fa-spinner fa-spin-pulse" style={{color: '#f0f0f0'}} />
: "Login"
    }
  </button>
</form>
<Link to={"/Forget"}>
<button  className='font-semibold text-xl text-center mx-96 my-3 underline underline-offset-4 '>Forget Your Password ?</button>
</Link>

    </div>
  )
}
