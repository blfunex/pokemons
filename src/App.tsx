import { useCallback, useState } from "react";

import PokemonDetails from "./components/PokemonDetails";
import PokemonNavigation from "./components/PokemonNavigation";

import { ResponseReference } from "./models/PokeAPI";

export default function App() {
  const [selected, setSelected] = useState<ResponseReference | null>(null);

  const unselect = useCallback(() => setSelected(null), []);

  return (
    <>
      <AppHeader />
      <PokemonNavigation selected={selected} setSelected={setSelected} />
      <PokemonDetails selected={selected} unselect={unselect} />
      <AppFooter />
    </>
  );
}

function AppHeader() {
  return (
    <header>
      <h1>Pokedex</h1>
    </header>
  );
}

function AppFooter() {
  return (
    <footer>
      <p>All right rights reserved to their respective owners.</p>
      <p>
        {"Website made using "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://pokeapi.co/docs/v2"
        >
          PokeAPI
        </a>
        {" backend. Source available on "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/blfunex/pokemons/"
        >
          GitHub
        </a>
        .
      </p>
      <p>Pokemons are a &copy; intellectual property of Nintendo.</p>
    </footer>
  );
}
