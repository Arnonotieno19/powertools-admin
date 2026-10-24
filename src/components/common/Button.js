import Link from "next/link";
import styles from "@/styles/Common.module.css";
export default function Button({ href, variant = "primary", className = "", children, ...props }) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>;
}
