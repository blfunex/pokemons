import {
  PokemonResponse,
  PokemonSpeciesResponse,
  ResponseReference,
} from "./PokeAPI";

export default interface Pokemon {
  id: string;
  nameId: string;
  name: string;
  sprites: [front: string | null, back: string | null];
  types: string[];
  species: ResponseReference;
}

function capitalize(original: string): string {
  return original[0].toUpperCase() + original.slice(1);
}

export function getPokemonName(original: string) {
  original = capitalize(original);

  // This was overkill

  const match = original.match(/([a-z]+)-([-a-z]+)$/i);

  if (match) {
    const name = match[1];
    const suffix = match[2];
    switch (suffix) {
      // Replacements
      case "f":
      case "female":
        return `Female ${name}`;
      case "m":
      case "male":
        return `Male ${name}`;
      case "jr":
        return `${name} Junior`;
      case "mime":
      case "rime":
        // As second word
        return `${name} ${suffix}`; // Mr mime, Mr rime
      case "red-meteor":
        return `Red meteor ${name}`;
      case "red-striped":
        return `Red striped ${name}`;
      case "single-strike":
        return `Single strike ${name}`;
      case "rapid-strike":
        return `Rapid strike ${name}`;
      case "oh":
      case "o":
      case "fini":
      case "koko":
      case "bulu":
      case "lele":
        // As suffix with a hyphen
        return `${name}-${suffix}`; // Ho-oh
      case "amped-gmax":
        return `Amped gmax ${name}`;
      case "low-key":
        return `Low key ${name}`;
      case "low-key-gmax":
        return `Low key gmax ${name}`;
      case "single-strike-gmax":
        return `Single strike gmax ${name}`;
      case "rapid-strike-gmax":
        return `Rapid strike gmax ${name}`;
      case "normal":
      case "crowned":
      case "totem":
      case "totem-busted":
      case "original":
      case "amped":
      case "ordinary":
      case "average":
      case "standard":
      case "disguised":
      case "altered":
      case "eternal":
      case "primal":
      case "core":
      case "small":
      case "large":
      case "hero":
      case "galar":
      case "mega":
      case "gmax":
      case "super":
      case "eternamax":
        // As prefix adjective
        return `${capitalize(suffix)} ${name}`;
      case "mega-x":
        return `Mega X ${name}`;
      case "mega-y":
        return `Mega Y ${name}`;
      case "incarnate":
        // As postfix adjective
        return `${name} ${suffix}`;
      case "null":
        return "Type: Null";
      default:
        if (name === "Porygon") {
          return name + " " + suffix.toUpperCase();
        } else if (name === "Oricorio") {
          return `${name} (${capitalize(suffix)} style)`;
        } else {
          return `${name} (${capitalize(suffix)} form)`;
        }
    }
  }
  return original;
}

export function getPokemon(response: PokemonResponse): Pokemon {
  const name = response.name;
  return {
    id: response.id,
    nameId: name,
    name: getPokemonName(name),
    species: response.species,
    sprites: [
      response.sprites.front_default,
      response.sprites.back_default,
    ],
    types: response.types
      .sort((a, b) => Math.sign(b.slot - a.slot))
      .map(type => type.type.name),
  };
}

export interface PokemonSpecies {
  generationId: string;
  flavorText: string;
}

export function getPokemonSpecies(
  response: PokemonSpeciesResponse
): PokemonSpecies {
  return {
    generationId: response.generation.name,
    flavorText: (
      response.flavor_text_entries.find(
        entry => entry.language.name === "en"
      )?.flavor_text ?? ""
    )
      .replace(/\n|\f/g, " ")
      .trim(),
  };
}
