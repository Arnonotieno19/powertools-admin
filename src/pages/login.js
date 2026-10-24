import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { mockCredentials } from "@/mocks/auth";
import styles from "@/styles/Auth.module.css";

export default function Login(){
  const router = useRouter(); const { setAuth, isAuthenticated, hasHydrated } = useAuthStore();
  const [identifier,setIdentifier]=useState(""); const [password,setPassword]=useState(""); const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  useEffect(()=>{ if(hasHydrated && isAuthenticated) router.replace(typeof router.query.redirect === "string" ? router.query.redirect : "/"); },[hasHydrated,isAuthenticated,router]);
  async function submit(event){ event.preventDefault(); setError(""); if(!identifier.trim() || !password){setError("Enter your email or phone and password.");return;} setLoading(true); try{ const response=await authService.login(identifier,password); setAuth(response); await router.push(typeof router.query.redirect === "string" ? router.query.redirect : "/"); }catch(err){setError(err.message);}finally{setLoading(false);} }
  const mocks = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
  return <main className={styles.page}><div className={styles.wrap}><Link href="/login" className={styles.brand}><span className={styles.brandIcon}>T</span>Tool<span>Mart</span></Link><section className={styles.card}><h1>Sign in</h1><p className={styles.subtitle}>Sign in to access ToolMart Admin.</p>{error && <div className={styles.error} role="alert">{error}</div>}<form onSubmit={submit}><div className={styles.field}><label htmlFor="identifier">Email or phone</label><input id="identifier" autoComplete="username" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} /></div><div className={styles.field}><label htmlFor="password">Password</label><div className={styles.inputWrap}><input className={styles.passwordInput} id="password" type={show?"text":"password"} autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)}/><button className={styles.visibility} type="button" aria-label={show?"Hide password":"Show password"} onClick={()=>setShow(!show)}>{show?"◉":"◎"}</button></div></div><button className={styles.button} disabled={loading}>{loading?"Signing in…":"Sign In"}</button></form><Link className={styles.link} href="/forgot-password">Forgot password?</Link>{mocks && <div className={styles.credentials}><strong>Development accounts — password: Password123!</strong>{mockCredentials.map((item)=><button type="button" key={item.identifier} onClick={()=>{setIdentifier(item.identifier);setPassword(item.password);}} style={{border:0,background:"transparent",textAlign:"left",color:"var(--blue)",fontSize:11}}>{item.role}: {item.identifier}</button>)}</div>}</section></div></main>;
}
