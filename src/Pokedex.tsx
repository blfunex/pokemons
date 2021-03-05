import { QueryClient, QueryClientProvider } from "react-query";

import PokemonList from "./components/PokemonList";

const client = new QueryClient();

export default function Pokedex() {
  return (
    <QueryClientProvider client={client}>
      <PokemonList />
    </QueryClientProvider>
  );
}
