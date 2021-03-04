import PokemonDetails from "./components/PokemonDetails";
import PokemonImage from "./components/PokemonImage";
import PokemonTypes from "./components/PokemonTypes";

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

export const TypeColors: Record<string, string> = {
  fire: "#FFA341",
  grass: "#98d7a5",
  electric: "#F2E04C",
  water: "#AABEFF",
  ground: "#D79624",
  rock: "#d5d5d4",
  fairy: "#FFC8CF",
  poison: "#BC8FED",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#FFECC0",
  fighting: "#E6E0D4",
  normal: "#D5D5D5",
};

const supportedTypes = Object.keys(TypeColors);

export default function PokedexInfo({ pokemon }: PokedexInfoProps) {
  const { id, name, types, sprites } = pokemon;

  const mainType = supportedTypes.find(type => types.indexOf(type) >= 0);

  return (
    <>
      <article
        className="pokedex-info"
        style={{
          background: mainType ? TypeColors[mainType] : undefined,
        }}
      >
        <PokemonImage name={name} front={sprites[0]} back={sprites[1]} />
        <section>
          <header>
            <h3>{name}</h3>
            <h5>#{id}</h5>
          </header>
          <section>
            <PokemonTypes pokemon={pokemon} />
            <PokemonDetails pokemon={pokemon} />
          </section>
        </section>
      </article>
    </>
  );
}
