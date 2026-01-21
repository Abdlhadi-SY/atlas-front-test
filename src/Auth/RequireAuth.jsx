import { Outlet} from "react-router-dom";
import Cookies from "universal-cookie";
export default function RequireAuth(){
    const cookie=new Cookies();
    const token=cookie.get("Bearer");
    if(!token)
        window.location.pathname="/login";
    else
        return <Outlet></Outlet>
}