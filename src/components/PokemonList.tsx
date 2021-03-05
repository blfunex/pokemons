import { useCallback, useEffect, useRef } from "react";

import { useVirtual } from "react-virtual";
import { useInfiniteQuery } from "react-query";

import PokemonEntry from "./PokemonEntry";

import axios from "axios";
import { PokemonsResponse } from "../models/PokeAPI";

export interface PokemonListProps {}

const api = "https://pokeapi.co/api/v2/pokemon/";
const stride = 20;

function getAPI(page: number) {
  if (page) return `${api}?limit=${stride}&offset=${stride * page}`;
  return api;
}

export default function PokemonList() {
  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    // status,
    // error,
    data,
  } = useInfiniteQuery(
    "pokemons",
    async ({ pageParam }) => {
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

    const isLastPokemonOnScreen = last.index === pokemons.length - 1;

    if (canFetchNextPage && isLastPokemonOnScreen) {
      console.log("Fetching ...");
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
    <div
      ref={parentRef}
      style={{
        width: "100%",
        height: "300px",
        overflow: "auto",
      }}
      className="pokemon-list"
    >
      <ul
        style={{
          width: "100%",
          position: "relative",
          height: `${totalSize}px`,
        }}
      >
        {virtualItems.map(row => {
          const isLoadingRow = row.index > pokemons.length - 1;

          const pokemon = pokemons[row.index];

          return (
            <li
              key={row.index}
              ref={row.measureRef}
              style={{
                background: "white",
                minHeight: "100px",
                border: "1px solid red",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translate(0, ${row.start}px)`,
              }}
            >
              <pre>
                {isLoadingRow ? (
                  hasNextPage ? (
                    "Loading ..."
                  ) : (
                    "Nothing to load"
                  )
                ) : (
                  <PokemonEntry pokemon={pokemon} />
                )}
              </pre>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
