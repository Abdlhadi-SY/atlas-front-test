import { createContext, useState } from "react";

export const Modback=createContext();
export default function ItemContext({children}){
    const [open,setOpen]=useState(false);
    return <Modback.Provider value={{open,setOpen}}>{children}</Modback.Provider>
}