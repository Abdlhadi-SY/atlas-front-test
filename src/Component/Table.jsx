import { useMemo } from "react";
import React, { useContext, useEffect, useState } from "react";
import Additem from "../Pages/Additem";
import { Modback } from "../Context/ItemContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Updateitem from "../Pages/Updateitem";
import Cookies from "universal-cookie";
import { ChangeItems } from "../Context/ChangeItems";
import { toast } from "sonner";
import { deleteItemApi, getItemsApi, searchItemsApi } from "../API/ItemsApi";
import Invoicedetails from "../Pages/Invoicedetails";

export default function Table ({query,main,header,content1,content2}) {
    const {open,setOpen}=useContext(Modback);
    const [idUpdate,setidUpdate]=useState(0);
    const [items, setItems] = useState([]);
    const [item,setItem]=useState({});  
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
    const cookie=new Cookies();
    const token=cookie.get("Bearer");
    const [showDetails,setShowDetails]=useState(false);
    const {change,setChange}=useContext(ChangeItems);
    
    useEffect(()=>{
      const fetchItems = async () => {
      try {
        const data = await getItemsApi(main); 
        setItems(data.data);
      } catch (err) {
        console.log("Error fetching items:", err);
      }
    };

    fetchItems();
    },[change])
    useEffect(() => {
      const filteredItems = async () => {
        try {
          const data = await searchItemsApi(main, {q: query}); 
          setItems(data.data);
        } catch (err) {
          console.log("Error fetching items:", err);
        }
      };
      filteredItems();
    }, [query]);

    const totalPrice = useMemo(() => {
      return items.reduce((sum, item) => {
        return sum + (Number(item.total) || 0);
      }, 0);
    }, [items]);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    

    const parseDate = (dateStr) => {
        if (!dateStr) return 0;
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day).getTime();
      };

    const handleSort = (column) => {
      let direction = "asc";
      if (sortColumn === column && sortDirection === "asc") {
        direction = "desc";
      }

      const sortedData = [...items].sort((a, b) => {
        console.log(column);
        
        let aVal = a[column];
        let bVal = b[column];
        console.log(aVal,bVal);
        
        if (column === "date") {
            const aTime = parseDate(aVal);
            const bTime = parseDate(bVal);
            return direction === "asc" ? aTime - bTime : bTime - aTime;
          }
        if(typeof aVal=="object")
          aVal=aVal?.name;
        if(typeof bVal=="object")
          bVal=bVal?.name;

        console.log(typeof aVal,typeof bVal);
        
        const aStr = (aVal ?? "").toString().trim();
        const bStr = (bVal ?? "").toString().trim();

        
        const aNum = parseFloat(aStr);
        const bNum = parseFloat(bStr);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        return direction === "asc"
          ? aStr.localeCompare(bStr, "ar", { sensitivity: "base" })
          : bStr.localeCompare(aStr, "ar", { sensitivity: "base" });
      });

      setSortColumn(column);
      setSortDirection(direction);
      setItems(sortedData);
    };

    const renderArrow = (column) => {
      if (sortColumn !== column) return "↕";
      return sortDirection === "asc" ? "↑" : "↓";
    };

    function openDelete(id) {
      setDeleteModal({ open: true, id });
    }

    function closeDelete() {
      setDeleteModal({ open: false, id: null });
    }

    async function confirmDelete() {
      try {
          await deleteItemApi(deleteModal.id);
          setChange((pre)=>!pre);
          toast.success('تم الحذف بنجاح', {
                duration: 5000,
                 style: {
                    background: 'red', 
                    color: 'white',     
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                }
            });
          closeDelete();    
      } catch(err) {
          console.log(err);
      }
  }


    const head=header.map((obj,index)=>
      <th key={index} onClick={() => handleSort(obj.key)}>{obj.value}{renderArrow(obj.key)}</th>
    )
    
    function handleUpdate(item){
      setOpen(true);
      setidUpdate(item.id)
      setItem(item);
    }
    function handleAdd(){
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
                <p style={{fontWeight:"bold",fontSize:"25px"}}>{content1}{items.length}</p>
                <p>{content2 && `${content2}${totalPrice}`}</p>
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
                 (
                  items.map((item) => (
                    <tr key={item.id}>
                      {header.map((obj) => (
                        <td key={obj.key}>
                          {typeof item[obj.key] === "object"
                            ? item[obj.key]?.name
                            : item[obj.key]}
                        </td>
                      ))}
                      <td>
                        <div className="d-flex" style={{ justifyContent: "space-evenly" }}>
                          {main === "items" ? (
                            <FontAwesomeIcon
                              icon={faEdit}
                              color="#2563eb"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleUpdate(item)}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEye}
                              color="#2563eb"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDetails(item)}
                            />
                          )}
                          <FontAwesomeIcon
                            icon={faTrash}
                            color="red"
                            style={{ cursor: "pointer" }}
                            onClick={() => openDelete(item.id)}
                          />
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
        {showDetails && <Invoicedetails setshowDetails={()=>setShowDetails(false)} invoice={item}></Invoicedetails>}
        {deleteModal.open && (
        <div className="modal-backdrop">
            <div className="modal-box">
                <h2>هل تريد حذف هذه العملية؟</h2>
                <div className="d-flex" style={{justifyContent:"space-around", marginTop:"20px"}}>
                    <button className="add-btn" onClick={confirmDelete}>تأكيد</button>
                    <button className="add-btn exit" style={{color:"black"}} onClick={closeDelete}>إلغاء</button>
                </div>
            </div>
        </div>
      )}
      </div>
    );
};
