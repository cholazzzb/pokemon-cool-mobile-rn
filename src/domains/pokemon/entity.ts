import { PokemonType } from '~domains/pokemon-type/entity';

export type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<PokemonType>;
};
