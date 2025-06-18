import { Handlers, PageProps } from "$fresh/server.ts";
import { HarryPotterData } from "../../../types.ts";

export const handler: Handlers<HarryPotterData | null> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;

    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const data: HarryPotterData[] = await res.json();

    const character = data.find((c) => c.id === id) || null;

    return ctx.render(character);
  },
};

export default function CharacterPage(
  { data }: PageProps<HarryPotterData | null>,
) {
  if (!data) {
    return <h1>Personaje no encontrado</h1>;
  }

  return (
    <div class="page-container">
      <div class="character-card">
        <h1>{data.name}</h1>
        <img src={data.image} alt={data.name} width={200} />

        <p>
          <strong>Actor:</strong> {data.actor}
        </p>
        <p>
          <strong>Casa:</strong>
          <a href={`/characters/house/${data.house}`}>{data.house}</a>
        </p>

        <div>
          <strong>Alternate names:</strong>
          {data.alternate_names.length > 0
            ? (
              <ul>
                {data.alternate_names.map((name) => (
                  <li key={data.id}>{name}</li>
                ))}
              </ul>
            )
            : <p>Ninguno</p>}
        </div>

        <div>
          <strong>Alive:</strong>
          {data.alive ? "vivo" : "muerto"}
        </div>

        <div>
          <strong>Varita:</strong>
          <ul>
            <li>
              <strong>Wood:</strong> {data.wand.wood || "Desconocido"}
            </li>
            <li>
              <strong>Core:</strong> {data.wand.core || "Desconocido"}
            </li>
            <li>
              <strong>Length:</strong> {data.wand.length || "?"}″
            </li>
          </ul>
        </div>

        <a href="/characters">
          Volver a la lista de personajes
        </a>
      </div>
    </div>
  );
}
