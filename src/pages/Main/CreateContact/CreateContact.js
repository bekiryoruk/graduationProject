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
import { getContact, storeContact } from '../../../helpers';

import styles from './CreateContact.styles';

const CreateContact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const storeNewContact = () => {
    getContact().then((contacts) => {
      if(contacts) {
        const newContacts = [...contacts, {name: name, number: number}];
        storeContact(newContacts);
        console.log(newContacts);
      } else {
        const newContacts = [{name: name, number: number}];
        storeContact(newContacts);
        console.log(newContacts);
      }
    });
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.sectionTitle}>Create</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setNumber}
            value={number}
            placeholder="Number"
            keyboardType='numeric'
          />
        </View>
        <View>
          <Button
            onPress={() => storeNewContact()}
            title="Save"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateContact;
