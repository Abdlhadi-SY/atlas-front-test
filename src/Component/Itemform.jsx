import { useContext, useEffect, useState } from "react";
import { Modback } from "../Context/ItemContext";
import "../Css/Modal.css"
import axios from "axios";
import { baseUrl } from "../Variables";
import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { ChangeItems } from "../Context/ChangeItems";
import { toast } from 'sonner';
export default function Itemform({header,content,item}){   
    const {setOpen}=useContext(Modback);
    const [error,setError]=useState("");
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
        try{
        if(item.id){
            await axios.put(`${baseUrl}/api/v1/items/${item.id}`,form,{
                headers:{
                        Authorization:"Bearer " + cookie.get("Bearer")
                },
            }).then(()=>{
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
            });
        }
        else{
            await axios.post(`${baseUrl}/api/v1/items`,form,{
                headers:{
                        Authorization:"Bearer " + cookie.get("Bearer")
                },
            }).then(()=>{
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

            });
        }
        
        setOpen(false);
        setChange((pre)=>!pre)
        navigate("/dashboard/items");
        } catch (err) {
            console.log(err);
            // setError(err.response.data.message)
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
                                required
                                placeholder="ادخل كود المادة"
                                onChange={handleform}
                                ></input>
                        </div>
                        <div>
                            <label>اسم المادة</label>
                            <input
                                value={form.name}
                                name="name"
                                type="text"
                                required
                                placeholder="ادخل اسم المادة"
                                onChange={handleform}
                                ></input>
                        </div>
                        <div>
                            <label>الفئة</label>
                            <select style={{borderRadius:"12px",padding:"10px"}} value={form.category_id} name="category_id" onChange={handleform}>
                                <option value={""} disabled>اختر الفئة</option>
                                {showCategories}
                            </select>
                        </div>
                        <div>
                            <label>الوحدة</label>
                            <input
                                value={form.unit_name}
                                name="unit_name"
                                type="text"
                                required
                                placeholder="ادخل اسم الوحدة"
                                onChange={handleform}
                                ></input>
                        </div>
                        <div>
                            <label>الكمية</label>
                            <input
                                value={form.quantity_in}
                                name="quantity_in"
                                type="number"
                                required
                                onChange={handleform}
                                ></input>
                        </div>
                        <div>
                            <label>الحد الادنى للكمية</label>
                            <input
                                value={form.quantity_low}
                                name="quantity_low"
                                type="number"
                                required
                                onChange={handleform}
                                ></input>
                        </div>
                        <div>
                            <label>سعر المبيع</label>
                            <input
                                value={form.sell_price}
                                name="sell_price"
                                type="number"
                                required
                                onChange={handleform}
                                ></input>
                        </div>
                        <div>
                            <label>سعر الشراء</label>
                            <input
                                value={form.cost_price}
                                name="cost_price"
                                type="number"
                                required
                                onChange={handleform}
                                ></input>
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