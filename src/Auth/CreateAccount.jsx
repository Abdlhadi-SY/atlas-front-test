import { useContext, useState } from "react";
import Loading from "../Component/Loading";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "../Css/Form.css"
import { toast } from "sonner";
import { createAccountApi } from "../API/accountsApi";
import { accountSchema } from "../Validation/AccountSchema";
export default function CreateAccount(){
    const [errors, setErrors] = useState({});
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
        try {
            const result = accountSchema.safeParse(form);
            if (!result.success) {
                console.log(result.error.format());
                setErrors(result.error.format());
                return; 
            }
        setload(true);
        await createAccountApi(form);
        toast.success('تمت اضافة الحساب بنجاح', {
                duration: 5000,
                style: {
                    background: 'green', 
                    color: 'white',     
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                }
            });
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
                    placeholder="ادخل الكود"
                    onChange={handleform}
                    ></input>
                    {
                    <small className="error-zod">
                        {errors.code?._errors[0]}
                    </small>
                    }
            </div>

            <div className="form-group">
                <label>الاسم</label>
                <input
                    name="name"
                    type="name"
                    placeholder="ادخل الاسم"
                    onChange={handleform}
                ></input>
                {
                <small className="error-zod">
                    {errors.name?._errors[0]}
                </small>
                }
            </div>
            <div className="form-group">
                <label>نوع الحساب</label>
                <select style={{borderRadius:"12px",padding:"10px"}} value={form.type} name="type" onChange={handleform}>
                    <option value={""} disabled>اختر نوع الحساب</option>
                    <option value={"supplier"} >مورد</option>
                    <option value={"client"} >عميل</option>
                </select> 
                {
                <small className="error-zod">
                    {errors.type?._errors[0]}
                </small>
                }           
            </div>

            {load?<Loading border={"6px solid #2563eb"}/>:<button type="submit" className="form-button">اضافة حساب</button>}
            {err!==""&&<span className="error">{err}</span>}
        </form>
  );
}