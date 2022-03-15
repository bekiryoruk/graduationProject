import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigation, TabNavigator} from './src/navigation';

const App = () => {
  return (
    <NavigationContainer ref={navigation}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
