import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { FunctionComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Paragraph, YStack } from 'tamagui';

import Skeleton from '~components/Skeleton';
import { useGetPokemonTypes } from '~domains/pokemon-type/hook';
import { useGetListPokemons } from '~domains/pokemon/hook';
import PokemonCard from '~screens/list-pokemons/components/PokemonCard';

const ListPokemonScreen: FunctionComponent<
  NativeStackScreenProps<StackNavigatorParams, 'list-pokemons'>
> = ({ navigation }) => {
  const listPokemonsQuery = useGetListPokemons();

  useGetPokemonTypes();

  return (
    <SafeAreaView>
      <View
        style={StyleSheet.flatten({
          height: '100%',
          width: '100%',
        })}>
        <FlashList
          ListEmptyComponent={() => {
            switch (listPokemonsQuery.status) {
              case 'loading':
                return (
                  <YStack alignItems="center">
                    {Array(10)
                      .fill(null)
                      .map((_, idx) => (
                        <Skeleton
                          key={`skeleton-${idx}`}
                          height={200}
                          width={300}
                          style={{ borderRadius: 20, marginBottom: 10 }}
                        />
                      ))}
                  </YStack>
                );
              case 'error':
                return (
                  <Paragraph>Opps sorry, something wrong happen!</Paragraph>
                );
              default:
                return (
                  <Paragraph>Opps sorry, something wrong happen!</Paragraph>
                );
            }
          }}
          data={listPokemonsQuery.flattenData}
          estimatedItemSize={20}
          keyExtractor={(item) => `${item.id}-${item.name}`}
          renderItem={({ item }) => {
            return (
              <PokemonCard
                marginVertical={10}
                marginHorizontal={30}
                pokemon={item}
                onPress={() => {
                  navigation.navigate('pokemon-detail', {
                    pokemonId: item.id,
                  });
                }}
              />
            );
          }}
          onEndReachedThreshold={2}
          onEndReached={() => {
            const page = (listPokemonsQuery.flattenData?.length ?? 0) / 20;

            if (page > 0) {
              listPokemonsQuery.fetchNextPage({
                pageParam: {
                  page,
                  pageSize: 20,
                },
              });
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListPokemonScreen;
