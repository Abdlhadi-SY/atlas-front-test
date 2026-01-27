import Table from "../Component/Table";
import Topbar from "../Component/Topbar";
import "../Css/NewInvoice.css";
import { getAccountsApi } from "../API/accountsApi";
import { getItemByCodeApi } from "../API/ItemsApi";
import { createInvoiceApi } from "../API/InvoicesApi";
import { useState } from "react";

export default function NewInvoice() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);
  const [type, setType] = useState("sell");

  const [discount, setDiscount] = useState(0);
  const [generalNotes, setGeneralNotes] = useState("");

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([
    {
      id: null,
      code: "",
      name: "",
      qty: 1,
      unitPrice: 0,
      note: "",
      error: "",
    },
  ]);

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        code: "",
        name: "",
        qty: 1,
        unitPrice: 0,
        note: "",
        error: "",
      },
    ]);
  };

  const removeItemRow = () => {
    setItems((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  };

  const searchItem = async (index, query) => {
    if (!query) return;

    try {
      const data = await getItemByCodeApi(query);

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
          code: data.data.code,
          name: data.data.name,
          unitPrice: data.data.cost_price,
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

  useState(async () => {
    const data = await getAccountsApi();
    setCustomers(data.data);
  });

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const computeSubtotal = () => {
    return items.reduce((sum, it) => {
      const q = Number(it.qty) || 0;
      const p = Number(it.unitPrice) || 0;
      return sum + q * p;
    }, 0);
  };

  const subtotal = computeSubtotal();
  const tax = 0; // adjust if needed
  const total = subtotal + tax - Number(discount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      account_id: selectedCustomer ? selectedCustomer.id : null,
      type: type,
      note: generalNotes,
      items: items.map((it) => ({
        item_id: it.id,
        code: it.code,
        name: it.name,
        quantity: Number(it.qty) || 0,
        unitPrice: Number(it.unitPrice) || 0,
        note: it.note,
      })),
      discount: Number(discount) || 0,
      subtotal,
      tax,
      total,
    };
    console.log("Submitting invoice:", payload);

    try {
      const data = await createInvoiceApi(payload);
      console.log("Invoice created:", data);
      alert("تم حفظ الفاتورة بنجاح");
      // optional: reset form or navigate
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إرسال الفاتورة");
    }

    
    // try {
    //   const res = await fetch("/api/invoices", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });
    //   if (!res.ok) throw new Error("Network response was not ok");
    //   const data = await res.json();
    //   alert("تم حفظ الفاتورة بنجاح");
    //   // optional: reset form or navigate
    // } catch (err) {
    //   console.error(err);
    //   alert("حدث خطأ أثناء إرسال الفاتورة");
    // }
  };

  return (
    <>
      <Topbar header={"فاتورة جديدة"} />
      <form onSubmit={handleSubmit}>
        <div className="customer-card">
          <h3 className="card-title">معلومات العميل</h3>

          {!selectedCustomer && (
            <button
              type="button"
              className="select-btn"
              onClick={() => setShowCustomerSelector(true)}
            >
              اختيار عميل
            </button>
          )}

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

          {selectedCustomer && (
            <div className="selected-customer">
              <p>
                <strong>الاسم:</strong> {selectedCustomer.name}
              </p>
              <p>
                <strong>الرمز:</strong> {selectedCustomer.code}
              </p>
              <p>
                <strong>النوع:</strong> {selectedCustomer.type}
              </p>
              <p>
                <strong>الدين:</strong> {selectedCustomer.debit}
              </p>
              <p>
                <strong>الرصيد:</strong> {selectedCustomer.balance}
              </p>

              <button
                type="button"
                className="change-btn"
                onClick={() => {
                  setSelectedCustomer(null);
                  setShowCustomerSelector(true);
                }}
              >
                تغيير العميل
              </button>

              <div className="form-group">
                <label>ملاحظات</label>
                <input type="text" placeholder=" ملاحظات " />
              </div>
            </div>
          )}
        </div>
        <div className="form-grid">
          <div className="form-group">
            <div className="form-group">
              <label>نوع الفاتورة</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="sell">بيع</option>
                <option value="purchase">شراء</option>
              </select>
            </div>
          </div>
        </div>

        <div className="invoice-card">
          <div className="invoice-header">
            <h3>أصناف الفاتورة</h3>
            <p>
              اكتب جزء من كود أو اسم المادة واضغط Enter للبحث - F4 لفتح قائمة
              المواد
            </p>
          </div>

          <div className="table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>كود المادة</th>
                  <th>اسم المادة</th>
                  <th>الكمية</th>
                  <th>سعر الوحدة</th>
                  <th>المجموع</th>
                  <th>ملاحظات</th>
                </tr>
              </thead>

              <tbody>
                {items.map((it, index) => {
                  const lineTotal =
                    (Number(it.qty) || 0) * (Number(it.unitPrice) || 0);

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          placeholder="كود المادة"
                          value={it.code}
                          onChange={(e) =>
                            handleItemChange(index, "code", e.target.value)
                          }
                          // onBlur={() => searchItem(index, it.code)}
                          onKeyDown={(e) =>
                            e.key === "Tab" && searchItem(index, it.code)
                          }
                        />
                        {it.error && (
                          <small className="error">{it.error}</small>
                        )}
                      </td>

                      <td>
                        <input
                          placeholder="اسم المادة"
                          value={it.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                          // onBlur={() => searchItem(index, it.name)}
                          // onKeyDown={(e) =>
                          //   e.key === "Tab" && searchItem(index, it.name)
                          // }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          value={it.qty}
                          min="1"
                          onChange={(e) =>
                            handleItemChange(index, "qty", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          value={it.unitPrice}
                          onChange={(e) =>
                            handleItemChange(index, "unitPrice", e.target.value)
                          }
                        />
                      </td>

                      <td className="number">{lineTotal.toFixed(2)}</td>

                      <td>
                        <input
                          placeholder="ملاحظات"
                          value={it.note}
                          onChange={(e) =>
                            handleItemChange(index, "note", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={addItemRow}>
              إضافة صنف
            </button>
            <button
              type="button"
              className="add-row-btn"
              onClick={removeItemRow}
            >
              ازالة اخر صنف
            </button>
          </div>
        </div>
        <div className="summary-grid">
          {/* ملخص الفاتورة */}
          <div className="summary-card">
            <div className="card-header">
              <h3>ملخص الفاتورة</h3>
              <span className="icon">🧾</span>
            </div>

            <div className="summary-row">
              <span>المجموع الفرعي:</span>
              <span>{subtotal.toFixed(2)} ر.س</span>
            </div>

            <div className="summary-row">
              <span>إجمالي الضريبة:</span>
              <span>{tax.toFixed(2)} ر.س</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>المجموع الكلي:</span>
              <span className="total">{total.toFixed(2)} ر.س</span>
            </div>

            <button className="save-btn" type="submit">
              حفظ الفاتورة
            </button>
          </div>

          {/* تفاصيل إضافية */}
          <div className="details-card">
            <h3>تفاصيل إضافية</h3>

            <div className="form-group">
              <label>الخصم (ر.س)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>ملاحظات عامة</label>
              <textarea
                placeholder="ملاحظات إضافية"
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
