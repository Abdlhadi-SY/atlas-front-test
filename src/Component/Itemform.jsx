import { useContext, useState } from "react";
import { Modback } from "../Context/ItemContext";
import "../Css/Modal.css"
export default function Itemform({header,content}){
    const {setOpen}=useContext(Modback);
    const [form,setForm]=useState({
        code:"",
        name:"",
        category_id:"",
        unit:"",
        quantity_in:0,
        quantity_low:0,
        cost_price:0,
        sell_price:0,
    });
    function handleform(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
//   async function submit(e) {
//     e.preventDefault();
//     setload(true);
//     try {
//       await axios.post(`${baseUrl}/api/${end}`, form,{
//           headers:{
//                     Authorization:"Bearer " + cookie.get("Bearer")
//                 },
//       });
//       setload(false);
//       navigate("/dashboard/tasks");
//     } catch (err) {
//       console.log(err)
//       setload(false);
//       seterr(err.response.data.message);
//     }
//   }

    return(
        <div className="modal-backdrop">
            <div className="modal-box">       
                <button className="close-btn" onClick={() => setOpen(false)}>
                    ✕
                </button>
                <div className="modal-content">
                    <h1>{header}</h1>
                    <form className="item" >
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
                                <option value={""}>اختر الفئة</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </div>
                        <div>
                            <label>الوحدة</label>
                            <input
                                value={form.unit}
                                name="unit"
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
                            <button className="add-btn">{content}</button>
                            <button className="add-btn exit" style={{color:"black"}} onClick={() => setOpen(false)} >الغاء</button>
                        </div>
                </div>
            </div>
        </div>
    );

}