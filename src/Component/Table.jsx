import React, { useState } from "react";

export default function Table () {
  const [data, setData] = useState([
    {
      code: "M001",
      name: "حديد",
      category: "مواد بناء",
      quantity: 50,
      unit: "كغ",
      price: 10
    },
    {
      code: "M002",
      name: "إسمنت",
      category: "مواد بناء",
      quantity: 20,
      unit: "كغ",
      price: 7
    }
  ]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    let direction = "asc";

    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortColumn(column);
    setSortDirection(direction);
    setData(sortedData);
  };

  const renderArrow = (column) => {
    if (sortColumn !== column) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="table-container">
      <table className="materials-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("code")}>
              كود المادة {renderArrow("code")}
            </th>
            <th onClick={() => handleSort("name")}>
              اسم المادة {renderArrow("name")}
            </th>
            <th onClick={() => handleSort("category")}>
              الفئة {renderArrow("category")}
            </th>
            <th onClick={() => handleSort("quantity")}>
              الكمية {renderArrow("quantity")}
            </th>
            <th onClick={() => handleSort("unit")}>
              الوحدة {renderArrow("unit")}
            </th>
            <th onClick={() => handleSort("price")}>
              سعر الوحدة {renderArrow("price")}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">
                لا توجد بيانات للعرض
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};