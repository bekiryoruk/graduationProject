import React, {useState, useEffect} from 'react';
import {View, Text, Keyboard, Button, Image, Alert} from 'react-native';

import {CustomTextInput} from '../../../components';
import {storeItem} from '../../../helpers';

import styles from './ThirdModal.styles';

const ThirdModal = ({navigation}) => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const storeNewItem = async () => {
    if (
      (contactName && contactName.length === 0) ||
      (contactNumber && contactNumber.length === 0) ||
      !contactName ||
      !contactNumber
    ) {
      Alert.alert('Please enter valid input!');
      return false;
    } else {
      const newItems = [{name: contactName, param: contactNumber}];
      storeItem(newItems, 'Contact');
      return true;
    }
  };

  const goToNextStep = () => {
    storeNewItem().then(res => {
      res && navigation.navigate('FourthModal');
    });
  };

  const skipForNow = () => {
    navigation.navigate('Settings');
  };

  const goToBackStep = () => {
    navigation.navigate('SecondModal');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.skipForNow} onPress={() => skipForNow()}>
        <Text style={styles.skipForNowText} onPress={() => skipForNow()}>
          SKIP
        </Text>
      </View>
      <Image source={require('../assets/contact.png')} />

      <Text style={styles.title}>Insert your first contact person</Text>
      <View style={styles.inputs}>
        <CustomTextInput
          onChange={e => setContactName(e)}
          value={contactName}
          placeholder={'Enter your contact name'}
        />
        <CustomTextInput
          onChange={e => setContactNumber(e)}
          value={contactNumber}
          placeholder={'Enter your contact number'}
        />
      </View>
      {!isKeyboardVisible ? (
        <Image
          style={styles.circles}
          source={require('../assets/third-circle.png')}
        />
      ) : null}
      {!isKeyboardVisible ? (
        <View style={styles.buttons}>
          <View style={styles.nextButton}>
            <Button
              color={'black'}
              onPress={() => goToBackStep()}
              title={'BACK'}
            />
          </View>
          <View style={styles.nextButton}>
            <Button
              color={'black'}
              onPress={() => goToNextStep()}
              title={'NEXT'}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ThirdModal;
