import { useState } from "react";
import axios from "axios";
import Loading from "../Component/Loading";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Variables";
import "../Css/Form.css"
export default function Login() {
  const [form, setform] = useState({
        email: "",
        password: "",
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
        const res=await axios.post(`${baseUrl}/api/v1/login`, form);
        console.log(res);
        setload(false);
        const token=res.data.token;
        cookie.set("Bearer",token,{path:"/"});
        navigate("/dashboard");
        } catch (err) {
        setload(false);
        seterr(err);
        }
    }
            
            
            
  return (
            <form className="form-box" onSubmit={submit}>
            <h2 className="form-title">تسجيل دخول</h2>

            <div className="form-group">
                <label>الايميل</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="ادخل الايميل"
                    onChange={handleform}
                    ></input>
            </div>

            <div className="form-group">
                <label>كلمة السر</label>
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="ادخل كلمة السر"
                    onChange={handleform}
                    minLength="8"
                ></input>
            </div>

            {load?<Loading border={"6px solid #2563eb"}/>:<button type="submit" className="form-button">تسجيل دخول</button>}
            {err!==""&&<span className="error">{err}</span>}
        </form>
  );
}