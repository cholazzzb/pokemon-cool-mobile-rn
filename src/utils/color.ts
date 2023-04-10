import { PokemonType } from '~domains/pokemon-type/entity';

const primaryColors: Record<PokemonType, string> = {
  normal: '#a8a878',
  fire: '#f36b6c',
  fighting: '#c03528',
  water: '#76bcfc',
  flying: '#a890f0',
  grass: '#56d0b0',
  poison: '#a14ca0',
  electric: '#ffd76f',
  ground: '#e0c068',
  psychic: '#f15687',
  rock: '#b8a038',
  ice: '#98d8d8',
  bug: '#a8b82a',
  dragon: '#776bf8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#e5c7d6',
} as const;

export const getPrimaryColorFromType = (type: PokemonType) => {
  return primaryColors[type];
};
