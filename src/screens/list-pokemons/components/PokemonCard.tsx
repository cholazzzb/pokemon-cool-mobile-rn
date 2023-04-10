import { ComponentProps, FunctionComponent } from 'react';
import { Card, H2, Image, XStack } from 'tamagui';

import BadgeType from '~components/BadgeType';
import { Pokemon } from '~domains/pokemon/entity';
import { getPrimaryColorFromType } from '~utils/color';

type PokemonCardProps = {
  pokemon: Pokemon;
  onPress: () => void;
} & ComponentProps<typeof Card>;
const PokemonCard: FunctionComponent<PokemonCardProps> = ({
  pokemon,
  onPress,
  ...props
}) => {
  const primaryType = pokemon.types[0] ?? 'normal';
  const primaryColor = getPrimaryColorFromType(primaryType);
  return (
    <Card
      elevate
      backgroundColor={primaryColor}
      size="$4"
      marginBottom={20}
      height={200}
      bordered
      onPress={onPress}
      {...props}>
      <Card.Header padded>
        <H2 color="white" textTransform="capitalize">
          #{pokemon.id} {pokemon.name}
        </H2>
        <XStack height={80} marginTop={10}>
          {pokemon.types.map((type) => (
            <BadgeType key={`${pokemon.name}-${type}`} type={type} />
          ))}
        </XStack>
      </Card.Header>
      <Image
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 75,
        }}
        width={150}
        height={150}
        resizeMode="contain"
        alignSelf="flex-end"
        src={pokemon.imageUrl}
        marginRight={10}
        marginBottom={10}
      />
    </Card>
  );
};

export default PokemonCard;
