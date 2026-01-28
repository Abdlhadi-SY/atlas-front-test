import { useState } from "react";
import "../Css/Modal.css";
import { set } from "zod";
import { getAccountsApi } from "../Api/AccountsApi";
import "../Css/NewInvoice.css";
import { getItemByCodeApi } from "../API/ItemsApi";

export default function Invoicedetails({ invoice, setshowDetails }) {
  const [updateMode, setUpdateMode] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [type, setType] = useState(invoice.type);
  const [invoiceData, setInvoice] = useState(invoice);
  const [items, setItems] = useState(invoice.details);
  console.log("item details:", items);

  const handlePrint = () => {
    window.print();
  };
  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        item_code: "",
        item_name: "",
        quantity: 1,
        provided_price: 0,
        note: "",
        item_unit: "",
        error: "",
        total: 0,
      },
    ]);
    // setInvoice({ ...invoice });
  };

  const removeItemRow = () => {
    if (items.length > 0) {
      items.pop();
      setItems([...items]);
    }
  };
  const handleEdit = () => {
    setUpdateMode(true);
    // Implement edit functionality here
  };
  const handleSave = () => {
    // Implement save functionality here
    setUpdateMode(false);
  };
  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  useState(async () => {
    const data = await getAccountsApi();
    setCustomers(data.data);
  });

  const searchItem = async (index, query) => {
    if (!query) return;

    try {
      const data = await getItemByCodeApi(query);
      console.log("search item data:", data);

      if (!data || data.data == "Item not found." || !data.data) {
        setItems((prev) => {
          const copy = [...prev];
          copy[index].error = "المادة غير موجودة";
          return copy;
        });
        return;
      }

      setItems((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          id: data.data.id,
          item_code: data.data.code,
          item_name: data.data.name,
          item_unit: data.data.unit.name,
          provided_price: data.data.provided_price,
          error: "",
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
          <button className="add-btn" onClick={handleEdit}>
            تعديل الفاتورة
          </button>
        </div>

        {/* TITLE */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1>{type === "sell" ? "فاتورة مبيعات" : "فاتورة شراء"}</h1>
          <p>نظام إدارة المستودعات</p>
        </div>

        {/* INFO */}
        <div
          className="d-flex infoDetails"
          style={{ justifyContent: "space-around" }}
        >
          <div>
            <h4>معلومات العميل</h4>
            <p>
              {" "}
              الاسم:
              {selectedCustomer
                ? selectedCustomer.name
                : invoice.account_name}{" "}
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
                  <div className="customer-selector">
                    <h4>اختر عميلًا</h4>

                    <table className="customer-table">
                      <thead>
                        <tr>
                          <th>المعرف</th>
                          <th>الرمز</th>
                          <th>الاسم</th>
                          <th>النوع</th>
                          <th>الدين</th>
                          <th>الرصيد</th>
                        </tr>
                      </thead>

                      <tbody>
                        {customers && customers.length > 0
                          ? customers.map((customer) => (
                              <tr
                                key={customer.id}
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setShowCustomerSelector(false);
                                }}
                              >
                                <td>{customer.id}</td>
                                <td>{customer.code}</td>
                                <td>{customer.name}</td>
                                <td>{customer.type}</td>
                                <td>{customer.debit}</td>
                                <td>{customer.credit}</td>
                                <td>{customer.balance}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            <h4>معلومات الفاتورة</h4>
            <p>رقم الفاتورة:{invoice.number} </p>
            <p>التاريخ:{invoice.date}</p>
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
        <table
          className="materials-table"
          style={{ height: "10px", marginTop: "20px", overflow: "scroll" }}
        >
          <thead>
            <tr>
              <th>كود المادة</th>
              <th>اسم المادة</th>
              <th>الكمية</th>
              <th> الوحدة</th>
              <th> السعر</th>
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  {updateMode ? (
                    <input
                      value={item.item_code}
                      onChange={(e) =>
                        handleItemChange(i, "item_code", e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Tab" && searchItem(i, item.item_code)
                      }
                      autoFocus
                    />
                  ) : (
                    item.item_code
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <input
                      value={item.item_name}
                      onChange={(e) =>
                        handleItemChange(i, "item_name", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleItemChange(i, "quantity", e.target.value)
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <input
                      value={item.item_unit}
                      onChange={(e) =>
                        handleItemChange(i, "item_unit", e.target.value)
                      }
                    />
                  ) : (
                    item.item_unit
                  )}
                </td>
                <td>
                  {updateMode ? (
                    <input
                      type="number"
                      value={item.sell_price}
                      onChange={(e) =>
                        handleItemChange(i, "provided_price", e.target.value)
                      }
                    />
                    
                  ) : (
                    item.provided_price
                  )}
                </td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
          {updateMode && (
            <tfoot>
              <tr>
                <td colSpan="5">
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addItemRow}
                  >
                    إضافة مادة جديدة
                  </button>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={removeItemRow}
                  >
                    ازالة اخر صنف
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        {/* TOTALS */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h3>المجموع الكلي:{invoice.total} </h3>
          {updateMode && (
            <>
              <button
                type="button"
                className="select-btn"
                onClick={() => handleSave()}
              >
                حفظ التعديلات
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
