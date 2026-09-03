import {cookieToken,json,rpc,sessionCookie} from "@/lib/supabase-db";
export async function POST(request:Request){try{await rpc("monocenter_logout",{p_token:cookieToken(request)})}catch{}return json({ok:true},200,{"set-cookie":sessionCookie("",0)})}
