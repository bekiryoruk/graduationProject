import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
