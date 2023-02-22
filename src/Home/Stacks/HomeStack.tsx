import React from 'react';

import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import PokemonDetailsScreen from '../Screens/PokemonDetailsScreen';
import {HomeStackParamList} from '../Types/HomeStackParamList';

const HomeStack = createStackNavigator<HomeStackParamList>();
const screenOptions = {
  headerShown: true,
};

const HomeStackStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Pokemons">
      <HomeStack.Screen name="Pokemons" component={HomeScreen} />
      <HomeStack.Screen
        name="PokemonDetailsScreen"
        component={PokemonDetailsScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackStack;
