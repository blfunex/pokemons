import PokemonNavigation from "./components/PokemonNavigation";

export default function App() {
  return (
    <>
      <header>
        <h1>Pokedex</h1>
      </header>
      <PokemonNavigation />
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
    </>
  );
}
