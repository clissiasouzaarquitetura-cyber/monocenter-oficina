import {cookieToken,json,resultResponse,rpc} from "@/lib/supabase-db";
export async function GET(request:Request){try{return resultResponse(await rpc("monocenter_get_state",{p_token:cookieToken(request)}))}catch{return json({error:"Banco compartilhado indisponível"},503)}}
export async function POST(request:Request){
  let body:{state?:unknown;action?:string;entity?:string;detail?:string};try{body=await request.json()}catch{return json({error:"Dados inválidos"},400)}
  try{return resultResponse(await rpc("monocenter_save_state",{p_token:cookieToken(request),p_state:body.state,p_action:body.action??"",p_entity:body.entity??"Sistema",p_detail:body.detail??""}))}catch{return json({error:"Banco compartilhado indisponível"},503)}
}
