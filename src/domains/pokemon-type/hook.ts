import { useQuery } from '@tanstack/react-query';

import { getListPokemonTypes } from './service.gql';

export type UseGetPokemonTypesRes = Awaited<
  ReturnType<typeof getListPokemonTypes>
>;

export const useGetPokemonTypes = (config?: { enable: boolean }) => {
  return useQuery({
    queryKey: ['pokemon-type'],
    queryFn: getListPokemonTypes,
    select: (data) => ({ types: data.types }),
    ...config,
  });
};
