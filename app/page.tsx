"use client";
import {FormEvent,useEffect,useState} from "react";
import Workshop from "./workshop";

type User={username:string;displayName:string;role:"admin"|"user"};

export default function Page(){
  const [user,setUser]=useState<User|null>(null),[initialState,setInitialState]=useState<any>(null),[ready,setReady]=useState(false),[error,setError]=useState(""),[sending,setSending]=useState(false);
  const load=async()=>{const session=await fetch("/api/session",{cache:"no-store"});if(!session.ok){setReady(true);return}const current=(await session.json()).user as User;const shared=await fetch("/api/state",{cache:"no-store"});const data=shared.ok?await shared.json():{state:null};setUser(current);setInitialState(data.state);setReady(true)};
  useEffect(()=>{load()},[]);
  const login=async(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setSending(true);setError("");try{const form=new FormData(e.currentTarget),response=await fetch("/api/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({username:form.get("username"),password:form.get("password")})}),data=await response.json();if(!response.ok){setError(data.error??"Não foi possível entrar");return}const shared=await fetch("/api/state",{cache:"no-store"}),stateData=shared.ok?await shared.json():{state:null};setUser(data.user);setInitialState(stateData.state)}catch{setError("Não foi possível conectar. Tente novamente.")}finally{setSending(false)}};
  const logout=async()=>{await fetch("/api/logout",{method:"POST"});setUser(null);setInitialState(null)};
  if(!ready)return <div className="auth-loading">Carregando Monocenter…</div>;
  if(!user)return <main className="login-page"><form className="login-card" onSubmit={login}><img src="/logo-monocenter.jpg" alt="Monocenter Alinhamento Técnico"/><div><small>SISTEMA INTERNO</small><h1>Acesso Monocenter</h1><p>Entre com seu usuário e senha para acessar a agenda e os serviços.</p></div><label>Usuário<input name="username" autoComplete="username" autoCapitalize="none" required/></label><label>Senha<input name="password" type="password" autoComplete="current-password" required/></label>{error&&<p className="login-error" role="alert">{error}</p>}<button className="primary" disabled={sending}>{sending?"Entrando…":"Entrar no sistema"}</button><small className="login-help">Em caso de dificuldade, fale com a Gestão.</small></form></main>;
  return <Workshop initialState={initialState} user={user} onLogout={logout}/>;
}
