import React from "react";

import { useState, useEffect } from "react";
export default function Topbar ({header,setQuery,flag}) {
    
    const [search, setSearch] = useState("");
    useEffect(() => {
    const timer = setTimeout(() => {
        setQuery(search);
    }, 1000); 
    return () => clearTimeout(timer);
    }, [search]);

    return (
    <div className="topbar">
        <div className="topbar-right">
            <h2>{header}</h2>
        </div>
    <div className="topbar-left">
         <span className="icon">🔔</span>
         <span className="icon">👤</span>
        {flag && <input
            type="text"
            placeholder="بحث"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />}
    </div>
    </div>
    );
};