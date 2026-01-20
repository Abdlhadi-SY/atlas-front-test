import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Topbar from "../Component/Topbar";
import "../Css/Tasks.css"

export default function  Dashboard (){
  return (
    <div className="layout">
        <Sidebar />
        <div className="main-content">
        <Topbar />
        <div className="content">
            <div className="content-header">
            <h2>قائمة المواد</h2>
            <button className="add-btn">+ إضافة مادة جديدة</button>
        </div>
        <Outlet></Outlet>
        </div>
    </div>
    </div>
  );
};

