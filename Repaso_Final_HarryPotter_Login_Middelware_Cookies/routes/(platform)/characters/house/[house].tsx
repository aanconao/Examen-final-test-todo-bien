// routes/House/[house].tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { HarryPotterData } from "../../../../types.ts";
import Characters from "../../../../components/Characters.tsx"; // Usa tu componente de lista

export const handler: Handlers<HarryPotterData[] | null> = {
  async GET(_req, ctx) {
    const { house } = ctx.params;
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    const data: HarryPotterData[] = await res.json();

    const filtered = data.filter((c) => c.house === house);

    return ctx.render(filtered.length > 0 ? filtered : null);
  },
};

export default function HousePage(
  { data, params }: PageProps<HarryPotterData[] | null>,
) {
  if (!data) {
    return <h1>No se encontraron personajes en {params.house}</h1>;
  }

  return (
    <div class="characters-container">
      <h1>Personajes de {params.house}</h1>
      <Characters characters={data} />
      <a href="/characters">← Volver a la lista</a>
    </div>
  );
}
