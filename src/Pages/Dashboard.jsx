import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import "../Css/Tasks.css"

export default function  Dashboard (){
  return (
    <div className="layout">
        <Sidebar />
        <div className="main-content">
        <div className="content">
          <Outlet></Outlet>
        </div>
    </div>
    </div>
  );
};

