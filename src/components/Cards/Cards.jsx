import { useEffect, useState } from "react";
import style from "./cards.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import { loadESLint } from "eslint";

export default function Cards({ Product }) {
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    console.log("template name is mounted");
  }, []);

  // async function addToCart(id) {
  //   try {
  //     const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,
  //       {
  //         "productId" : id
  //       } ,
  //       {
  //         headers :{
  //           token:localStorage.getItem('token')
  //         }
  //       })
  //       console.log(data);
  //   } catch (error) {
  //     console.log("the error is " ,error);
  //   }
  // }
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Wrapping the relevant parts with <Link> */}
        <Link to={`/Details/${Product.id}`}>
          <div>
            <img className="rounded-t-lg" src={Product.imageCover} alt="" />
            <div className="p-5">
              <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                {Product.category.name}
              </h5>
              <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                {Product.title}
              </h5>
              <div className="flex justify-between align-middle">
                <span>{Product.price} EGP</span>
                <span>
                  {Product.ratingsAverage}
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#e0b20b" }}
                  />
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex justify-center align-middle p-5">
          <button
            onClick={() => addToCart(Product.id)}
            className="justify-center items-center mt-4 px-20 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            + ADD
          </button>
          <span className="ml-4">
            <i
              className="fa-solid fa-heart text-3xl"
              style={{ color: "#000000" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
