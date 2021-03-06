export interface ResponseReference {
  name: string;
  url: string;
}

interface PokemonResponse {
  // ...
  id: string;
  name: string;
  species: ResponseReference;
  sprites: {
    back_default: null | string;
    front_default: null | string;
    // ...
  };
  types: PokemonResponse.PokemonType[];
}

declare namespace PokemonResponse {
  export interface PokemonType {
    slot: number;
    type: ResponseReference;
  }
}

export type { PokemonResponse };

export interface PokemonSpeciesResponse {
  // ...
  generation: ResponseReference;
  flavor_text_entries: {
    flavor_text: string;
    language: ResponseReference;
    version: ResponseReference;
  }[];
}

export interface PokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResponseReference[];
}
