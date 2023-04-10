import { FlashList } from '@shopify/flash-list';
import { Flame, Focus } from '@tamagui/lucide-icons';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import { ListItem, Paragraph, XStack, YStack } from 'tamagui';

import BadgeType from '~components/BadgeType';
import { PokemonType } from '~domains/pokemon-type/entity';
import { useGetPokemonTypes } from '~domains/pokemon-type/hook';
import { UseGetPokemonDetailByIdData } from '~domains/pokemon/hook';
import { getPrimaryColorFromType } from '~utils/color';
import { snakeCaseToTitleCase } from '~utils/string';

type MovesTabProps = {
  moves: UseGetPokemonDetailByIdData['moves'];
};

type Move = UseGetPokemonDetailByIdData['moves'] extends (infer U)[]
  ? U
  : never;

const MovesTab: FunctionComponent<MovesTabProps> = (props) => {
  const pokemonTypesQuery = useGetPokemonTypes({ enable: false });

  const renderItem = ({ item: move }: { item: Move }) => {
    const typeId = move.id - 1;
    const moveType = (pokemonTypesQuery.data?.types[typeId]?.type?.name ??
      'normal') as PokemonType;

    return (
      <ListItem backgroundColor="white">
        <XStack alignItems="center">
          {pokemonTypesQuery.isFetched && (
            <XStack
              marginRight={20}
              backgroundColor={getPrimaryColorFromType(moveType)}>
              <BadgeType type={moveType} />
            </XStack>
          )}
          <YStack justifyContent="flex-start">
            <Paragraph>{snakeCaseToTitleCase(move.name)}</Paragraph>
            <Paragraph>PP: {move.pp}</Paragraph>
          </YStack>
        </XStack>
        <XStack>
          <Badge>
            <Flame />
            <Paragraph marginLeft={10}>{move.power}</Paragraph>
          </Badge>
          <Badge>
            <Focus />
            <Paragraph marginLeft={10}>
              {move.accuracy === 0 ? '-' : move.accuracy}
            </Paragraph>
          </Badge>
        </XStack>
      </ListItem>
    );
  };
  const MemoizedItem = useMemo(() => renderItem, []);

  return (
    <FlashList
      data={props.moves}
      estimatedItemSize={20}
      keyExtractor={(move, idx) => `move-${move.name}-${idx}`}
      renderItem={MemoizedItem}
    />
  );
};

export default MovesTab;

const Badge: FunctionComponent<PropsWithChildren> = (props) => (
  <XStack
    backgroundColor="white"
    borderRadius={10}
    height={40}
    minWidth={60}
    alignItems="center"
    justifyContent="center"
    marginRight={10}>
    {props.children}
  </XStack>
);
