import { useCallback, useEffect, useState } from "react";
import { UnknownPokemonPNG } from "../models/utilities";

export default function PokemonImage({
  name,
  sprites,
}: {
  name: string;
  sprites: [string | null, string | null];
}) {
  const [flipped, setFlipped] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const front = sprites[0] || UnknownPokemonPNG;
  const back = sprites[1] || UnknownPokemonPNG;

  useEffect(() => {
    setFlipped(false);
    setLoaded(false);
  }, [name]);

  const toggleFlipped = useCallback(() => {
    setFlipped(!flipped);
    setLoaded(false);
  }, [flipped]);

  return (
    <figure
      onClick={toggleFlipped}
      className="pokemon-image"
      title="Click to flip"
    >
      {loaded ? null : (
        <div className="loading">
          <i className="gg-spinner" />
        </div>
      )}
      <img
        hidden={!loaded}
        onLoad={onLoad}
        src={flipped ? back : front}
        alt={`${flipped ? "Back" : "Front"} view of ${name}.`}
      />
      <figcaption>
        {flipped ? "Back" : "Front"} view of {name}.
      </figcaption>
    </figure>
  );
}
