import request from 'graphql-request';

import { graphql } from '~__generated__/graphql';
import { API_URL } from '~constants/url';

const getListPokemonTypeQuery = graphql(`
  query GetListPokemonTypes {
    types: pokemon_v2_pokemontype(
      order_by: { type_id: asc }
      distinct_on: type_id
    ) {
      type: pokemon_v2_type {
        id
        name
      }
    }
  }
`);

export const getListPokemonTypes = () =>
  request(API_URL, getListPokemonTypeQuery);
