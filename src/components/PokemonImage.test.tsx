import { render, screen } from "@testing-library/react";

import PokemonImage from "./PokemonImage";

test("Renders a pokemon image", () => {
  render(<PokemonImage name="Pikachu" sprites={["a.png", "b.png"]} />);
  const caption = screen.getByText(/front view of/i);
  expect(caption).toBeInTheDocument();
  expect(caption.tagName).toBe("FIGCAPTION");
});
