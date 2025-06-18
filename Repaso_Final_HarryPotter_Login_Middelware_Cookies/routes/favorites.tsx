import { Handlers, PageProps } from "$fresh/server.ts";
import Characters from "../components/Characters.tsx";
import { HarryPotterData } from "../types.ts";
import axios from "npm:axios";

export const handler: Handlers<HarryPotterData[]> = {
  async GET(req, ctx) {
    const cookies = Object.fromEntries(
      (req.headers.get("Cookie") ?? "")
        .split(";")
        .map((c) => c.trim().split("=")),
    );
    const favs = cookies.favorites?.split(",") || [];

    const res = await axios.get<HarryPotterData[]>(
      "https://hp-api.onrender.com/api/characters",
    );

    return ctx.render(res.data.filter((c) => favs.includes(c.id)));
  },
};

export default function Page(props: PageProps<HarryPotterData[]>) {
  return (
    <>
      <h1>Favoritos</h1>
      {props.data.length === 0
        ? <p>No hay favoritos</p>
        : <Characters characters={props.data} />}
      <a href="/characters">← Volver</a>
    </>
  );
}
