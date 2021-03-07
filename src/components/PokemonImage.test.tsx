import { render, screen } from "@testing-library/react";

import PokemonImage from "./PokemonImage";

test("Renders a pokemon image", () => {
  render(<PokemonImage name="Pikachu" sprites={["a.png", "b.png"]} />);
  const back = screen.getByAltText(/front view of/i);
  expect(back).toBeInTheDocument();
  const caption = screen.getByText(/front view of/i);
  expect(caption).toBeInTheDocument();
  expect(caption.tagName).toBe("FIGCAPTION");
});
