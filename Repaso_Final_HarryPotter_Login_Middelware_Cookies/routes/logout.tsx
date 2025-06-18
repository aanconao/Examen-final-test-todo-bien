import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST() {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      "name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    );
    headers.append("location", "/");
    return new Response(null, { status: 302, headers });
  },
};
