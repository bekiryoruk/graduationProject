import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import {storeItem, getItem} from '../../../helpers';
import styles from './CreateItem.styles';

const CreateItem = ({route, navigation}) => {
  const {componentName, name, param, index} = route.params;
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');
  const isFocused = useIsFocused();

  const storeNewItem = async () => {
    if (
      (firstItem && firstItem.length === 0) ||
      (secondItem && secondItem.length === 0) ||
      !firstItem ||
      !secondItem
    ) {
      Alert.alert('Please enter valid input!');
      return;
    }
    let items = await getItem(componentName);
    if (index != undefined && index >= 0) {
      items[index] = {
        name: firstItem,
        param: secondItem,
      };
      storeItem(items, componentName).then(() =>
        navigation.navigate('DisplayItems', {componentName: componentName}),
      );
      return;
    }
    if (items) {
      const newItems = [...items, {name: firstItem, param: secondItem}];
      storeItem(newItems, componentName).then(() =>
        navigation.navigate('DisplayItems', {componentName: componentName}),
      );
    } else {
      const newItems = [{name: firstItem, param: secondItem}];
      storeItem(newItems, componentName).then(() =>
        navigation.navigate('DisplayItems', {componentName: componentName}),
      );
    }
  };

  useEffect(() => {
    if (isFocused) {
      setFirstItem(name);
      setSecondItem(param);
    }
  }, [isFocused]);

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
