import useQuery from "../hooks/useQuery";
import useResponseTransform from "../hooks/useResponseTransform";

import { PokemonResponse, ResponseReference } from "../models/PokeAPI";
import { getPokemon } from "../models/Pokemon";

export interface PokemonEntryProps {
  pokemon: ResponseReference;
}

export default function PokemonEntry({
  pokemon: reference,
}: PokemonEntryProps) {
  const response = useQuery<PokemonResponse>(reference.url);

  const [loading, error] = response;

  const pokemon = useResponseTransform(response, getPokemon);

  return (
    <>
      {loading && (
        <div style={{ color: "gray" }}>
          Loading pokemon named {reference.name} ...
        </div>
      )}
      {error && (
        <div style={{ color: "red" }}>
          Error while loading pokemon named {reference.name}:{error}
        </div>
      )}
      {pokemon && (
        <dl>
          <dt>Name</dt>
          <dd>{pokemon.name}</dd>
          <dt>Front sprite</dt>
          <dd>
            {pokemon.sprites[0] && <img alt="" src={pokemon.sprites[0]} />}
          </dd>
          <dt>Back sprite</dt>
          <dd>
            {pokemon.sprites[1] && <img alt="" src={pokemon.sprites[1]} />}
          </dd>
          <dt>Types</dt>
          <dd>{pokemon.types.join(", ")}</dd>
        </dl>
      )}
    </>
  );
}
