import formStyles from "@/styles/Forms.module.css";
export default function Input({ label, id, className = "", ...props }) { return <div className={`${formStyles.field} ${className}`}><label htmlFor={id}>{label}</label><input id={id} {...props}/></div>; }
