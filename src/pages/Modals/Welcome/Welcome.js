import React from 'react';
import {View, Text, Button} from 'react-native';
import {storeItem} from '../../../helpers/storage';

const Welcome = ({navigation}) => {
  const setUserInfo = type => {
    storeItem(type, 'userType');
    navigation.navigate('SecondModal');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Neden kullanmak istiyorsunuz</Text>
      <View>
        <Button onPress={() => setUserInfo('Göz')} title="Göz" />
        <Button onPress={() => setUserInfo('Ses')} title="Ses" />
      </View>
    </View>
  );
};

export default Welcome;
