import { useState, useEffect, useContext } from "react";
import "../Css/Modal.css";
import "../Css/NewInvoice.css";
import { getAccountsApi } from "../Api/AccountsApi";
import { getItemByCodeApi } from "../API/ItemsApi";
import { updateInvoiceApi } from "../API/InvoicesApi"; // افترضنا عندك API لتحديث الفاتورة
import { it } from "zod/v4/locales";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { ChangeItems } from "../Context/ChangeItems";
import { set } from "zod";
import Cookies from "universal-cookie";
import axios from "axios";
import { baseUrl } from "../Variables";

export default function Invoicedetails({ invoice, setshowDetails }) {
  const {setChange}=useContext(ChangeItems);
  const [updateMode, setUpdateMode] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [type, setType] = useState(invoice.type);
  const [items, setItems] = useState(invoice.details);
  const [invoiceData, setInvoiceData] = useState(invoice);
  const [error, setError] = useState(null);
  const [units,setUnits]=useState([]);
  const cookie = new Cookies();
  const navigate = useNavigate();
  useEffect(()=>{
        axios.get(`${baseUrl}/api/v1/units`,{
            headers:{
                Authorization:`Bearer ${cookie.get("Bearer")}`
            }
        })
        .then((data)=>setUnits(data.data.data))
        .catch((err)=>console.log(err)
        )
    },[])
    const showUnits=units.map((unit,index)=><option key={index} value={unit.name}>{unit.name}</option>)
  console.log(items);
  
  // جلب العملاء عند التحميل
  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getAccountsApi();
      setCustomers(data.data);
    };
    fetchCustomers();
  }, []);

  // تعديل أي حقل
  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index][field] = value;

      // إعادة حساب المجموع للصف إذا تغير quantity أو السعر
      if (field === "quantity" || field === "provided_price") {
        const quantity = Number(copy[index].quantity) || 0;
        const price = Number(copy[index].provided_price) || 0;
        copy[index].total = quantity * price;
      }

      return copy;
    });
  };

  // إضافة صف جديد
  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        item_code: "",
        item_name: "",
        quantity: 1,
        provided_price: 0,
        item_unit: "",
        error: "",
        total: 0,
      },
    ]);
  };

  // حذف صف معين
  const removeItemRow = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // البحث عن المادة بالكود
  const searchItem = async (index, query) => {
    if (!query) return;

    try {
      const data = await getItemByCodeApi(query);
      
      if (!data || data.data === "Item not found." || !data.data) {
        setItems((prev) => {
          const copy = [...prev];
          copy[index].error = "المادة غير موجودة";
          return copy;
        });
        setError(`المادة بالكود ${query} غير موجودة`);  
        return;
      }

      setItems((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          item_id: data.data.id,
          item_code: data.data.code,
          item_name: data.data.name,
          item_unit: data.data.unit.name,
          provided_price: type == "sell" ? data.data.sell_price : data.data.cost_price,
          error: "",
          total: (Number(copy[index].quantity) || 0) * (Number(data.data.provided_price) || 0),
        };
        return copy;
      });
    } catch {
      setItems((prev) => {
        const copy = [...prev];
        copy[index].error = "خطأ في الاتصال";
        return copy;
      });
    }
  };

  // المجموع الكلي
  const totalPrice = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);

  // حفظ التعديلات
  const handleSave = async () => {
    const validItems = items.filter(item =>
      item.item_id &&
      !item.error &&
      Number(item.quantity) > 0 &&Number(item.provided_price) > 0
  );

    if (validItems.length !== items.length) {
      toast.error("في مواد غير صحيحة، تأكد من إدخال كود صحيح",{
        style: { background: 'red', 
        color: 'white',     
        padding: '12px 20px',
        borderRadius: '8px',
        fontWeight: 'bold', }
      });
      return;
    }
    try {
      const payload = {
        ...invoiceData,
        type,
        account_id: selectedCustomer?.id || invoiceData.account_id,
        items: items,
        total: totalPrice,
      };

      await updateInvoiceApi(invoiceData.id, payload);
      setUpdateMode(false);
      setInvoiceData(payload);
      setshowDetails();
      setChange((prev)=>!prev);
      navigate('/dashboard/invoices');
      toast.success('تم التعديل بنجاح', {
                duration: 5000,
                 style: {
                    background: 'green', 
                    color: 'white',     
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                }
            });
    } catch (err) {
      console.error("خطأ عند حفظ التعديلات:", err);
    }
  };

  const handleEdit = () => setUpdateMode(true);

  const handlePrint = () => window.print();

  const handleEnterAsTab = (e) => {
  if (e.key !== "Enter") return;

  e.preventDefault();

  const focusable = Array.from(
    document.querySelectorAll(
      "input, select, textarea"
    )
  ).filter(el => !el.disabled && el.offsetParent !== null);

  const index = focusable.indexOf(e.target);

  if (index === -1) return;

  if (e.shiftKey) {
    focusable[index - 1]?.focus();
  } else {
    focusable[index + 1]?.focus();
  }
};


  return (
    <div className="modal-backdrop print-area">
      <div className="modal-box" style={{ width: "1000px" }}>
        {/* HEADER */}
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <button className="close-btn" onClick={setshowDetails}>
            ✕
          </button>
          <button className="add-btn" onClick={handlePrint}>
            🖨️ طباعة
          </button>
          {!updateMode && (
            <button style={{ marginLeft: "25px" }} className="add-btn" onClick={handleEdit}>
              تعديل الفاتورة
            </button>
          )}
        </div>

        {/* TITLE */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1>{type === "sell" ? "فاتورة مبيعات" : "فاتورة شراء"}</h1>
          <p>نظام إدارة المستودعات</p>
        </div>

        {/* INFO */}
        <div className="d-flex infoDetails" style={{ justifyContent: "space-around" }}>
          <div>
            <h4>معلومات العميل</h4>
            <p>
              الاسم: {selectedCustomer ? selectedCustomer.name : invoiceData.account_name}
            </p>
            {updateMode && (
              <>
                <button
                  type="button"
                  className="select-btn"
                  onClick={() => setShowCustomerSelector(true)}
                >
                  تغيير العميل
                </button>
           {showCustomerSelector && (
            <div className="modal-backdrop">
              <div className="modal-box" style={{ width: "700px" }}>
                <h4>اختر عميلًا</h4>
                <table className="customer-table">
                  <thead>
                    <tr>
                      <th>الرمز</th>
                      <th>الاسم</th>
                      <th>النوع</th>
                      <th>الرصيد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowCustomerSelector(false);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{customer.code}</td>
                        <td>{customer.name}</td>
                        <td>{customer.type}</td>
                        <td>{customer.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="add-btn exit"
                  style={{marginBlock:"20px"}}
                  onClick={() => setShowCustomerSelector(false)}
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}

              </>
            )}
          </div>

          <div>
            <h4>معلومات الفاتورة</h4>
            <p>رقم الفاتورة: {invoiceData.number}</p>
            <p>التاريخ: {invoiceData.date}</p>
            {updateMode && (
              <div className="form-group">
                <label>نوع الفاتورة</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="sell">بيع</option>
                  <option value="purchase">شراء</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* TABLE */}
        <table className="materials-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>كود المادة</th>
              <th>اسم المادة</th>
              <th>الكمية</th>
              <th>الوحدة</th>
              <th>السعر</th>
              <th>المجموع</th>
              <th>{updateMode ? "الإجراءات" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  {updateMode ? (
                    <input
                      value={item.item_code}
                      onChange={(e) => handleItemChange(i, "item_code", e.target.value)}
                      onBlur={() => searchItem(i, item.item_code)}
                      onKeyDown={handleEnterAsTab}
                    />
                  ) : (
                    item.item_code
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <input
                      value={item.item_name}
                      onChange={(e) => handleItemChange(i, "item_name", e.target.value)}
                      onKeyDown={handleEnterAsTab}
                    />
                  ) : (
                    item.item_name
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(i, "quantity", e.target.value)}
                      onKeyDown={handleEnterAsTab}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <>
                      <input list="units"  value={item.item_unit}  onChange={(e) => handleItemChange(i, "item_unit", e.target.value)} onKeyDown={handleEnterAsTab}/>
                      <datalist id="units">
                          {showUnits}
                      </datalist>
                    </>
                  ) : (
                    item.item_unit
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <input
                      type="number"
                      value={item.provided_price}
                      onChange={(e) => handleItemChange(i, "provided_price", e.target.value)}
                      onKeyDown={handleEnterAsTab}
                    />
                  ) : (
                    item.provided_price
                  )}
                </td>
                <td>{item.total}</td>
                {updateMode && (
                  <td>
                    <button type="button" className="add-btn" onClick={() => removeItemRow(i)}>
                      ❌ حذف
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {updateMode && (
            <tfoot>
              <tr>
                <td colSpan="3">
                  <button type="button" className="add-btn" onClick={addItemRow}>
                    إضافة مادة جديدة
                  </button>
                </td>
                {error && <td colSpan="2" className="error">{error}</td>}
              </tr>
            </tfoot>
          )}
        </table>

        {/* TOTAL */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h3>المجموع الكلي: {totalPrice}</h3>
          {updateMode && (
            <button type="button" className="select-btn" onClick={handleSave}>
              حفظ التعديلات
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
