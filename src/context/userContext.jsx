import { createContext, useState } from "react";


export const userContext = createContext()

export default function UserContextProvider({children}) {
    const [Token, setToken] = useState(localStorage.getItem('userToken'))
  return (
    <userContext.Provider value={{Token , setToken}}>
        {children}
    </userContext.Provider>
  )
}
