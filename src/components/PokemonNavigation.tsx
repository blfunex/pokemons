import { useCallback, useEffect, useRef, useState } from "react";

import { useVirtual } from "react-virtual";

import { ResponseReference } from "../models/PokeAPI";
import Pokemon, { getPokemonName } from "../models/Pokemon";

import {
  getUnknownPokemon as getMisteryPokemonSprite,
  noop,
  useInfinitePokemonQuery,
  usePokemonQuery,
} from "../models/utilities";

interface PokemonEntryProps {
  pokemon: ResponseReference;
}

function PokemonMistryImage({ pokemon }: { pokemon: Pokemon | null }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setLoaded(true);
    setError(true);
  }, []);

  return (
    <>
      {pokemon ? (
        <img
          hidden={!loaded}
          className="unknown-pokemon-image"
          src={getMisteryPokemonSprite(pokemon, error)}
          onLoad={onLoad}
          onError={onError}
          alt=""
        />
      ) : null}
      {loaded ? null : (
        <div className="unknown-pokemon-image">
          <div className="gg-spinner" />
        </div>
      )}
    </>
  );
}

function PokemonEntry({ pokemon: reference }: PokemonEntryProps) {
  const [pokemon] = usePokemonQuery(reference.url);

  return (
    <>
      <PokemonMistryImage pokemon={pokemon} />
      <div className="pokemon-name">
        {pokemon ? pokemon.name : getPokemonName(reference.name)}
      </div>
      <div className="pokemon-id">
        #{pokemon ? pokemon.id : getPokemonIdFromURL(reference)}
      </div>
    </>
  );
}

function getPokemonIdFromURL(reference: ResponseReference) {
  const url = reference.url;
  return url.slice(url.lastIndexOf("/", url.length - 2) + 1, -1);
}

export interface PokemonNavigationProps {
  selected: ResponseReference | null;
  setSelected(selected: ResponseReference | null): void;
}

export default function PokemonNavigation({
  selected,
  setSelected,
}: PokemonNavigationProps) {
  const [
    // _,
    data,
    done,
    fetch,
    loading,
  ] = useInfinitePokemonQuery();

  const parentRef = useRef<HTMLDivElement>(null!);

  const { virtualItems, totalSize } = useVirtual({
    parentRef: parentRef,
    size: done ? data.length : data.length + 1,
    estimateSize: useCallback(() => 40, []),
  });

  useEffect(() => {
    const last = virtualItems[virtualItems.length - 1];

    if (!last) return;

    const canFetchNextPage = !done && !loading;

    const isLastPokemonOnScreen = last.index >= data.length - 1;

    if (canFetchNextPage && isLastPokemonOnScreen) {
      fetch();
    }
  }, [data.length, virtualItems, loading, done, fetch]);

  return (
    <nav ref={parentRef} className="pokemon-navigation">
      <ul style={{ height: totalSize }}>
        {virtualItems.map(row => {
          const isOverflow = row.index > data.length - 1;
          const isLoadingRow = isOverflow && !done;

          const pokemon = data[row.index];

          return (
            <li
              className={
                isLoadingRow
                  ? "loading"
                  : selected &&
                    (selected === pokemon ||
                      selected.name === pokemon.name)
                  ? "active"
                  : ""
              }
              tabIndex={row.index + 1}
              key={row.index}
              ref={row.measureRef}
              style={{ transform: `translateY(${row.start}px)` }}
              onClick={isOverflow ? noop : () => setSelected(pokemon)}
            >
              {isLoadingRow ? (
                <div className="unknown-pokemon-image">
                  <div className="gg-spinner" />
                </div>
              ) : isOverflow ? null : (
                <PokemonEntry pokemon={pokemon} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
