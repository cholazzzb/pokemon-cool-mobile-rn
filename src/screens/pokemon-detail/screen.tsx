import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { FunctionComponent, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Image, Paragraph, XStack, YStack } from 'tamagui';

import BadgeType from '~components/BadgeType';
import BottomSheet, { BottomSheetRefProps } from '~components/BottomSheet';
import Skeleton from '~components/Skeleton';
import { getPokemonImageUrl } from '~constants/url';
import { PokemonType } from '~domains/pokemon-type/entity';
import {
  UseGetPokemonDetailByIdData,
  useGetPokemonDetailById,
} from '~domains/pokemon/hook';
import AboutTab from '~screens/pokemon-detail/components/AboutTab';
import MovesTab from '~screens/pokemon-detail/components/MovesTab';
import StatusTab from '~screens/pokemon-detail/components/StatusTab';
import { Tab } from '~screens/pokemon-detail/components/Tab';
import { getPrimaryColorFromType } from '~utils/color';

const BOTTOM_SHEET_HEIGHT = 500;

type Tab = 'About' | 'Status' | 'Moves';
const tabs: Array<Tab> = ['About', 'Status', 'Moves'];
const PokemonDetailScreen: FunctionComponent<
  NativeStackScreenProps<StackNavigatorParams, 'pokemon-detail'>
> = () => {
  const pokemonId =
    useRoute<RouteProp<StackNavigatorParams, 'pokemon-detail'>>().params
      .pokemonId;
  const navigation = useNavigation<NavigationProp<StackNavigatorParams>>();
  const onPressPrevPokemon = () => {
    pokemonId - 1 >= 0 &&
      navigation.navigate('pokemon-detail', { pokemonId: pokemonId - 1 });
  };

  const onPressNextPokemon = () => {
    navigation.navigate('pokemon-detail', { pokemonId: pokemonId + 1 });
  };

  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const pokemonDetailQuery = useGetPokemonDetailById(pokemonId, {
    onSuccess: () => bottomSheetRef.current?.scrollTo(-BOTTOM_SHEET_HEIGHT / 2),
  });
  const [activeTab, setActiveTab] = useState<Tab>('About');

  const pokemonTypes = pokemonDetailQuery.data?.about.types ?? [];
  const primaryColor = getPrimaryColorFromType(pokemonTypes[0] as PokemonType);

  return (
    <SafeAreaView>
      <YStack height="100%">
        <YStack
          flexGrow={1}
          flexDirection="column"
          backgroundColor={primaryColor}>
          <YStack width="100%">
            <Paragraph
              color="white"
              width="100%"
              textAlign="center"
              fontSize={30}
              paddingVertical={10}
              marginTop={20}
              textTransform="capitalize">
              #{pokemonId} {pokemonDetailQuery.data?.about.name}
            </Paragraph>
            <XStack paddingHorizontal={10}>
              {pokemonDetailQuery.data && (
                <BadgeType
                  type={pokemonDetailQuery.data.about.types[0] as PokemonType}
                />
              )}
            </XStack>
          </YStack>
          <XStack
            width="100%"
            justifyContent="space-between"
            alignItems="center">
            <Button backgroundColor="transparent" onPress={onPressPrevPokemon}>
              <ArrowLeft color="white" />
            </Button>
            <Image
              style={{
                elevation: 10,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 75,
              }}
              width={150}
              height={150}
              resizeMode="contain"
              src={getPokemonImageUrl(pokemonId)}
            />
            <Button backgroundColor="transparent" onPress={onPressNextPokemon}>
              <ArrowRight color="white" />
            </Button>
          </XStack>
        </YStack>

        <BottomSheet
          ref={bottomSheetRef}
          noGesture
          height={BOTTOM_SHEET_HEIGHT}>
          <YStack
            backgroundColor="white"
            flexDirection="column"
            justifyContent="space-between">
            <XStack justifyContent="center">
              {tabs.map((tab) => (
                <Tab
                  key={`tab-${tab}`}
                  color={activeTab === tab ? primaryColor : 'white'}
                  textColor={
                    activeTab === tab && !pokemonDetailQuery.isLoading
                      ? 'white'
                      : 'black'
                  }
                  title={tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </XStack>
            <YStack height="100%">
              {pokemonDetailQuery.isLoading ? (
                <Skeleton width={1000} height={500} />
              ) : pokemonDetailQuery.isError ? (
                <Paragraph>Error</Paragraph>
              ) : (
                renderTab(activeTab, pokemonDetailQuery.data, primaryColor)
              )}
            </YStack>
          </YStack>
        </BottomSheet>
      </YStack>
    </SafeAreaView>
  );
};

export default PokemonDetailScreen;

const renderTab = (
  tab: Tab,
  data: UseGetPokemonDetailByIdData,
  color: string,
) => {
  switch (tab) {
    case 'About':
      return <AboutTab color={color} about={data.about} />;
    case 'Status':
      return <StatusTab color={color} stats={data.status} />;
    case 'Moves':
      return <MovesTab moves={data.moves} />;
  }
};
