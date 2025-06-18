import { FunctionComponent } from "preact/src/index.d.ts";
import { HarryPotterData } from "../types.ts";
import CharacterCard from "./CharacterCard.tsx";

type Props = {
  characters: HarryPotterData[];
};

const Characters: FunctionComponent<Props> = (props) => {
  const characters = props.characters;
  return (
    <div class="cards-grid">
      {characters?.map((ch) => (
        <CharacterCard
          key={ch.name}
          character={ch}
        />
      ))}
    </div>
  );
};

export default Characters;
