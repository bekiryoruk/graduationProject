import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import { storeItem, getItem } from '../../../helpers';

import styles from './CreateItem.styles';

const CreateItem = ({ route }) => {
  const {componentName} = route.params;
  const [firstItem, setFirstItem] = useState("");
  const [secondItem, setSecondItem] = useState("");

  const storeNewItem = () => {
    getItem(componentName).then((items) => {
      if(items) {
        const newItems = [...items, {name: firstItem, param: secondItem}];
        storeItem(newItems, componentName);
        console.log(newItems);
      } else {
        const newItems = [{name: firstItem, param: secondItem}];
        storeItem(newItems, componentName);
        console.log(newItems);
      }
    });
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
       <View>
          <Text style={styles.sectionTitle}>Create {componentName}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstItem}
            value={firstItem}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSecondItem}
            value={secondItem}
            placeholder={componentName === 'contacts' ? 'Number' : componentName + " Link"}
            keyboardType={componentName === 'contacts' ? 'numeric' : 'url'}
          />
          <Button
            onPress={() => storeNewItem()}
            title="Save"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateItem;
