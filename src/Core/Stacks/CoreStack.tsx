import {
  createNativeStackNavigator as createStackNavigator,
  NativeStackNavigationOptions as StackNavigationOptions,
} from '@react-navigation/native-stack';

import React, {Fragment} from 'react';
import HomeStackStack from '../../Home/Stacks/HomeStack';
import {useAppSelector} from '../Redux/store';
import {CoreStackParamList} from '../Types/CoreStackParamList';

const Core = createStackNavigator<CoreStackParamList>();
const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const CoreStack = () => {
  const lolo = useAppSelector(state => state.global);

  return (
    <Fragment>
      <Core.Navigator screenOptions={screenOptions}>
        <Core.Screen name="HomeStack" component={HomeStackStack} />
      </Core.Navigator>
    </Fragment>
  );
};

export default CoreStack;
