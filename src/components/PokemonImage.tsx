import { useCallback, useState } from "react";
import { UnknownPokemonPNG } from "../models/utilities";

export default function PokemonImage({
  name,
  sprites,
}: {
  name: string;
  sprites: [string | null, string | null];
}) {
  const [flipped, setFlipped] = useState(false);

  const front = sprites[0] || UnknownPokemonPNG;
  const back = sprites[1] || UnknownPokemonPNG;

  const toggleFlipped = useCallback(() => {
    setFlipped(!flipped);
  }, [flipped]);

  return (
    <figure
      onClick={toggleFlipped}
      className="pokemon-image"
      title="Click to flip"
    >
      <img
        src={flipped ? back : front}
        alt={`${flipped ? "Back" : "Front"} view of ${name}.`}
      />
      <figcaption>
        {flipped ? "Back" : "Front"} view of {name}.
      </figcaption>
    </figure>
  );
}
