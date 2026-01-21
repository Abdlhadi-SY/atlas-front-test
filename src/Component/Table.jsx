import React, { useContext, useEffect, useState } from "react";
import Additem from "../Pages/Additem";
import { Modback } from "../Context/ItemContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Updateitem from "../Pages/Updateitem";
import axios from "axios";
import { baseUrl } from "../Variables";
import Cookies from "universal-cookie";

export default function Table ({main,header,content1,content2}) {
  const {open}=useContext(Modback);
  const {setOpen}=useContext(Modback);
  const [idUpdate,setidUpdate]=useState(0);
  const [items, setItems] = useState([]);
  const [item,setItem]=useState({});
  const cookie=new Cookies();
  const token=cookie.get("Bearer");
  useEffect(()=>{
    axios.get(`${baseUrl}/api/v1/items`,{
       headers:{
                Authorization:"Bearer "+  token
            },
    })
    .then((data)=>setItems(data.data.data))
    .catch((err)=>console.log(err))
  },[])

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  
 const handleSort = (column) => {
  let direction = "asc";
  if (sortColumn === column && sortDirection === "asc") direction = "desc";

  const sortedData = [...items].sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    const aNum = parseFloat(aVal);
    const bNum = parseFloat(bVal);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return direction === "asc" ? aNum - bNum : bNum - aNum;
    }

    aVal = aVal?.toString().toLowerCase();
    bVal = bVal?.toString().toLowerCase();
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  setSortColumn(column);
  setSortDirection(direction);
  setItems(sortedData);
};


  const renderArrow = (column) => {
    if (sortColumn !== column) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };
  function deleteItem(id){}
  const head=header.map((obj,index)=>
    <th key={index} onClick={() => handleSort(obj.key)}>{obj.value}{renderArrow(obj.key)}</th>
  )
  function handleUpdate(item){
    setOpen(true);
    setidUpdate(item.id)
    setItem(item);
  }
  function handleAdd(id){
    setOpen(true);
    setidUpdate(0);
    setItem({});
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
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  لا توجد بيانات للعرض
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>{item.quantity_now}</td>
                  <td>{item.unit.name}</td>
                  <td>{item.cost_price}</td>
                  <td>{item.sell_price}</td>
                  <td>
                    <div className="d-flex" style={{justifyContent:"space-evenly"}}>
                      {main=="items"?<FontAwesomeIcon icon={faEdit} color="#2563eb"style={{cursor:"pointer"}} onClick={()=>handleUpdate(item)}></FontAwesomeIcon>:
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
      {open&&idUpdate>0&&<Updateitem item={item}></Updateitem>}
    </>
  );
};
