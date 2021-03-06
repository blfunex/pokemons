import axios from "axios";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

import useCachedQuery from "../hooks/useCachedQuery";

import {
  PokemonResponse,
  PokemonSpeciesResponse,
  PokemonsResponse,
  ResponseReference,
} from "./PokeAPI";

import Pokemon, {
  getPokemon,
  getPokemonSpecies,
  PokemonSpecies,
} from "./Pokemon";

import UnknownPokemonPNG from "./unknown-pokemon.png";

export { UnknownPokemonPNG };

export function getUnknownPokemon(pokemon: Pokemon, error: boolean) {
  if (error) return UnknownPokemonPNG;
  return pokemon.sprites[1] || pokemon.sprites[0] || UnknownPokemonPNG;
}

export function getGenerationRomanNumeral(generationId: string) {
  return generationId.slice(11).toUpperCase();
}

const species = {};

export function usePokemonSpeciesQuery(url: string) {
  const [result, setResult] = useState<PokemonSpecies | null>(null);

  const [
    response,
    error,
    loading,
  ] = useCachedQuery<PokemonSpeciesResponse>(
    species,
    // https://github.com/PokeAPI/pokeapi/issues/574
    url.slice(0, -1)
  );

  useEffect(() => {
    if (response) {
      setResult(getPokemonSpecies(response));
    }
  }, [response]);

  return [result, error, loading] as const;
}

const pokemons = {};

export function usePokemonQuery(url: string) {
  const [result, setResult] = useState<Pokemon | null>(null);

  const [response, error, loading] = useCachedQuery<PokemonResponse>(
    pokemons,
    // https://github.com/PokeAPI/pokeapi/issues/574
    url.slice(0, -1)
  );

  useEffect(() => {
    if (response) {
      setResult(getPokemon(response));
    }
  }, [response]);

  return [result, error, loading] as const;
}

const backend = "https://pokeapi.co/api/v2/pokemon/";
const stride = 50;

function getPokemonsURL(page: number) {
  return `${backend}?limit=${stride}&offset=${stride * page}`;
}

export function useInfinitePokemonQuery() {
  const [pokemons, setPokemons] = useState<ResponseReference[]>([]);
  // const [canceler, setCanceler] = useState<Canceler>(noop);

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
      const url = getPokemonsURL(pageParam);

      // const token = new axios.CancelToken(setCanceler);

      const result = await axios.get<PokemonsResponse>(url, {
        // cancelToken: token,
      });

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
    // canceler,
    pokemons,
    !hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
    status,
  ] as const;
}

export function noop() {}
