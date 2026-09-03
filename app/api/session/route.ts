import {cookieToken,json,resultResponse,rpc} from "@/lib/supabase-db";
export async function GET(request:Request){try{return resultResponse(await rpc("monocenter_session",{p_token:cookieToken(request)}))}catch{return json({error:"Banco indisponível"},503)}}
