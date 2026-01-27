import "../Css/Modal.css";

export default function Invoicedetails({invoice , setshowDetails }) {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="modal-backdrop print-area">
      <div className="modal-box" style={{ width: "1000px" }}>
        {/* HEADER */}
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <button className="close-btn" onClick={setshowDetails}>✕</button>
          <button className="add-btn" onClick={handlePrint}>🖨️ طباعة</button>
        </div>

        {/* TITLE */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1>{invoice.type === "sell" ? "فاتورة مبيعات" : "فاتورة شراء"}</h1>
          <p>نظام إدارة المستودعات</p>
        </div>

        {/* INFO */}
        <div className="d-flex infoDetails" style={{ justifyContent: "space-around" }}>
          <div>
            <h4>معلومات العميل</h4>
                <p> الاسم:{invoice.account_name} </p>
          </div>

          <div>
            <h4>معلومات الفاتورة</h4>
            <p>رقم الفاتورة:{invoice.number} </p>
            <p>التاريخ:{invoice.date}</p>
          </div>
        </div>

        {/* TABLE */}
        <table className="materials-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>كود المادة</th>
              <th>اسم المادة</th>
              <th>الكمية</th>
              <th> الوحدة</th>
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {invoice.details.map((item, i) => (
              <tr key={i}>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.item_unit}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
        
          <h3>المجموع الكلي:{invoice.total} </h3>
        </div>
      </div>
    </div>
  );
}