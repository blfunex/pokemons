import { Pokemon, TypeColors } from "../PokedexInfo";

export default function PokemonTypes({
  pokemon: { types },
}: {
  pokemon: Pokemon;
}) {
  return (
    <div className="pokedex-types">
      {types.map((type, index) => (
        <span key={index} className="nes-badge">
          <span
            className="is-dark"
            style={{
              color: TypeColors[type],
            }}
          >
            {type.toUpperCase()}
          </span>
        </span>
      ))}
    </div>
  );
}
