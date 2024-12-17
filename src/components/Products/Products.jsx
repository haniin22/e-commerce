import React, { useContext, useEffect, useState } from "react";
import style from "./products.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { CartContext } from "../../context/CartContext";

export default function Products() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeHearts, setActiveHearts] = useState({}); 

  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    console.log("template name is mounted");
  }, []);

  function knowProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: knowProducts,
    staleTime: 3000,
  });

  async function addToWhishList(id) {
    setLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        { "productId": id },
        { headers: { token: localStorage.getItem("userToken") } }
      );
      toast.success(<div className="p-4 font-medium">Added to Wish List Successfully</div>, {
        position: "top-right"
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleHeartClick(ProductId) {
    setActiveHearts((prevState) => ({
      ...prevState,
      [ProductId]: !prevState[ProductId] 
    }));
    addToWhishList(ProductId); 
  }

  function renderProducts() {
    return data?.data?.data?.filter((Product) => {
      return search.toLowerCase() === '' ? Product : Product.title.toLowerCase().includes(search);
    }).map((Product) => (
      <div key={Product.id} className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group relative">
        <Link to={"/Details/" + Product.id}>
          <img className="rounded-t-lg" src={Product.imageCover} alt="" />
          <div className="p-5 cardBody flex-grow-1 flex flex-col">
            <h5 className="text-green-500 font-light mb-2 text-lg tracking-tight text-gray-900 dark:text-white font-semibold">
              {Product.category.name}
            </h5>
            <h3 className="truncate line-clamp-5 mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
              {Product.title.split("", 20).join(" ")}
            </h3>
            <div className="flex justify-between align-middle">
              <span>{Product.price} EGP</span>
              <span>
                {Product.ratingsAverage}
                <i className="fa-solid fa-star" style={{ color: "#e0b20b" }} />
              </span>
            </div>
          </div>
        </Link>

        <div className="p-5">
          <div className="flex justify-center align-middle mt-4">
            <button
              onClick={() => addProduct(Product.id)}
              className="mt-auto px-20 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg opacity-0 transform translate-y-10 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-300"
            >
              ADD
            </button>

            <button onClick={() => handleHeartClick(Product.id)}>
              <i
                className={`fa-solid fa-heart text-3xl ml-4 ${activeHearts[Product.id] ? 'text-red-500' : 'text-black'}`}
                style={{ color: activeHearts[Product.id] ? "#FF0000" : "#000000" }}
              />
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <form className="flex items-center mx-10 my-4">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <input onChange={(e) => setSearch(e.target.value)} type="text" id="simple-search" className="my-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search" />
        </div>
      </form>

      <div className="w-[80%] mx-auto">
        <div className="flex flex-wrap">
          <div className="grid grid-cols-4 gap-5">{renderProducts()}</div>
        </div>
      </div>
    </>
  );
}
