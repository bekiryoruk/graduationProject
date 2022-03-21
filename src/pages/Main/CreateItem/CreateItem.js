import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import {storeItem, getItem} from '../../../helpers';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './CreateItem.styles';

const CreateItem = ({callBack, reload}) => {
  const [type, setType] = useState('');
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');
  const types = ['Contact', 'Youtube', 'Spotify'];

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}> INSERT NEW INFORMATION</Text>
      <SelectDropdown
        data={types}
        buttonStyle={styles.picker}
        defaultButtonText={'Select type of information'}
        buttonTextStyle={styles.pickertext}
        dropdownIconPosition={'right'}
        renderDropdownIcon={item => {
          return <FontAwesome name={'chevron-down'} color={'#fff'} size={24} />;
        }}
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
        placeholder={type === 'Contact' ? 'Number' : type + ' Link'}
        keyboardType={type === 'Contact' ? 'numeric' : 'url'}
      />
      <TouchableOpacity style={styles.savebutton} onPress={storeNewItem}>
        <Text style={styles.text}> SAVE </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateItem;
