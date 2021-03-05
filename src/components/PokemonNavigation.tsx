import { useCallback, useEffect, useRef } from "react";

import { useVirtual } from "react-virtual";
import { useInfiniteQuery } from "react-query";

import axios from "axios";

import { PokemonsResponse } from "../models/PokeAPI";

import useCachedQuery from "../hooks/useCachedQuery";

import { PokemonResponse, ResponseReference } from "../models/PokeAPI";
import { getPokemon, getPokemonName } from "../models/Pokemon";

import UnknownPokemonPNG from "./unknown-pokemon.png";

const backend = "https://pokeapi.co/api/v2/pokemon/";
const stride = 50;

function getAPI(page: number) {
  return `${backend}?limit=${stride}&offset=${stride * page}`;
}

interface PokemonEntryProps {
  pokemon: ResponseReference;
}

const pokemonCache = {};

function PokemonEntry({ pokemon: reference }: PokemonEntryProps) {
  const [loading, error, response] = useCachedQuery<PokemonResponse>(
    pokemonCache,
    reference.url
  );

  if (!response) {
    if (loading) {
      return (
        <>
          <img
            className="unknown-pokemon-image"
            src={UnknownPokemonPNG}
            alt=""
          />
          <span className="pokemon-name">
            {getPokemonName(reference.name)}
          </span>
          <span className="pokemon-id">
            #{getPokemonIdFromURL(reference)}
          </span>
        </>
      );
    }

    return <div className="error">{error}</div>;
  }

  const pokemon = getPokemon(response);
  const sprite =
    pokemon.sprites[1] || pokemon.sprites[0] || UnknownPokemonPNG;

  return (
    <>
      <img className="unknown-pokemon-image" alt="" src={sprite} />
      <span className="pokemon-name">{pokemon.name}</span>
      <span className="pokemon-id">#{pokemon.id}</span>
    </>
  );
}

function getPokemonIdFromURL(reference: ResponseReference) {
  const url = reference.url;
  return url.slice(url.lastIndexOf("/", url.length - 2) + 1, -1);
}

export default function PokemonNavigation() {
  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    // status,
    // error,
    data,
  } = useInfiniteQuery(
    "pokemons",
    async ({ pageParam = 0 }) => {
      const url = getAPI(pageParam);

      const result = await axios.get<PokemonsResponse>(url);

      const response = result.data;

      return response.results;
    },
    {
      getNextPageParam(last, all) {
        return last.length ? all.length : false;
      },
    }
  );

  const parentRef = useRef<HTMLDivElement>(null!);

  const pokemons = data ? data.pages.flat(1) : [];

  const { virtualItems, totalSize } = useVirtual({
    parentRef: parentRef,
    size: hasNextPage ? pokemons.length + 1 : pokemons.length,
    estimateSize: useCallback(() => 100, []),
  });

  useEffect(() => {
    const last = virtualItems[virtualItems.length - 1];

    if (!last) return;

    const canFetchNextPage = hasNextPage && !isFetchingNextPage;

    const isLastPokemonOnScreen = last.index >= pokemons.length - 1;

    if (canFetchNextPage && isLastPokemonOnScreen) {
      fetchNextPage();
    }
  }, [
    pokemons.length,
    virtualItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  ]);

  return (
    <nav ref={parentRef} className="pokemon-navigation">
      <ul style={{ height: totalSize }}>
        {virtualItems.map(row => {
          const isLoadingRow = row.index > pokemons.length - 1;

          const pokemon = pokemons[row.index];

          return (
            <li
              tabIndex={row.index + 1}
              key={row.index}
              ref={row.measureRef}
              style={{ transform: `translateY(${row.start}px)` }}
            >
              {isLoadingRow ? (
                hasNextPage ? (
                  "Loading ..."
                ) : (
                  "Nothing to load"
                )
              ) : (
                <PokemonEntry pokemon={pokemon} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
