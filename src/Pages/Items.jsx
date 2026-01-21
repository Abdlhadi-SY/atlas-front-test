import Table from "../Component/Table";
import Topbar from "../Component/Topbar";

export default function Items(){
    const header=[
        {
            key:"code",
            value:"كود المادة",
        },
        {
            key:"name",
            value:"اسم المادة"},
        {
            key:"category_id",
            value:"الفئة"
        },
        {
            key:"quantity_now",
            value:"الكمية"
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
    <Topbar  header={"قائمة المواد"}/>
    <Table main={"items"} content1={"اجمالي المواد:"} content2={"المواد المنخفضة:"} header={header}></Table>
    </>
);
}