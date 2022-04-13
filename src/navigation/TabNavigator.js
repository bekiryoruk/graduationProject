import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CameraScreen from '../pages/CameraScreen';
import IconButton from './IconButton';
import {
  Welcome,
  SecondModal,
  ThirdModal,
  FourthModal,
  FifthModal,
} from '../pages/Modals';

import {CreateItem, DisplayItems, Main} from '../pages/Main';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#ffffff',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              text={'Home'}
              src={require('../assets/navigation/home.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              text={'Settings'}
              src={require('../assets/navigation/setting.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreateItem"
        component={CreateItem}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="DisplayItems"
        component={DisplayItems}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="WelcomeModal"
        component={Welcome}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="SecondModal"
        component={SecondModal}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="ThirdModal"
        component={ThirdModal}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="FourthModal"
        component={FourthModal}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="FifthModal"
        component={FifthModal}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
