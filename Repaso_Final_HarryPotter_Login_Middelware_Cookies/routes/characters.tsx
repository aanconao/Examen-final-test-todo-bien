// routes/characters.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import Characters from "../components/Characters.tsx";
import FavoritesCounter from "../components/FavoritesCounter.tsx";
import { HarryPotterData } from "../types.ts";
import axios from "npm:axios";

type State = {
  name: string;
};

export const handler: Handlers<HarryPotterData[], State> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const search = url.searchParams.get("search");

    const res = await axios.get<HarryPotterData[]>(
      "https://hp-api.onrender.com/api/characters",
    );
    const data = res.data;

    if (search) {
      const found = data.find((c) => c.name === search);

      if (found) {
        const redirectUrl = `${url.origin}/characters/${found.id}`;
        return Response.redirect(redirectUrl, 302);
      }
    }

    return ctx.render(data);
  },
};

export default function Page(props: PageProps<HarryPotterData[], State>) {
  return (
    <div>
      <form method="POST" action="/logout">
        <button type="submit">Cerrar sesión</button>
      </form>

      <p>Bienvenido, {props.state.name}</p>

      <form method="GET" action="/characters">
        <input
          type="text"
          name="search"
          placeholder="Buscar personaje por nombre"
        />
        <button type="submit">Buscar</button>
      </form>
      <a href="/favorites">Ver favoritos</a>
      <a href="/students">Ver solo estudiantes</a>
      <FavoritesCounter />
      <Characters characters={props.data} />
    </div>
  );
}
