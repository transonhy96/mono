export interface AlertItem{
    id?:string;
    title:string;
    desc:string;
    type:'error'|'info'|'warning'|'success';
    icon?:React.ReactNode
}