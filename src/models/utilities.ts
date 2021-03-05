import axios from "axios";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

import useQ from "../hooks/useCachedQuery";

import {
  PokemonResponse,
  PokemonsResponse,
  ResponseReference,
} from "./PokeAPI";

import Pokemon, { getPokemon } from "./Pokemon";

import UnknownPokemonPNG from "./unknown-pokemon.png";

export { UnknownPokemonPNG };

export function getUnknownPokemon(pokemon: Pokemon, error: boolean) {
  if (error) return UnknownPokemonPNG;
  return pokemon.sprites[1] || pokemon.sprites[0] || UnknownPokemonPNG;
}

export function getGenerationRomanNumeral(generationId: string) {
  return generationId.slice(11).toUpperCase();
}

export const GenerationHumanizedText: Record<string, string> = {
  "generation-i": "first generation",
  "generation-ii": "second generation",
  "generation-iii": "third generation",
  "generation-iv": "fourth generation",
  "generation-v": "fifth generation",
  "generation-vi": "sixth generation",
  "generation-vii": "seventh generation",
  "generation-viii": "eighth generation",
};

const cache = {};

export function usePokemonQuery(url: string) {
  const [result, setResult] = useState<Pokemon | null>(null);

  const [response, error, loading] = useQ<PokemonResponse>(cache, url);

  useEffect(() => {
    if (response) {
      setResult(getPokemon(response));
    }
  }, [response]);

  return [result, error, loading] as const;
}

const backend = "https://pokeapi.co/api/v2/pokemon/";
const stride = 50;

function getPokemons(page: number) {
  return `${backend}?limit=${stride}&offset=${stride * page}`;
}

export function useInfinitePokemonQuery() {
  const [pokemons, setPokemons] = useState<ResponseReference[]>([]);

  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
    error,
    data,
  } = useInfiniteQuery(
    "pokemons",
    async ({ pageParam = 0 }) => {
      const url = getPokemons(pageParam);

      const result = await axios.get<PokemonsResponse>(url);

      return result.data.results;
    },
    {
      getNextPageParam(last, all) {
        return last.length ? all.length : false;
      },
    }
  );

  useEffect(() => {
    if (!data) return;
    setPokemons(data.pages.flat(1));
  }, [data]);

  return [
    pokemons,
    !hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    status,
  ] as const;
}

export function noop() {}
