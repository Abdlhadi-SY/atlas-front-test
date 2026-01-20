import React from "react";

export default function Topbar (){
    return (
    <div className="topbar">
        <div className="topbar-right">
            <span className="icon">🔔</span>
            <span className="icon">👤</span>
        </div>
    <div className="topbar-left">
        <input
            type="text"
            placeholder="البحث في المواد..."
            className="search-input"
        />
    </div>
    </div>
    );
};