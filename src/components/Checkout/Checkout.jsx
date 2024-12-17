import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import style from './checkout.module.css';

export default function Checkout() {
  const { pay, CartDetails } = useContext(CartContext);

  useEffect(() => {
    console.log("Checkout component is mounted.");
    console.log("CartDetails:", CartDetails);
  }, [CartDetails]);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Details are required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must be numeric")
        .min(10, "Phone must be at least 10 digits")
        .required("Phone is required"),
      city: Yup.string().required("City is required")
    }),
    onSubmit:  (values) => {
      if (!CartDetails || !CartDetails._id) {
        toast.error("Cart details are missing. Please refresh and try again.");
        console.error("CartDetails or CartDetails._id is undefined.");
        return;
      }
       pay(CartDetails._id, values);
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="mx-10">
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
          <input
            {...formik.getFieldProps('details')}
            type="text"
            id="details"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="text-red-500 text-sm">{formik.errors.details}</div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
          <input
            {...formik.getFieldProps('phone')}
            type="tel"
            id="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input
            {...formik.getFieldProps('city')}
            type="text"
            id="city"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-transparent hover:bg-green-500 text-black border-green-300 border-2 rounded-md p-3 w-full text-xl"
        >
          PAY NOW
        </button>
      </form>
    </div>
  );
}
