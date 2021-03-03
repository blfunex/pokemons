import { useState } from "react";

export default function PokemonImage({
  name,
  back,
  front,
}: {
  name: string;
  back: string;
  front: string;
}) {
  const [showBack, setShowBack] = useState(false);

  return (
    <figure
      className={"pokedex-image " + (showBack ? "show-back" : "")}
      onClick={() => setShowBack(!showBack)}
    >
      {front && (
        <>
          <img
            className="is-front"
            src={front}
            alt={`A front view depiction of ${name}.`}
          />
          {back ? (
            <img
              className="is-back"
              src={back}
              alt={`A back view depiction of ${name}.`}
            />
          ) : (
            <img className="is-back is-alt" src={front} alt="" />
          )}
        </>
      )}
    </figure>
  );
}
