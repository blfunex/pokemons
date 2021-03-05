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

  if (!pokemon) {
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
      </>
    );
  }

  const sprite = pokemon.sprites[1] || pokemon.sprites[0];

  return (
    <div>
      {sprite ? <img src={sprite} alt="" /> : <div>?</div>}
      <span>#{pokemon.id}</span>
    </div>
  );
}
