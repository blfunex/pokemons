export function getGenerationRomanNumeral(generationId: string) {
  return generationId.slice(11).toUpperCase();
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
