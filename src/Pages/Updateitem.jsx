import { useContext, useEffect, useState } from "react";
import { Modback } from "../Context/ItemContext";
import Itemform from "../Component/Itemform";
import axios from "axios";
import Cookies from "universal-cookie";
import {baseUrl} from "../Variables";
export default function Updateitem({item}){
    console.log(item.name);
    const cookie=new Cookies();
    const token=cookie.get("Bearer");
    return(<Itemform header={"تعديل مهمة "} content={"تعديل"} item={item}></Itemform>);   
}