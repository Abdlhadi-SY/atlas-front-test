import { useContext, useEffect, useState } from "react";
import { Modback } from "../Context/ItemContext";
import "../Css/Modal.css"
import axios from "axios";
import { baseUrl } from "../Variables";
import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { ChangeItems } from "../Context/ChangeItems";
import { toast } from 'sonner';
import { createItemApi, updateItemApi } from "../API/ItemsApi";
import { itemSchema } from "../Validation/ItemSchema";
export default function Itemform({header,content,item}){   
    const {setOpen}=useContext(Modback);
    const [error,setError]=useState("");
    const [errors, setErrors] = useState({});

    const [categories,setCategories]=useState([]);
    const cookie=new Cookies();
    const {setChange}=useContext(ChangeItems)
    const [form,setForm]=useState({
        code : item.code,
        name : item.name,
        category_id : item.category_id,
        unit_name : item.unit.name??"",
        quantity_in : item.quantity_in,
        quantity_low : item.quantity_low,
        cost_price : item.cost_price,
        sell_price : item.sell_price,
    });
    const navigate=useNavigate();
    
    function handleform(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    useEffect(()=>{
        axios.get(`${baseUrl}/api/v1/categories`)
        .then((data)=>setCategories(data.data.data))
        .catch((err)=>console.log(err)
        )
    },[])
    const showCategories=categories.map((category,index)=><option key={index} value={category.id}>{category.name}</option>)
    async function submit(e) {
        e.preventDefault();
        const parsedData = {
            ...form,
            category_id: Number(form.category_id),
            quantity_in: Number(form.quantity_in),
            quantity_low: Number(form.quantity_low),
            sell_price: Number(form.sell_price),
            cost_price: Number(form.cost_price),
        };
        const result = itemSchema.safeParse(parsedData);
        if (!result.success) {
            console.log(result.error.format());
            setErrors(result.error.format());
            return; 
        }


        try{
        if(item.id){
            await updateItemApi(item.id,form);
            toast.success('تم التعديل بنجاح', {
                duration: 5000,
                 style: {
                    background: 'green', 
                    color: 'white',     
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                }
            });
        }
        else{
            await createItemApi(form);
            toast.success('تمت الاضافة بنجاح', {
                duration: 5000,
                 style: {
                    background: 'green', 
                    color: 'white',     
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                }
            });
        }
        
        setOpen(false);
        setErrors({});
        setChange((pre)=>!pre)
        navigate("/dashboard/items");
        } catch (err) {
            console.log(err);
            setError(err.response.data.message)
        }
    }

    return(
        <div className="modal-backdrop">
            <div className="modal-box">       
                <button className="close-btn" onClick={() => setOpen(false)}>
                    ✕
                </button>
                <div className="modal-content">
                    <h1>{header}</h1>
                    <form id="myForm" className="item" onSubmit={submit} >
                        <div>    
                            <label>كودالمادة</label>
                            <input
                                name="code"
                                value={form.code}
                                type="text"
                                placeholder="ادخل كود المادة"
                                onChange={handleform}
                                ></input>
                                {
                                <small className="error-zod">
                                    {errors.code?._errors[0]}
                                </small>
                                }
                        </div>
                        <div>
                            <label>اسم المادة</label>
                            <input
                                value={form.name}
                                name="name"
                                type="text"
                                placeholder="ادخل اسم المادة"
                                onChange={handleform}
                                ></input>
                                 {
                                <small className="error-zod">
                                    {errors.name?._errors[0]}
                                </small>
                                }
                        </div>
                        <div>
                            <label>الفئة</label>
                            <select style={{borderRadius:"12px",padding:"10px",marginBlock:"5px"}} value={form.category_id} name="category_id" onChange={handleform}>
                                <option value={""} disabled>اختر الفئة</option>
                                {showCategories}
                            </select>
                            {
                                <small className="error-zod">
                                    {errors.category_id?._errors[0]}
                                </small>
                            }
                            
                        </div>
                        <div>
                            <label>الوحدة</label>
                            <input
                                value={form.unit_name}
                                name="unit_name"
                                type="text"
                                placeholder="ادخل اسم الوحدة"
                                onChange={handleform}
                                ></input>
                                 {
                                <small className="error-zod">
                                    {errors.unit_name?._errors[0]}
                                </small>
                                }
                        </div>
                        <div>
                            <label>الكمية</label>
                            <input
                                value={form.quantity_in}
                                name="quantity_in"
                                type="number"
                                onChange={handleform}
                                ></input>
                                 {
                                <small className="error-zod">
                                    {errors.quantity_in?._errors[0]}
                                </small>
                                }
                        </div>
                        <div>
                            <label>الحد الادنى للكمية</label>
                            <input
                                value={form.quantity_low}
                                name="quantity_low"
                                type="number"
                                onChange={handleform}
                                ></input>
                                 {
                                <small className="error-zod">
                                    {errors.quantity_low?._errors[0]}
                                </small>
                                }
                        </div>
                        <div>
                            <label>سعر المبيع</label>
                            <input
                                value={form.sell_price}
                                name="sell_price"
                                type="number"
                                onChange={handleform}
                                ></input>
                                 {
                                <small className="error-zod">
                                    {errors.sell_price?._errors[0]}
                                </small>
                                }
                        </div>
                        <div>
                            <label>سعر الشراء</label>
                            <input
                                value={form.cost_price}
                                name="cost_price"
                                type="number"
                                onChange={handleform}
                                ></input>
                                 {
                                <small className="error-zod">
                                    {errors.cost_price?._errors[0]}
                                </small>
                                }
                        </div>
                    </form>
                    <div className="d-flex" style={{marginBlock:"15px"}}>
                        <button type="submit" form="myForm" className="add-btn">{content}</button>
                        <button className="add-btn exit" style={{color:"black"}} onClick={() => setOpen(false)} >الغاء</button>
                    </div>
                    {error&&<p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );

}