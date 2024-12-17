import React, { useEffect, useState } from "react";
import style from "./category.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Category() {
  const [counter, setCounter] = useState(0);
  const [SubCat, setSubCat] = useState([]); 

  useEffect(() => {
    console.log("Category component mounted");
  }, []);

  function knowCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Categories"],
    queryFn: knowCategory,
    staleTime: 3000,
  });

  async function SubCategory(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      console.log(data.data);
      setSubCat(data.data); // Update with subcategory data
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  function renderCategory() {
    return data?.data?.data?.map((cat) => (
      <div
  key={cat._id}
  className="hover:shadow-lg hover:shadow-green-400 hover:scale-105 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
>
  <Link onClick={() => SubCategory(cat._id)}>
    <img
      className="rounded-t-lg object-cover w-full h-64 sm:h-80 md:h-[300px] lg:h-[400px]"
      src={cat.image}
      alt={cat.name}
    />
  </Link>
  <div className="p-5">
    <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
      {cat.name}
    </h5>
  </div>
</div>

    ));
  }

  return (
    <div>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center text-7xl z-50">
          <i className="fa-solid fa-spinner fa-spin-pulse text-white" />
        </div>
      ) : (
        <div className="w-[80%] mx-auto">
          <div className="flex flex-wrap">
            <div className="grid grid-cols-4 gap-5">{renderCategory()}</div>
          </div>
        </div>
      )}

      {SubCat.length > 0 && (
        <div className="w-[80%] mx-auto mt-10">
          <div className="grid grid-cols-4 gap-5">
          <h3 className="text-3xl text-center font-semibold text-green-500 mb-5"> Subcategories:</h3>
            {SubCat.map((sub) => (
              <div key={sub._id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-green-200 hover:scale-105 ">

                <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {sub.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
