import React, { useContext, useState } from "react";
import Additem from "../Pages/Additem";
import { Modback } from "../Context/ItemContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Updateitem from "../Pages/Updateitem";

export default function Table ({main,header,content1,content2}) {
  const {open}=useContext(Modback);
  const {setOpen}=useContext(Modback);
  const [idUpdate,setidUpdate]=useState(0);
  const [data, setData] = useState([
    {
      id:1,
      code:"sda"
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
  function deleteItem(id){}
  const head=header.map((obj,index)=>
    <th key={index} onClick={() => handleSort(obj.key)}>{obj.value}{renderArrow(obj.key)}</th>
  )
  function handleUpdate(id){
    setOpen(true);
    setidUpdate(id)
  }
  function handleAdd(id){
    setOpen(true);
    setidUpdate(0);
  }
  return (
    <>
      <div className="d-flex">
            <div className="d-flex" style={{width:"300px"}}>
              <p style={{fontWeight:"bold",fontSize:"25px"}}>{content1}</p>
              <p>{content2}</p>
            </div>
            {main=="items"?<button onClick={handleAdd} style={{outline:"none"}} className="add-btn">+ إضافة مادة جديدة</button>:""}
      </div>
      <div className="table-container">
        <table className="materials-table">
          <thead>
            <tr>
              {head}
              <th>
                الاجراءات
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
                  <td>{item.category_id}</td>
                  <td>{item.quantity_now}</td>
                  <td>{item.unit}</td>
                  <td>{item.cost_price}</td>
                  <td>{item.sell_price}</td>
                  <td>
                    <div className="d-flex" style={{justifyContent:"space-evenly"}}>
                      {main=="items"?<FontAwesomeIcon icon={faEdit} color="#2563eb"style={{cursor:"pointer"}} onClick={()=>handleUpdate(item.id)}></FontAwesomeIcon>:
                      <FontAwesomeIcon icon={faEye} color="#2563eb" style={{cursor:"pointer"}}></FontAwesomeIcon>}
                     <FontAwesomeIcon  icon={faTrash} color="red" style={{cursor:"pointer"}} onClick={()=>deleteItem(item.id)}></FontAwesomeIcon>                      
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {open}
      {open&&idUpdate==0&&<Additem></Additem>}
      {open&&idUpdate>0&&<Updateitem id={idUpdate}></Updateitem>}
    </>
  );
};
