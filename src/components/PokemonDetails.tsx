import { PropsWithChildren } from "react";

import { ResponseReference } from "../models/PokeAPI";
import { getPokemonName } from "../models/Pokemon";
import { usePokemonQuery } from "../models/utilities";
import PokemonImage from "./PokemonImage";
import PokemonTypes from "./PokemonTypes";

type PokemonUnselect = {
  unselect(): void;
};

type PokemonSelected = {
  selected: ResponseReference;
};

type PokemonNullableSelected = {
  selected: ResponseReference | null;
};

export type PokemonDetailsProps = PokemonNullableSelected &
  PokemonUnselect;

export default function PokemonDetails({
  selected,
  unselect,
}: PokemonDetailsProps) {
  return (
    <>
      {selected ? (
        <PokemonDetailsView selected={selected} unselect={unselect} />
      ) : (
        <article className="pokemon-details closed">
          Select a pokemon from the right panel.
        </article>
      )}
    </>
  );
}
export type PokemonDetailsViewProps = PokemonSelected & PokemonUnselect;

function PokemonDetailsView({
  selected,
  unselect,
}: PokemonDetailsViewProps) {
  const [pokemon, error, loading] = usePokemonQuery(selected.url);

  const stateClassNames: string[] = [];

  loading && stateClassNames.push("loading");
  error && stateClassNames.push("error");

  return (
    <article
      className={`pokemon-details open ${stateClassNames.join(" ")}`}
    >
      {pokemon ? (
        <>
          <PokemonDetailsHeader unselect={unselect}>
            {pokemon.name}
            <code>#{pokemon.id}</code>
          </PokemonDetailsHeader>
          <main>
            <PokemonImage name={pokemon.name} sprites={pokemon.sprites} />
            <PokemonTypes types={pokemon.types} />
          </main>
        </>
      ) : loading ? (
        <i className="gg-spinner" />
      ) : (
        <>
          <PokemonDetailsHeader unselect={unselect}>
            Error loading data {getPokemonName(selected.name)}
          </PokemonDetailsHeader>
          <main>{error}</main>
        </>
      )}
    </article>
  );
}

function PokemonDetailsHeader({
  unselect,
  children,
}: PropsWithChildren<PokemonUnselect>) {
  return (
    <header>
      <button onClick={unselect}>
        <i className="gg-chevron-left"></i>
      </button>
      <h1>{children}</h1>
    </header>
  );
}
