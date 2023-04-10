import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Map, Pocket } from '@tamagui/lucide-icons';
import { FunctionComponent } from 'react';

import FavouritePokemonsScreen from '~/screens/favourite-pokemons/screen';
import ListPokemonScreen from '~/screens/list-pokemons/screen';
import PokemonDetailScreen from '~/screens/pokemon-detail/screen';

const PokemonStack = createNativeStackNavigator<StackNavigatorParams>();
export const PokemonStackNavigation: FunctionComponent = () => {
  return (
    <PokemonStack.Navigator>
      <PokemonStack.Screen
        options={{
          title: 'List Pokemons',
        }}
        name="list-pokemons"
        component={ListPokemonScreen}
      />
      <PokemonStack.Screen
        options={{
          title: 'Pokemon Detail',
        }}
        name="pokemon-detail"
        component={PokemonDetailScreen}
      />
    </PokemonStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();
export const TabNavigation: FunctionComponent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: 'List Pokemons',
          headerShown: false,
          tabBarIcon(props) {
            const iconProps = createIconProps(props.focused);
            return <Map {...iconProps} />;
          },
        }}
        name="home"
        component={PokemonStackNavigation}
      />
      <Tab.Screen
        options={{
          title: 'Favourite Pokemons',
          tabBarIcon(props) {
            const iconProps = createIconProps(props.focused);
            return <Pocket {...iconProps} />;
          },
        }}
        name="favourite-pokemons"
        component={FavouritePokemonsScreen}
      />
    </Tab.Navigator>
  );
};

const createIconProps = (isFocused: boolean) => {
  switch (isFocused) {
    case true:
      return { color: 'green', size: 30 };
    case false:
      return { color: 'black' };
  }
};
