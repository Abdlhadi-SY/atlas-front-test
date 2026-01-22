import { createContext, useState } from "react";

export const ChangeItems=createContext();
export default function ChangeItemContext({children}){
    const [change,setChange]=useState(false);
    return <ChangeItems.Provider value={{change,setChange}}>{children}</ChangeItems.Provider>
}