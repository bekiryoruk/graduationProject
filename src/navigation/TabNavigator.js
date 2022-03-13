import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import CameraScreen from '../pages/CameraScreen';
import Information from '../pages/Information';
import Calibration from '../pages/Calibration';
import IconButton from './IconButton';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: false,
        style: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#ffffff',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Main}
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
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              text={'Camera'}
              src={require('../assets/navigation/camera.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calibration"
        component={Calibration}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              text={'Calibration'}
              src={require('../assets/navigation/calibrationn.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
