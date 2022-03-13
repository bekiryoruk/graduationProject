import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../pages/Main';
import CreateContact from '../pages/Main/CreateContact';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="CreateContact" component={CreateContact} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
