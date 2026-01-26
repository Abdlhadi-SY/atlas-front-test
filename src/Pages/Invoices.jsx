import { useState } from "react";
import Table from "../Component/Table";
import Topbar from "../Component/Topbar";

export default function Invoices(){
    const [query, setQuery] = useState("");
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
        {
            key:"total",
            value:"المجموع",
        },
    ];
    return(
        <>
        <Topbar setQuery={setQuery} header={"قائمة الفواتير"} />
        <Table query={query} main={"invoices"} content1={"إجمالي الفواتير:"} content2={"المجموع الكلي:"} header={header}></Table>
        </>
    );
}