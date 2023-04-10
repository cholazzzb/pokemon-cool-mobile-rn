import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FunctionComponent } from 'react';
import { SafeAreaView } from 'react-native';
import { Paragraph, YStack } from 'tamagui';

const FavouritePokemonsScreen: FunctionComponent<
  NativeStackScreenProps<TabNavigatorParams, 'favourite-pokemons'>
> = () => {
  return (
    <SafeAreaView>
      <YStack backgroundColor={'black'} height="100%">
        <YStack
          width="100%"
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="white">
          <Paragraph>Coming soon!</Paragraph>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default FavouritePokemonsScreen;
