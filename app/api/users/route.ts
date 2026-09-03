import {cookieToken,json,resultResponse,rpc} from "@/lib/supabase-db";
export async function GET(request:Request){try{return resultResponse(await rpc("monocenter_list_users",{p_token:cookieToken(request)}))}catch{return json({error:"Banco compartilhado indisponível"},503)}}
export async function POST(request:Request){
  let body:{action?:string;username?:string;displayName?:string;password?:string;role?:string};try{body=await request.json()}catch{return json({error:"Dados inválidos"},400)}
  try{return resultResponse(await rpc("monocenter_manage_user",{p_token:cookieToken(request),p_action:body.action??"",p_username:body.username??"",p_display_name:body.displayName??"",p_password:body.password??"",p_role:body.role??"user"}))}catch{return json({error:"Banco compartilhado indisponível"},503)}
}
