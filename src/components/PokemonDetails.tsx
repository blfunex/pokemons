import PokemonImage from "./PokemonImage";

import useModalDialog from "../hooks/useModalDialog";

import type { Pokemon } from "../PokedexInfo";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import PokemonTypes from "./PokemonTypes";

function subjunction(items: string[], suffix = "", prefix = "") {
  switch (items.length) {
    case 0:
      return "";
    case 1:
      return `${prefix} ${items[0]} ${suffix}`;
    case 2:
      return `${prefix} ${items[0]} and ${items[1]} ${suffix}`;
    default:
      return `${prefix} ${items.slice(0, -1).join(", ")} and ${
        items[items.length - 1]
      } ${suffix}`;
  }
}

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const [speak, cancel] = useSpeechSynthesis();

  const [ref, close, open, isDialogOpen] = useModalDialog(cancel);

  const { flavor, name, sprites, types } = pokemon;

  const hasFlavorText = flavor.length > 0;

  return (
    <>
      {hasFlavorText ? (
        <>
          <p>{flavor[0]}</p>
          <div className="pokedex-details">
            <button
              type="button"
              className="nes-btn is-primary"
              onClick={() => {
                open();
                speak(
                  `This is ${name}, ${subjunction(
                    types,
                    "pokemon",
                    "it is a"
                  )}.\n${flavor.join("\n")}`
                );
              }}
            >
              More details
            </button>
            <dialog className="nes-dialog pokedex-dialog" ref={ref}>
              {isDialogOpen && (
                <>
                  <header>
                    <h3>{name}'s details</h3>
                    <button type="button" onClick={close}>
                      <i className="nes-icon is-small close"></i>
                    </button>
                  </header>
                  <main>
                    <section>
                      <PokemonImage
                        name={name}
                        front={sprites[0]}
                        back={sprites[1]}
                      />
                      <PokemonTypes pokemon={pokemon} />
                    </section>
                    <section>
                      {flavor.map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                    </section>
                  </main>
                </>
              )}
            </dialog>
          </div>
        </>
      ) : (
        <p>No details were found about this pokemon</p>
      )}
    </>
  );
}
