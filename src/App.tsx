import { useEffect, useReducer, useState } from "react";

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
  return fetch(input, init).then(response => {
    if (response.status !== 200) throw response.statusText;
    return response.json();
  });
}

function map_async<T, U>(
  input: T[],
  transform: (input: T) => Promise<U | null>
) {
  return Promise.all(input.map(transform)).then(list =>
    list.filter(x => x)
  );
}

// eslint-disable-next-line no-control-regex
const rxWierdCharacter = new RegExp("|\\n", "g");

async function fetchFlavorText(id: string): Promise<string[]> {
  try {
    const data = await fetchJSON(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );

    const flavor: string[] = data.flavor_text_entries
      .filter((entry: any) => entry.language.name === "en")
      .map((entry: any) =>
        entry.flavor_text.replace(rxWierdCharacter, " ")
      );

    const lowercase = flavor.map(text => text.toLowerCase());

    return flavor.filter((_, index) => {
      return lowercase.indexOf(lowercase[index], index + 1) < 0;
    });
  } catch {
    return [];
  }
}

async function fetchPokemon({
  url,
  name,
}: {
  url: string;
  name: string;
}): Promise<Pokemon | null> {
  try {
    const data = await fetchJSON(url);
    return {
      id: data.id,
      name: name[0].toUpperCase() + name.slice(1),
      sprites: [data.sprites.front_default, data.sprites.back_default],
      types: data.types.map((item: any) => item.type.name),
      flavor: await fetchFlavorText(data.id),
    };
  } catch {
    return null;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [done, setIsDone] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void fetchData(), []);

  async function fetchData() {
    if (!state.next) return setIsDone(true);
    const data = await fetchJSON(state.next);
    dispatch({
      type: "ADD_POKEMONS",
      pokemons: (await map_async(data.results, fetchPokemon)) as Pokemon[],
      next: data.next,
    });
  }

  return (
    <>
      <div className="pokedex">
        {state.pokemons.map((pokemon, index) => (
          <PokedexInfo key={index} pokemon={pokemon} />
        ))}
      </div>
      {done || <button onClick={fetchData}>Load more ...</button>}
    </>
  );
}

export default App;
