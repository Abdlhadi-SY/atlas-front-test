import React from "react";
import { Nav } from "./Navlink";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
   const Navs=Nav.map((n,index)=>
        <NavLink   key={index} to={n.to} className={({ isActive }) => isActive ? "nav active" : "nav"}>
          <p className="m-0-10">{n.title}</p>
        </NavLink>
    )
  return (
    <div className="sidebar">
      <h3 className="logo">نظام المستودعات</h3>
      <ul className="menu">
        {Navs}
      </ul>
    </div>
  );
};
