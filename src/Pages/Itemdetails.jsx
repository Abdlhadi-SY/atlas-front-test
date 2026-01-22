import "../Css/Modal.css";

export default function Itemdetails({details , setshowDetails }) {
  const handlePrint = () => {
    window.print();
  };
  console.log(details);
  
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
          <h1>فاتورة مبيعات</h1>
          <p>نظام إدارة المستودعات</p>
        </div>

        {/* INFO */}
        <div className="d-flex infoDetails" style={{ justifyContent: "space-around" }}>
          <div>
            <h4>معلومات العميل</h4>
                <p> الاسم: </p>
                <p>الهاتف:</p>
                <p>العنوان: </p>
          </div>

          <div>
            <h4>معلومات الفاتورة</h4>
            <p>رقم الفاتورة: </p>
            <p>التاريخ:</p>
            <p>الحالة: </p>
          </div>
        </div>

        {/* TABLE */}
        <table className="materials-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>كود المادة</th>
              <th>اسم المادة</th>
              <th>الكمية</th>
              <th>سعر الوحدة</th>
              <th>الضريبة %</th>
              <th>قيمة الضريبة</th>
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {/* {details.items.map((item, i) => (
              <tr key={i}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{item.tax}%</td>
                <td>{item.taxValue}</td>
                <td>{item.total}</td>
              </tr>
            ))} */}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <p>المجموع الفرعي: </p>
          <p>إجمالي الضريبة: </p>
          <h3>المجموع الكلي: </h3>
        </div>
      </div>
    </div>
  );
}