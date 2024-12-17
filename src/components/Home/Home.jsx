import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Cards from "../Cards/Cards";
import Products from "../Products/Products";



export default function Home() {


  useEffect(() => {
    console.log("template name is mounted");
    getProducts();
  }, []);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 3000,
  });

  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // function renderProducts() {
  //   var producttoHtml = data?.data?.data?.map((Product) => (
  //     <>
  //       <Cards Product={Product} />
  //     </>
  //   ));
  //   return producttoHtml;
  // }

  return (
    <div>
      <MainSlider />

      <CategorySlider />

      <Products/>
{/* 
      {data?.data?.data?.length == 0 ? (
        <div className="fixed inset-0 flex items-center justify-center text-7xl z-50 ">
          <div>
            {" "}
            <i className="fa-duotone fa-solid fa-spinner fa-spin-pulse text-white " />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 ">{renderProducts()}</div>
      )} */}
    </div>
  );
}
