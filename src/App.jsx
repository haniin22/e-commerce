import { useState } from "react";
import "./App.css";
import Login from "../src/components/Login/Login";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from 'react-hot-toast';
import Products from "./components/Products/Products";
import Details from "./components/Details/Details";
import MainSlider from "./components/MainSlider/MainSlider";
import CategorySlider from "./components/CategorySlider/CategorySlider";
import Cards from "./components/Cards/Cards";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import WishList from "./components/WishList/WishList"; 
import Forget from "./components/Forget/Forget";
import VerifyCode from "./components/verifyCode/verifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Checkout from "./components/Checkout/Checkout";
import CartContextProvider from "./context/CartContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";


const routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      // {index:true , element: <register/> },
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "Home", element:<ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "Cart", element:<ProtectedRoute>  <Cart /></ProtectedRoute>  },
      { path: "Register", element: <Register /> },
      { path: "products", element: <ProtectedRoute> <Products />  </ProtectedRoute> },
      { path: "Details/:id", element:<ProtectedRoute> <Details />  </ProtectedRoute> },     
      { path: "MainSlider", element: <ProtectedRoute> <MainSlider /> </ProtectedRoute> },
      { path: "CategorySlider", element:<ProtectedRoute>  <CategorySlider /> </ProtectedRoute> },
      { path: "Cards", element: <Cards /> },
      { path: "Brands", element:<ProtectedRoute> <Brands /></ProtectedRoute>  },
      { path: "Category", element: <ProtectedRoute> <Category /> </ProtectedRoute>  },
      { path: "WishList", element: <ProtectedRoute> <WishList />  </ProtectedRoute>},
      { path: "Forget", element: <Forget/> },
      { path: "VerifyCode", element: <VerifyCode/> },
      { path: "ResetPassword", element: <ResetPassword/> },
      { path: "Checkout", element: <ProtectedRoute> <Checkout/> </ProtectedRoute>  },












    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);
  const myclient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={myclient}>
            <UserContextProvider>
        <CartContextProvider>
                  <RouterProvider router={routing} />
                  <ReactQueryDevtools/>
                  < Toaster />
        </CartContextProvider>
            </UserContextProvider>
    </QueryClientProvider>
      
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
