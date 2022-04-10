import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, Alert, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import {storeItem, getItem} from '../../../helpers';
import styles from './CreateItem.styles';

const CreateItem = ({route, navigation}) => {
  const {componentName, name, param} = route.params;
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('');
  const isFocused = useIsFocused();

  const storeNewItem = () => {
    if (firstItem.length === 0 || secondItem.length === 0) {
      Alert.alert('Please enter valid input!');
      return;
    }
    getItem(componentName).then(items => {
      if (items) {
        const newItems = [...items, {name: firstItem, param: secondItem}];
        storeItem(newItems, componentName);
      } else {
        const newItems = [{name: firstItem, param: secondItem}];
        storeItem(newItems, componentName);
      }
    });
    navigation.navigate('DisplayItems', {componentName: componentName});
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
