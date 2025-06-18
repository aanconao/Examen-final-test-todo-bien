import { Handlers, PageProps } from "$fresh/server.ts";
import Characters from "../components/Characters.tsx";
import { HarryPotterData } from "../types.ts";
import axios from "npm:axios";

export const handler: Handlers<HarryPotterData[]> = {
  async GET(_req, ctx) {
    const res = await axios.get<HarryPotterData[]>(
      "https://hp-api.onrender.com/api/characters/students",
    );
    return ctx.render(res.data);
  },
};

export default function StudentsPage(props: PageProps<HarryPotterData[]>) {
  return (
    <div>
      <h1>🎓 Estudiantes de Hogwarts</h1>
      <Characters characters={props.data} />
      <a href="/characters">← Volver</a>
    </div>
  );
}
