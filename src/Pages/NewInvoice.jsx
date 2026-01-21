import Table from "../Component/Table";
import Topbar from "../Component/Topbar";
import "../Css/NewInvoice.css";

export default function NewInvoice() {
    const rows = Array.from({ length: 10 });
  return (
    <>
      <Topbar header={"فاتورة جديدة"} />
      <div className="customer-card" margin="20px">
        <h3 className="card-title">معلومات العميل</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>
              اسم العميل <span className="required">*</span>
            </label>
            <input type="text" placeholder="أدخل اسم العميل" />
          </div>

          <div className="form-group">
            <label>رقم الهاتف</label>
            <input type="text" placeholder="رقم الهاتف" />
          </div>

          <div className="form-group">
            <label>العنوان</label>
            <input type="text" placeholder="العنوان" />
          </div>
          <div className="form-group">
            <label>نوع الفاتورة</label>
            <input type="text" placeholder="نوع الفاتورة" />
          </div>
        </div>
      </div>

      <div className="invoice-card">
      <div className="invoice-header">
        <h3>أصناف الفاتورة</h3>
        <p>
          اكتب جزء من كود أو اسم المادة واضغط Enter للبحث - F4 لفتح قائمة المواد
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
              <th>% الضريبة</th>
              <th>قيمة الضريبة</th>
              <th>المجموع</th>
              <th>ملاحظات</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input placeholder="كود المادة أو F4" />
                </td>
                <td>
                  <input placeholder="اسم المادة أو F4" />
                </td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" defaultValue={15} />
                </td>
                <td className="number">0.00</td>
                <td className="number">0.00</td>
                <td>
                  <input placeholder="ملاحظات" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <span>0.00 ر.س</span>
        </div>

        <div className="summary-row">
          <span>إجمالي الضريبة:</span>
          <span>0.00 ر.س</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>المجموع الكلي:</span>
          <span className="total">0.00 ر.س</span>
        </div>

        <button className="save-btn">
          💾 حفظ الفاتورة
        </button>
      </div>

      {/* تفاصيل إضافية */}
      <div className="details-card">
        <h3>تفاصيل إضافية</h3>

        <div className="form-group">
          <label>الخصم (ر.س)</label>
          <input type="number" defaultValue={0} />
        </div>

        <div className="form-group">
          <label>ملاحظات عامة</label>
          <textarea placeholder="ملاحظات إضافية" />
        </div>
      </div>
    </div>
    </>
  );
}
