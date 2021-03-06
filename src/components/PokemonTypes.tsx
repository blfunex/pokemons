export default function PokemonTypes({ types }: { types: string[] }) {
  return (
    <div className="pokemon-types">
      {types.map(type => (
        <PokemonType key={type} type={type} />
      ))}
    </div>
  );
}

function PokemonType({ type }: { type: string }) {
  return (
    <div className={`pokemon-type pokemon-type-${type}`}>
      {type.toUpperCase()}
    </div>
  );
}
