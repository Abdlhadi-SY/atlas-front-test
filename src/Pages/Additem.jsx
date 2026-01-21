import { useState } from "react";
import Itemform from "../Component/Itemform";

export default function Additem(){
    const item={
            code:"",
            name:"",
            category_id:"",
            unit:"",
            quantity_in:0,
            quantity_low:0,
            cost_price:0,
            sell_price:0,
        }
    return(<Itemform header={"اضافة مهمة جديدة"} content={"اضافة"} item={item}></Itemform>);
}