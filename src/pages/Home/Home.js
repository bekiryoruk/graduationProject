import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import {getItem} from '../../helpers';

const Home = ({navigation}) => {
  useEffect(() => {
    getItem('userType').then(data => {
      if (!data) {
        navigation.navigate('WelcomeModal');
      } else {
        if (data === 'VisionDisable') {
          navigation.navigate('VoiceDisable');
        } else {
          navigation.navigate('VisionDisable');
        }
      }
    });
  }, []);

  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};

export default Home;
