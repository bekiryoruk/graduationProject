import React, {useState} from 'react';
import {SafeAreaView, Text, Button, Alert} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import {storeItem, getItem} from '../../../helpers';

import styles from './CreateItem.styles';


const CreateItem = () => {
  const [type, setType] = useState('');
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');

  const storeNewItem = () => {
    if (firstItem.length === 0 || secondItem.length === 0) {
      Alert.alert('Please enter valid input!');
      return;
    }
    getItem(type).then(items => {
      if (items) {
        const newItems = [...items, {name: firstItem, param: secondItem}];
        storeItem(newItems, type);
        console.log(newItems);
      } else {
        const newItems = [{name: firstItem, param: secondItem}];
        storeItem(newItems, type);
        console.log(newItems);
      }
    });
  };

  return (
    <SafeAreaView>
      <Text style={styles.sectionTitle}>Create Item</Text>
      <CustomTextInput
        onChange={e => setFirstItem(e)}
        value={firstItem}
        placeholder={'Name'}
      />
      <CustomTextInput
        onChange={e => setSecondItem(e)}
        value={secondItem}
        placeholder={type === 'contacts' ? 'Number' : type + ' Link'}
        keyboardType={type === 'contacts' ? 'numeric' : 'url'}
      />
      <Button onPress={storeNewItem} title="Save" />
    </SafeAreaView>
  );
};

export default CreateItem;
