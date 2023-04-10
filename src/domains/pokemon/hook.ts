import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getPokemonImageUrl } from '~constants/url';
import { PokemonType } from '~domains/pokemon-type/entity';
import {
  getListPokemons,
  getPokemonDetailById,
} from '~domains/pokemon/service.gql';

const initPageParam = {
  page: 0,
  pageSize: 20,
};
export const useGetListPokemons = () => {
  const queryInfo = useInfiniteQuery({
    queryKey: ['list-pokemon'],
    queryFn: async ({ pageParam = initPageParam }) =>
      getListPokemons(pageParam.page, pageParam.pageSize),
  });

  const flattenData = useMemo(
    () =>
      queryInfo.data?.pages.flatMap((page) =>
        page.pokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          imageUrl: getPokemonImageUrl(pokemon.id),
          types: pokemon.types.map(
            (type) => type.type?.name,
          ) as Array<PokemonType>,
        })),
      ),
    [queryInfo.data],
  );
  return { ...queryInfo, flattenData };
};

export type UseGetPokemonDetailByIdData = {
  about: {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Array<string | undefined>;
  };
  status: Array<{
    name: string | undefined;
    value: number;
  }>;
  moves: Array<{
    id: number;
    name: string;
    accuracy: number;
    power: number;
    pp: number;
  }>;
};
export const useGetPokemonDetailById = (
  pokemonId: number,
  config: {
    onSuccess: (data: UseGetPokemonDetailByIdData) => void;
  },
) => {
  return useQuery({
    queryKey: ['pokemon-detail', pokemonId],
    queryFn: () => getPokemonDetailById(pokemonId),
    select: (data): UseGetPokemonDetailByIdData => {
      if (data.pokemons.length === 0) {
        return {
          about: {
            id: pokemonId,
            name: 'not found',
            height: 0,
            weight: 0,
            types: [],
          },
          status: [],
          moves: [],
        };
      }

      const pokemon = data.pokemons[0];
      const types = pokemon.types.map((el) => el.type?.name);
      const status = pokemon.stats.map((el) => ({
        name: el.statType?.name,
        value: el.baseStat,
      }));
      const moves = pokemon.moves.map((el) => ({
        id: el.move?.type_id ?? 1,
        name: el?.move?.name ?? '',
        accuracy: el?.move?.accuracy ?? 0,
        power: el?.move?.power ?? 0,
        pp: el?.move?.pp ?? 0,
      }));
      return {
        about: {
          id: pokemonId,
          name: pokemon.name,
          height: pokemon.height ?? 0,
          weight: pokemon.weight ?? 0,
          types,
        },
        status,
        moves,
      };
    },
    ...config,
  });
};
