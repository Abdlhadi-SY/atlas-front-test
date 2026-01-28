import Itemform from "../Component/Itemform";

export default function Updateitem({item}){
    return(<Itemform header={"تعديل مهمة "} content={"تعديل"} item={item}></Itemform>);   
}