import { createContext, useState } from "react";

 export const context = createContext();


 export default function counterContextProvider({children}){
    const [Counter, setCounter] = useState(0)
    return <context.Provider  value={ {Counter:Counter , setCounter: setCounter} }> 

{children}

    </context.Provider>
 }