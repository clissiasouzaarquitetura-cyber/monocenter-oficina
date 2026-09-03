const SUPABASE_URL = "https://oijtqjxlqyvkdjkjwqvh.supabase.co";
const SUPABASE_KEY = "sb_publishable_DOmnANjAWIB3sPXBelKptQ_m6BuSL77";

export const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), {status, headers: {"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}});
export const cookieToken = (request: Request) => request.headers.get("cookie")?.match(/(?:^|;\s*)monocenter_session=([^;]+)/)?.[1] ?? "";
export const sessionCookie = (token: string, maxAge = 60*60*12) => `monocenter_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
export async function rpc<T extends Record<string,unknown>>(name:string,body:Record<string,unknown>):Promise<T>{
  const response=await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`,{method:"POST",headers:{apikey:SUPABASE_KEY,authorization:`Bearer ${SUPABASE_KEY}`,"content-type":"application/json"},body:JSON.stringify(body),cache:"no-store"});
  if(!response.ok)throw new Error(`Banco indisponível (${response.status})`);
  return await response.json() as T;
}
export const resultResponse=(result:Record<string,unknown>,headers:HeadersInit={})=>{const status=typeof result.status==="number"?result.status:200;const {status:_status,...payload}=result;return json(payload,status,headers)};
