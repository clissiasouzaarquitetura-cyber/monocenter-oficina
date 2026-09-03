import {json,rpc,sessionCookie} from "@/lib/supabase-db";

export async function POST(request:Request){
  let body:{username?:string;password?:string};try{body=await request.json()}catch{return json({error:"Dados inválidos"},400)}
  const username=(body.username??"").trim(),password=body.password??"";if(!username||!password)return json({error:"Informe usuário e senha"},400);
  try{const result=await rpc<{status:number;error?:string;token?:string;user?:unknown}>("monocenter_login",{p_username:username,p_password:password,p_ip:request.headers.get("x-forwarded-for")??"local"});
    if(result.error||!result.token)return json({error:result.error??"Não foi possível entrar"},result.status??401);
    return json({user:result.user},200,{"set-cookie":sessionCookie(result.token)});
  }catch{return json({error:"Não foi possível conectar ao banco. Tente novamente."},503)}
}
