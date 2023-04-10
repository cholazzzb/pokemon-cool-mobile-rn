import request from 'graphql-request';

import { graphql } from '~__generated__/graphql';
import { API_URL } from '~constants/url';

const getListPokemonsQuery = graphql(`
  query GetListPokemons($limit: Int!, $offset: Int!) {
    pokemons: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`);

export const getListPokemons = (page: number, pageSize: number) =>
  request(API_URL, getListPokemonsQuery, {
    limit: pageSize,
    offset: page * pageSize,
  });

const getPokemonDetailByIdQuery = graphql(`
  query GetPokemonDetailById($pokemonId: Int) {
    pokemons: pokemon_v2_pokemon(where: { id: { _eq: $pokemonId } }) {
      id
      name
      weight
      height
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        statType: pokemon_v2_stat {
          name
        }
        baseStat: base_stat
      }
      moves: pokemon_v2_pokemonmoves(distinct_on: move_id) {
        move: pokemon_v2_move {
          accuracy
          name
          power
          pp
          type_id
        }
      }
    }
  }
`);

export const getPokemonDetailById = (pokemonId: number) =>
  request(API_URL, getPokemonDetailByIdQuery, {
    pokemonId,
  });
