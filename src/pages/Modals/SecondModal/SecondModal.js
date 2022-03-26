import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {CustomTextInput} from '../../../components';
import {getItem} from '../../../helpers';

const SecondModal = ({navigation}) => {
  const [firstItem, setFirstItem] = useState('');

  useEffect(() => {
    const userType = getItem('userType').then(data => {
      console.log(data);
    });
  }, []);

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
