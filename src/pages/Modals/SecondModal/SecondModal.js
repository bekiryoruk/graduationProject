import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {CustomTextInput} from '../../../components';

const SecondModal = ({navigation}) => {
  const [firstItem, setFirstItem] = useState('');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Start" />
      <CustomTextInput
        onChange={e => setFirstItem(e)}
        value={firstItem}
        placeholder={'Name'}
      />
    </View>
  );
};

export default SecondModal;
