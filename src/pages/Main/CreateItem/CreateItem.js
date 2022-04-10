import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert, View} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import {storeItem, getItem} from '../../../helpers';

import styles from './CreateItem.styles';

const CreateItem = ({route}) => {
  const {componentName} = route.params;
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');

  const storeNewItem = () => {
    if (firstItem.length === 0 || secondItem.length === 0) {
      Alert.alert('Please enter valid input!');
      return;
    }
    getItem(componentName).then(items => {
      if (items) {
        const newItems = [...items, {name: firstItem, param: secondItem}];
        storeItem(newItems, componentName);
        console.log(newItems);
      } else {
        const newItems = [{name: firstItem, param: secondItem}];
        storeItem(newItems, componentName);
        console.log(newItems);
      }
    });
    callBack(reload + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>{componentName} Create</Text>
      <View style={styles.inputContainer}>
        <CustomTextInput
          onChange={e => setFirstItem(e)}
          value={firstItem}
          placeholder={'Name'}
        />
        <CustomTextInput
          onChange={e => setSecondItem(e)}
          value={secondItem}
          placeholder={
            componentName === 'Contact' ? 'Number' : componentName + ' Link'
          }
          keyboardType={componentName === 'Contact' && 'numeric'}
        />
        <TouchableOpacity style={styles.savebutton} onPress={storeNewItem}>
          <Text style={styles.text}> SAVE </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateItem;
