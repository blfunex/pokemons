import PokemonImage from "./image";

import useModalDialog from "../hooks/useModalDialog";

import type { Pokemon } from "../PokedexInfo";

export default function PokemonDetails({
  pokemon: { flavor, name, sprites },
}: {
  pokemon: Pokemon;
}) {
  const [ref, close, open] = useModalDialog();

  return (
    <>
      <button type="button" className="nes-button" onClick={open}>
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
          <PokemonImage name={name} front={sprites[0]} back={sprites[1]} />
          <section>
            {flavor.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </section>
        </main>
      </dialog>
    </>
  );
}
