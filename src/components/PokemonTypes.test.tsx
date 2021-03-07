import { render, screen } from "@testing-library/react";

import PokemonTypes from "./PokemonTypes";

test("Renders pokemon types", () => {
  render(<PokemonTypes types={["nature", "dark", "poison"]} />);
  const items = screen.getAllByText(/nature|dark|poison/i);
  expect(items.length).toEqual(3);
});

test("Renders the pokemon types correctly", () => {
  render(<PokemonTypes types={["nature", "dark", "poison"]} />);
  const items = screen.getAllByText(/nature|dark|poison/i);
  expect(items[0].textContent).toEqual("NATURE");
  expect(items[1].textContent).toEqual("DARK");
  expect(items[2].textContent).toEqual("POISON");
});

test("Renders pokemon types as `pokemon-type`", () => {
  render(<PokemonTypes types={["nature", "dark", "poison"]} />);
  const items = screen.getAllByText(/nature|dark|poison/i);
  expect(
    items.every(item => item.className.includes("pokemon-type"))
  ).toBeTruthy();
});
