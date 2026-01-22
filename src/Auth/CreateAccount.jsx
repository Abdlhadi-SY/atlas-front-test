
import { useState } from "react";
import axios from "axios";
import Loading from "../Component/Loading";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Variables";
import "../Css/Form.css"
export default function CreateAccount(){
  const [form, setform] = useState({
        code: "",
        name: "",
        type: ""
    });
    const [err,seterr]=useState("");
    const [load,setload]=useState(false);
    const cookie=new Cookies();
    const navigate=useNavigate();
    function handleform(e) {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    async function submit(e) {
        e.preventDefault();
        setload(true);
        try {
        const res=await axios.post(`${baseUrl}/api/v1/accounts`, form);
        setload(false);
        navigate("/dashboard/items");
        } catch (err) {
            setload(false);
            seterr(err.response.data.message);
        }
    }
  return (
            <form className="form-box" onSubmit={submit}>
            <h2 className="form-title">اضافة حساب</h2>

            <div className="form-group">
                <label>الكود</label>
                <input
                    name="code"
                    type="text"
                    required
                    placeholder="ادخل الكود"
                    onChange={handleform}
                    ></input>
            </div>

            <div className="form-group">
                <label>الاسم</label>
                <input
                    name="name"
                    type="name"
                    required
                    placeholder="ادخل الاسم"
                    onChange={handleform}
                ></input>
            </div>
            <div className="form-group">
                <label>نوع الحساب</label>
                <select style={{borderRadius:"12px",padding:"10px"}} value={form.type} name="type" onChange={handleform}>
                    <option value={""} disabled>اختر نوع الحساب</option>
                    <option value={"supplier"} >مورد</option>
                    <option value={"client"} >عميل</option>
                </select>            
            </div>

            {load?<Loading border={"6px solid #2563eb"}/>:<button type="submit" className="form-button">اضافة حساب</button>}
            {err!==""&&<span className="error">{err}</span>}
        </form>
  );
}