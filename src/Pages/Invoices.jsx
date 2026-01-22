import Table from "../Component/Table";
import Topbar from "../Component/Topbar";

export default function Invoices(){
    const header=[
        {
            key:"number",
            value:"رقم الفاتورة"
        },
        {
            key:"date",
            value:"التاريخ"
        },
        {
            key:"account_name",
            value:"اسم العميل"
        },
    ];
    return(
        <>
        <Topbar header={"قائمة الفواتير"} />
        <Table main={"invoices"} content1={"إجمالي الفواتير:"} content2={"المجموع الكلي:"} header={header}></Table>
        </>
    );
}