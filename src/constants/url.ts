export const API_URL = 'https://beta.pokeapi.co/graphql/v1beta';
export const getPokemonImageUrl = (pokemonId: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;
