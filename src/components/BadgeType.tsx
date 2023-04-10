import { Paragraph, XStack } from 'tamagui';

import { PokemonType } from '~domains/pokemon-type/entity';

type BadgeTypeProps = {
  type: PokemonType;
};
const BadgeType = (props: BadgeTypeProps) => {
  return (
    <XStack
      backgroundColor="rgba(255,255,255,0.3)"
      paddingHorizontal={8}
      minWidth={50}
      height={30}
      borderRadius={50}
      justifyContent="center">
      <Paragraph fontSize={12} color="white" textTransform="capitalize">
        {props.type}
      </Paragraph>
    </XStack>
  );
};

export default BadgeType;
