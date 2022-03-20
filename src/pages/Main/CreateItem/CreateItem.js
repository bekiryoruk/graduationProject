import React, {useState} from 'react';
import {SafeAreaView, Text, Button, Alert} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import {storeItem, getItem} from '../../../helpers';
import SelectDropdown from 'react-native-select-dropdown';

import styles from './CreateItem.styles';

const CreateItem = ({callBack, reload}) => {
  const [type, setType] = useState('');
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');
  const types = ['contacts', 'youtube', 'spotify'];

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
    callBack(reload + 1);
  };

  return (
    <SafeAreaView>
      <Text style={styles.sectionTitle}>Create Item</Text>
      <SelectDropdown
        data={types}
        onSelect={selectedItem => {
          setType(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
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
