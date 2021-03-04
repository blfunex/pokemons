import PokemonImage from "./image";

import useModalDialog from "../hooks/useModalDialog";

import type { Pokemon } from "../PokedexInfo";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";

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

export default function PokemonDetails({
  pokemon: { flavor, name, sprites, types },
}: {
  pokemon: Pokemon;
}) {
  const [speak, cancel] = useSpeechSynthesis();

  const [ref, close, open] = useModalDialog(cancel);

  return (
    <>
      <div className="pokedex-details">
        <button
          type="button"
          className="nes-btn is-primary is-small"
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
          <header>
            <h3>{name}'s details</h3>
            <button type="button" onClick={close}>
              <i className="nes-icon is-small close"></i>
            </button>
          </header>
          <main>
            <PokemonImage
              name={name}
              front={sprites[0]}
              back={sprites[1]}
            />
            <section>
              {flavor.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </section>
          </main>
        </dialog>
      </div>
    </>
  );
}
