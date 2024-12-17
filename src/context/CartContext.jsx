import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const CartContext = createContext();


export default function CartContextProvider({children}){
    const [Cart, setCart] = useState(0)
    const [isLoading, setisLoading] = useState({
        getCart : false ,
        updateCart : false ,
        addProduct : false ,
    })
    const [Errmsg, setErrmsg] = useState({
        getCart : null ,
        updateCart : null ,
        addProduct : null ,
    });
    const [CartDetails, setCartDetails] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)


    async function addProduct(id) {
      setisLoading((prev)=>{return({...prev , addProduct: true})})
      let toastt = toast.loading("ADDING ... ")

      try {
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,
          {
            "productId" : id
          } ,
          {
            headers : {
              token: localStorage.getItem("userToken")
            }
          }
          )
          console.log(data);
          getCart()
          toast.success(
            <div className="p-4 font-medium"> Added to Cart Succesfully</div>,{
            position :"top-right"
          })
      } catch (error) {
        console.log(error);
        setErrmsg((prev)=>{return({...prev , addProduct : error})})

      }finally{
        setisLoading((prev)=>{return({...prev , addProduct: false})})
        toast.dismiss(toastt)
      }
      }


    async function getCart() {
        setisLoading((prev)=>{return({...prev , getCart : true})})
        try {
          const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
            headers :{
              token: localStorage.getItem("userToken")
            }
          })
          console.log(data);
          setCartDetails(data)
          setnumOfCartItems(data.numOfCartItems)
        //   data.numOfCartItems ==0 ? setCartDetails(null) : setCartDetails(data)
        } catch (error) {
            setErrmsg((prev)=>{return({...prev , getCart : error})})
        }
        finally{
          setisLoading((prev)=>{return({...prev , getCart : false})})
        }
      }


      // async function updateCart(id, count) {
      //   if (count < 1) return; 
      //   const toastId = toast.loading("جاري التحميل...");
        
      //   try {
      //     const { data } = await axios.put(
      //       `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      //       { count },
      //       { headers: { token: localStorage.getItem("userToken") } }
      //     );
      //     console.log(data);
          
      //   } catch (error) {
      //     console.error(error.response?.data || error.message);
      //     toast.error("فشل تحديث الكارت!");
      //   } finally {
      //     toast.dismiss(toastId);
      //   }
      // }


      async function updateCart(id, count) {
        if (count <= 0) {
          toast.error("Quantity cannot be less than 1");
          return;
        }
        
        const token = localStorage.getItem("userToken");
        if (!token) {
          toast.error("User not authenticated. Please log in again.");
          return;
        }
        
        setisLoading(true);
        try {
          const { data } = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { count },
            {
              headers: { token },
            }
          );
          console.log(data);
          setCartDetails(data);
          setnumOfCartItems(data.numOfCartItems);
          toast.success("Updated successfully");
        } catch (error) {
          // Log the detailed error message
          if (error.response) {
            console.error("Response error:", error.response.data.message);
            toast.error(`Failed to update: ${error.response.data.message}`);
          } else if (error.request) {
            console.error("Request error:", error.request);
            toast.error("Failed to update: No response from server");
          } else {
            console.error("Unexpected error:", error.message);
            toast.error(`Failed to update: ${error.message}`);
          }
        } finally {
          setisLoading(false);
        }
      }
      
      

      async function DeleteProduct(id){
        let toastt = toast.loading("DELETING ..")
        try {
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
            headers :{
              token: localStorage.getItem("userToken")
            }
          })
          console.log(data);
          setCartDetails(data)
          
        } catch (error) {
          console.log(error);
        }finally{
          toast.dismiss(toastt)
        }
      }

      async function pay(cartId, shippingAddress) {
        let toastt = toast.loading("Checking out...");
        try {
          const { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
            { shippingAddress },
            {
              headers: {
                token: localStorage.getItem("userToken")
              }
            }
          );
      
          
          if (data?.session?.url) {
            window.location.href = data.session.url;
          }
          // if (data.message === "Success") {
          //   toast.success("Your order is done!", { position: "top-right" });
          // }
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
          toast.error("Checkout failed. Please try again.");
        } finally {
          toast.dismiss(toastt);
        }
      }
      
  
      // async function pay(cartId , shippingAddress) {
      //   try {
      //     const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`, 
      //       {
      //         "shippingAddress": shippingAddress
      //           } ,
      //           {
      //             headers : {
      //               token : localStorage.getItem("userToken")
      //             }
      //           })
      //     console.log(data);
          
      //   } catch (error) {
      //     console.log("Error:", error.response?.data || error.message);
      //   }
      // }

      async function clearCart(id){
            try {
              const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers :{
                  token: localStorage.getItem("userToken")
                }
              })
              console.log(data);
              setCartDetails(data)
            } catch (error) {
              console.log(error);
              
            }
          }
  


    return <CartContext.Provider  value={ { getCart , isLoading , Errmsg , numOfCartItems , CartDetails  , addProduct  , DeleteProduct , pay , updateCart , clearCart } }> 

{children}

    </CartContext.Provider>
 }