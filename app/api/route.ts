import { json, rpc } from "@/lib/supabase-db";

type LoginResult = {
  status?: number;
  error?: string;
  user?: { username?: string; displayName?: string; role?: string };
};

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Dados inválidos" }, 400);
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";
  if (!username || !password) {
    return json({ error: "Informe o usuário administrador e a senha" }, 400);
  }

  try {
    const result = await rpc<LoginResult>("monocenter_login", {
      p_username: username,
      p_password: password,
      p_ip: request.headers.get("x-forwarded-for") ?? "local",
    });
    if (result.error || !result.user) {
      return json({ error: result.error ?? "Senha administrativa incorreta" }, result.status ?? 401);
    }
    if (result.user.role !== "admin") {
      return json({ error: "Este usuário não possui permissão de administrador" }, 403);
    }
    return json({ ok: true, displayName: result.user.displayName ?? result.user.username }, 200);
  } catch {
    return json({ error: "Não foi possível validar a senha. Tente novamente." }, 503);
  }
}
