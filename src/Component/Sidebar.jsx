import React from "react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="logo">نظام المستودعات</h3>

      <ul className="menu">
        <li className="active">قائمة المواد</li>
        <li>قائمة الفواتير</li>
        <li>فاتورة جديدة</li>
        <li>تنبيهات المخزون</li>
        <li>التقارير</li>
        <li>الإعدادات</li>
      </ul>
    </div>
  );
};
