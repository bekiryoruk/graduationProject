import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../pages/Main';
import CreateItem from '../pages/Main/CreateItem';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="CreateItem" component={CreateItem} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
