import React, {useState} from 'react';
import {SafeAreaView, Text, Button, Alert} from 'react-native';
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
  };

  return (
    <SafeAreaView>
      <Text style={styles.sectionTitle}>Create {componentName}</Text>
      <CustomTextInput
        onChange={e => setFirstItem(e)}
        value={firstItem}
        placeholder={'Name'}
      />
      <CustomTextInput
        onChange={e => setSecondItem(e)}
        value={secondItem}
        placeholder={
          componentName === 'contacts' ? 'Number' : componentName + ' Link'
        }
        keyboardType={componentName === 'contacts' ? 'numeric' : 'url'}
      />
      <Button onPress={storeNewItem} title="Save" />
    </SafeAreaView>
  );
};

export default CreateItem;
