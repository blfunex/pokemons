import { PropsWithChildren, useEffect, useState } from "react";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";

import PokemonImage from "./PokemonImage";
import PokemonTypes from "./PokemonTypes";

import { ResponseReference } from "../models/PokeAPI";

import Pokemon, { getPokemonName } from "../models/Pokemon";

import {
  getGenerationRomanNumeral,
  usePokemonQuery,
  usePokemonSpeciesQuery,
} from "../models/utilities";

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
            <PokemonFlavorText pokemon={pokemon} />
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

function PokemonFlavorText({ pokemon }: { pokemon: Pokemon }) {
  const [text, setText] = useState("");

  const [species, , loading] = usePokemonSpeciesQuery(pokemon.species.url);

  const [speak, cancel] = useSpeechSynthesis();

  useEffect(() => cancel(), [cancel, pokemon]);

  useEffect(() => {
    if (text && !loading) speak(text);
    return cancel;
  }, [cancel, speak, loading, text]);

  useEffect(() => {
    if (species) {
      setText(
        humanizeFlavorText(
          pokemon.id,
          pokemon.name,
          pokemon.types,
          species.generationId,
          species.flavorText
        )
      );
    }
  }, [pokemon.id, pokemon.name, pokemon.types, species]);

  return (
    <>
      {loading ? (
        <div
          className="pokemon-flavor-text"
          style={{ textAlign: "center" }}
        >
          <i className="gg-spinner" />
        </div>
      ) : species ? (
        <>
          <div className="pokemon-generation">
            Generation{" "}
            <code>{getGenerationRomanNumeral(species.generationId)}</code>
          </div>
          <div className="pokemon-flavor-text">{species.flavorText}</div>
        </>
      ) : (
        <div className="pokemon-flavor-text" style={{ color: "crimson" }}>
          Failed to load text for this pokemon.
        </div>
      )}
    </>
  );
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

export function humanizeList(
  prefix: string,
  types: string[],
  suffix: string
) {
  let text = "";
  switch (types.length) {
    case 0:
      break;
    case 1:
      text = types[0];
      break;
    case 2:
      text = types[0] + " and " + types[1];
      break;
    default:
      text =
        types.slice(-1).join(", ") + ", and " + types[types.length - 1];
      break;
  }
  return `${prefix} ${text} ${suffix}`;
}

export function humanizeFlavorText(
  id: string,
  name: string,
  types: string[],
  generation: string,
  text: string
) {
  return `Pokemon number ${id}, ${name}. ${name} ${humanizeList(
    `is a ${GenerationHumanizedText[generation]}`,
    types,
    "pokemon"
  )}.\n${text}`.toLowerCase();
}
