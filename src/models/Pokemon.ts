import { PokemonResponse } from "./PokeAPI";

export default interface Pokemon {
  id: string;
  nameId: string;
  name: string;
  sprites: [front: string | null, back: string | null];
  types: string[];
}

function getPokemonName(name: string) {
  return name;
}

export function getPokemon(response: PokemonResponse): Pokemon {
  const name = response.name;
  return {
    id: response.id,
    nameId: name,
    name: getPokemonName(name),
    sprites: [
      response.sprites.front_default,
      response.sprites.back_default,
    ],
    types: response.types
      .sort((a, b) => Math.sign(b.slot - a.slot))
      .map(type => type.type.name),
  };
}
