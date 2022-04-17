import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../pages/Settings';
import CreateItem from '../pages/Settings/CreateItem';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CreateItem" component={CreateItem} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
