import { useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {User} from "../../Contexts/UserContext";
import { useContext } from "react";
import { baseUrl } from "../Dashboard/Variables";
export default function Login() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [err,seterr]=useState("");
  const [load,setload]=useState(false);
  const cookie=new Cookies();
  const navigate=useNavigate();
  let currentUser=useContext(User);

  function handleform(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    setload(true);
    try {
      const res=await axios.post(`${baseUrl}/api/login`, form);
      
      setload(false);
      const token=res.data.token;
      cookie.set("Bearer",token,{path:"/"});
      currentUser.setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setload(false);
      seterr(err.response.data.message);
    }
  }
  return (
    <div className="container">
      <div className="row" style={{margin:"auto"}}>
        <form className="reg-log" onSubmit={submit}>
          <div className="half">
            <h1>Login</h1>
            <div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                onChange={handleform}
                ></input>
                <label>Email</label>
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={handleform}
                minLength="8"
                ></input>
                <label>Password</label>
            </div>
            {load?<Loading border={"6px solid #2563eb"}/>:<button style={{marginBottom:"50px", display:"block"}}>Login</button>}
            {err!==""&&<span className="error">{err}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}