import React from 'react';
import {View, Text, Button} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is Welcome Page</Text>
      <Button
        onPress={() => navigation.navigate('SecondModal')}
        title="Second Modal"
      />
    </View>
  );
};

export default Welcome;
