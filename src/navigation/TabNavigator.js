import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {getItem} from '../helpers';
import IconButton from './IconButton';

import {
  Welcome,
  SecondModal,
  ThirdModal,
  FourthModal,
  FifthModal,
} from '../pages/Modals';

import {CreateItem, DisplayItems, Settings} from '../pages/Settings';
import {
  Home,
  VoiceDisable,
  PhysicalDisable,
  VisionDisable,
} from '../pages/Home';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      if (!data) {
        const returnData = await getItem('userType');
        setData(returnData);
      }
    })();
  }, []);

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
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
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
        name="Settings"
        component={Settings}
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
          tabBarVisible: true, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="DisplayItems"
        component={DisplayItems}
        options={{
          tabBarButton: () => null,
          tabBarVisible: true, //hide tab bar on this screen
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
      <Tab.Screen
        name="PhysicalDisable"
        component={PhysicalDisable}
        options={{
          tabBarButton: () => null,
          tabBarVisible: true, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="VoiceDisable"
        component={VoiceDisable}
        options={{
          tabBarButton: () => null,
          tabBarVisible: true, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="VisionDisable"
        component={VisionDisable}
        options={{
          tabBarButton: () => null,
          tabBarVisible: true, //hide tab bar on this screen
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
