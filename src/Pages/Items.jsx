import { useState } from "react";
import Table from "../Component/Table";
import Topbar from "../Component/Topbar";

export default function Items(){
    const [query, setQuery] = useState("");
    const header=[
        {
            key:"code",
            value:"كود المادة",
        },
        {
            key:"name",
            value:"اسم المادة"
        },
        {
            key:"category",
            value:"الفئة"
        },
        {
            key:"quantity_now",
            value:"الكمية الحالية"
        },
        {
            key:"quantity_in",
            value:"الكمية الواردة"
        },
        {
            key:"quantity_low",
            value:"الكمية الادنى"
        },
        {
            key:"quantity_out",
            value:"الكمية الصادرة"
        },
        {
            key:"unit",
            value:"الوحدة"
        },
        {
            key:"cost_price",
            value:"سعر الشراء"
        },
        {
            key:"sell_price",
            value:"سعر المبيع"
        },
    ];
    return(
    <>
    <Topbar flag={true} setQuery={setQuery}  header={"قائمة المواد"}/>
    <Table query={query} main={"items"} content1={"اجمالي المواد:"} content2={""} header={header}></Table>
    </>
);
}