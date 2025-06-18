import { FreshContext, Handlers } from "$fresh/server.ts";
import Login from "../islands/Login.tsx";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const usernameUrl = url.searchParams.get("username");
    const passwordUrl = url.searchParams.get("password");

    console.log("username: ", usernameUrl);
    console.log("password: ", passwordUrl);

    if (!usernameUrl || !passwordUrl) return ctx.render();

    if (passwordUrl !== "1234") return ctx.render();

    const headers = new Headers();
    headers.append("Set-Cookie", `name=${usernameUrl};path=/`);
    headers.append("location", "/characters");

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
