import { useEffect, useReducer } from "react";

import PokedexInfo, { Pokemon } from "./PokedexInfo";

type Action = {
  type: "ADD_POKEMONS";
  pokemons: Pokemon[];
  next: string;
};

type State = {
  next: string;
  pokemons: Pokemon[];
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_POKEMONS":
      return {
        ...state,
        pokemons: state.pokemons.concat(action.pokemons),
        next: action.next,
      };
    default:
      return state;
  }
}

const initial = {
  pokemons: [],
  next: "https://pokeapi.co/api/v2/pokemon/?limit=30",
};

function fetchJSON(input: RequestInfo, init?: RequestInit) {
  return fetch(input, init).then(response => response.json());
}

function map_async<T, U>(input: T[], transform: (input: T) => Promise<U>) {
  return Promise.all(input.map(transform));
}

// eslint-disable-next-line no-control-regex
const rxWierdCharacter = new RegExp("|\\n", "g");

async function fetchFlavorText(id: string): Promise<string[]> {
  const data = await fetchJSON(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );

  const flavor: string[] = data.flavor_text_entries
    .filter((entry: any) => entry.language.name === "en")
    .map((entry: any) => entry.flavor_text.replace(rxWierdCharacter, " "));

  const lowercase = flavor.map(text => text.toLowerCase());

  return flavor.filter((_, index) => {
    return lowercase.indexOf(lowercase[index], index + 1) < 0;
  });
}

async function fetchPokemon({
  url,
  name,
}: {
  url: string;
  name: string;
}): Promise<Pokemon> {
  const data = await fetchJSON(url);
  return {
    id: data.id,
    name,
    sprites: [data.sprites.front_default, data.sprites.back_default],
    types: data.types.map((item: any) => item.type.name),
    flavor: await fetchFlavorText(data.id),
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => void fetchData(), []);

  async function fetchData() {
    const data = await fetchJSON(state.next);
    dispatch({
      type: "ADD_POKEMONS",
      pokemons: await map_async(data.results, fetchPokemon),
      next: data.next,
    });
  }

  return (
    <>
      <div className="pokedex" style={{ overflowY: "auto" }}>
        {state.pokemons.map((pokemon, index) => (
          <PokedexInfo key={index} pokemon={pokemon} />
        ))}
      </div>
      <button onClick={fetchData}>Load more ...</button>
    </>
  );
}

export default App;
