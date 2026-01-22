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
import { ChangeItems } from "../Context/ChangeItems";
import Itemdetails from "../Pages/Itemdetails";


export default function Table ({main,header,content1,content2}) {
  const {open}=useContext(Modback);
  const {setOpen}=useContext(Modback);
  const [idUpdate,setidUpdate]=useState(0);
  const [items, setItems] = useState([]);
  const [item,setItem]=useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);     
  const cookie=new Cookies();
  const token=cookie.get("Bearer");
  const [showDetails,setShowDetails]=useState(false);
  const {change}=useContext(ChangeItems);
  const {setChange}=useContext(ChangeItems);
  const [openInvoice, setOpenInvoice] = useState(false);
  useEffect(()=>{
    axios.get(`${baseUrl}/api/v1/${main}`,{
       headers:{
                Authorization:"Bearer "+  token
            },
    })
    .then((data)=>setItems(data.data.data))
    .catch((err)=>console.log(err))
  },[change])

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
  function deleteItem(id){
    setDeleteId(id);     
    setShowDelete(true);
  }
  async function confirmDelete() {
    try {
        await axios.delete(`${baseUrl}/api/v1/${main}/${deleteId}`, {
            headers: { Authorization: "Bearer " + token }
        });
        setChange((pre)=>!pre);
        setShowDelete(false); 
        setDeleteId(null);    
    } catch(err) {
        console.log(err);
    }
}


  const head=header.map((obj,index)=>
    <th key={index} onClick={() => handleSort(obj.key)}>{obj.value}{renderArrow(obj.key)}</th>
  )
  let body;
  if(items.length>0)
    body=items.map((item,index)=>
      <tr key={index}>{header.map((obj,index)=><td key={index}>
        {typeof item[obj.key]=="object"?item[obj.key].name:item[obj.key]}</td>)}
      <td>
        <div className="d-flex" style={{justifyContent:"space-evenly"}}>
            {main=="items"?<FontAwesomeIcon icon={faEdit} color="#2563eb"style={{cursor:"pointer"}} onClick={()=>handleUpdate(item)}></FontAwesomeIcon>:
            <FontAwesomeIcon icon={faEye} color="#2563eb" style={{cursor:"pointer"}} onClick={()=>handleDetails(item)}></FontAwesomeIcon>}
            <FontAwesomeIcon  icon={faTrash} color="red" style={{cursor:"pointer"}} onClick={()=>deleteItem(item.id)}></FontAwesomeIcon>                      
        </div>
        </td>
      </tr>
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

  function handleDetails(item){
    setShowDetails(true);
    setItem(item);
  }
  return (
    <div style={{padding:"20px"}}>
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
            ) : 
              body
            }
          </tbody>
        </table>
      </div>
      {open}
      {open&&idUpdate==0&&<Additem></Additem>}
      {open&&idUpdate>0&&<Updateitem item={item}></Updateitem>}
      {showDetails && <Itemdetails setshowDetails={()=>setShowDetails(false)} details={item.details}></Itemdetails>}
      {showDelete && (
      <div className="modal-backdrop">
          <div className="modal-box">
              <h2>هل تريد حذف هذه العملية؟</h2>
              <div className="d-flex" style={{justifyContent:"space-around", marginTop:"20px"}}>
                  <button className="add-btn" onClick={confirmDelete}>تأكيد</button>
                  <button className="add-btn exit" style={{color:"black"}} onClick={() => setShowDelete(false)}>إلغاء</button>
              </div>
          </div>
      </div>
    )}
    </div>
  );
};
