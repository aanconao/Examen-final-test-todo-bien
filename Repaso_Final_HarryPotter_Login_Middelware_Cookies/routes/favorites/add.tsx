import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const id = form.get("id")?.toString();
    if (!id) return new Response("Error", { status: 400 });

    const cookies = Object.fromEntries(
      (req.headers.get("Cookie") ?? "")
        .split(";")
        .map((c) => c.trim().split("=")),
    );

    const favs = cookies.favorites?.split(",") || [];
    if (!favs.includes(id)) favs.push(id);

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": `favorites=${favs.join(",")}; Path=/`,
        "Location": "/characters",
      },
    });
  },
};
