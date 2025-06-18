import { MiddlewareHandler } from "$fresh/server.ts";
type State = {
  name: string;
};
export const handler: MiddlewareHandler<State> = async (req, ctx) => {
  const cookieHeader = req.headers.get("Cookie");
  const cookies = cookieHeader?.split(";") ?? [];
  const nameCookie = cookies.find((c) => c.trim().startsWith("name="));
  if (nameCookie) {
    const name = nameCookie.split("=")[1];
    ctx.state.name = name;
    return await ctx.next();
  }
  if (ctx.route === "/") {
    return await ctx.next();
  }
  return new Response(null, {
    status: 302,
    headers: { location: "/" },
  });
};
