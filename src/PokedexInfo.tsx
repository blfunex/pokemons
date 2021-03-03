import { useEffect, useRef, useState } from "react";

export type Pokemon = {
  id: string;
  name: string;
  sprites: [string, string];
  flavor: string[];
  types: string[];
};

interface PokedexInfoProps {
  pokemon: Pokemon;
}

interface PokedexDetailsProps extends PokedexInfoProps {
  open: boolean;
  onClose(): void;
}

const colors: Record<string, string> = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

function PokedexDetails({
  open,
  onClose,
  pokemon: { flavor },
}: PokedexDetailsProps) {
  const dialogElementRef = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    const dialogElement = dialogElementRef.current;
    if (dialogElement) {
      if (open) {
        if (dialogElement.hasAttribute("open"))
          dialogElement.removeAttribute("open");
        dialogElement.showModal();
      } else {
        dialogElement.close();
      }
      dialogElement.addEventListener("close", onClose);
      return () => dialogElement.removeEventListener("close", onClose);
    }
  }, [dialogElementRef, open, onClose]);

  return (
    <dialog ref={dialogElementRef}>
      {flavor.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </dialog>
  );
}

export default function PokedexInfo({ pokemon }: PokedexInfoProps) {
  const [showBack, setShowBack] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const {
    id,
    name,
    sprites: [front, back],
    types,
    flavor,
  } = pokemon;

  const captalizedName = name[0].toUpperCase() + name.slice(1);

  return (
    <>
      <article
        className="pokedex-info"
        style={{
          background: colors[types[0]],
        }}
      >
        <figure onClick={() => setShowBack(!showBack)}>
          <img
            className={showBack ? "is-back" : ""}
            src={showBack ? back : front}
            alt={`A depiction of ${name}`}
          />
        </figure>
        <header>
          <h3>{captalizedName}</h3>
          <h5>#{id}</h5>
        </header>
        <section>
          {types.map((type, index) => (
            <span key={index} className="nes-badge">
              <span className="is-dark">{type}</span>
            </span>
          ))}
          <p>{flavor[0]}</p>

          <button
            type="button"
            className="nes-button"
            onClick={() => setShowDetails(true)}
          >
            More details
          </button>
        </section>
        <PokedexDetails
          pokemon={pokemon}
          open={showDetails}
          onClose={() => setShowDetails(false)}
        />
      </article>
    </>
  );
}
