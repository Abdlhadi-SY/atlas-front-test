import { useContext, useEffect, useState } from "react";
import { Modback } from "../Context/ItemContext";
import Itemform from "../Component/Itemform";
import axios from "axios";
import Cookies from "universal-cookie";
import {baseUrl} from "../Variables";
export default function Updateitem({id}){
        
    const cookie=new Cookies();
    const token=cookie.get("Bearer");
    const [flag,setFlag]=useState(false);
    const [items,setItems]=useState({
        code:"",
        name:"",
        category_id:"",
        unit:"",
        quantity_in:0,
        quantity_low:0,
        cost_price:0,
        sell_price:0,
    })
    useEffect(()=>{
        axios.get(`${baseUrl}/api/showItem`,{
            headers:{
                Authorization:"Bearer "+  token
            },
            params:{
                id:id
            }
        })
        .then((res)=>{
            setItems(res)
            setFlag(true);
        })
        .catch((err)=>console.log(err))
    },[])

    return(<Itemform header={"تعديل مهمة "} content={"تعديل"} items={items}></Itemform>);   
}