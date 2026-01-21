import React from "react";

export default function Topbar ({header}){
    return (
    <div className="topbar">
        <div className="topbar-right">
            <h2>{header}</h2>
        </div>
    <div className="topbar-left">
         <span className="icon">🔔</span>
         <span className="icon">👤</span>
        <input
            type="text"
            placeholder="بحث"
            className="search-input"
        />
    </div>
    </div>
    );
};