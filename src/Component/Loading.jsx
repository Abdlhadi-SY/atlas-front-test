import "../index.css";
export default function Loading({border}){
    return(<div className="loading" style={{border:border, borderTop:"6px solid rgb(196, 190, 190)"}}></div>);
}