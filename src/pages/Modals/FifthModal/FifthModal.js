import React, {useState, useEffect} from 'react';
import {View, Text, Button, Keyboard, Image, Alert} from 'react-native';

import {CustomTextInput} from '../../../components';
import {storeItem} from '../../../helpers';

import styles from './FifthModal.styles';

const FifthModal = ({navigation}) => {
  const [musicName, setMusicName] = useState('');
  const [musicLink, setMusicLink] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const storeNewItem = async () => {
    if (
      (musicName && musicName.length === 0) ||
      (musicLink && musicLink.length === 0) ||
      !musicName ||
      !musicLink
    ) {
      Alert.alert('Please enter valid input!');
      return false;
    } else {
      const newItems = [{name: musicName, param: musicLink}];
      storeItem(newItems, 'Music');
      return true;
    }
  };

  const goToNextStep = () => {
    storeNewItem().then(res => {
      res && navigation.navigate('Settings');
    });
  };

  const skipForNow = () => {
    navigation.navigate('Settings');
  };

  const goToBackStep = () => {
    navigation.navigate('FourthModal');
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
      <Image source={require('../assets/music.png')} />
      <Text style={styles.title}>Insert your spotify music link</Text>
      <View style={styles.inputs}>
        <CustomTextInput
          onChange={e => setMusicName(e)}
          value={musicName}
          placeholder={'Enter your music name'}
        />
        <CustomTextInput
          onChange={e => setMusicLink(e)}
          value={musicLink}
          placeholder={'Enter your music link'}
        />
      </View>
      {!isKeyboardVisible ? (
        <Image
          style={styles.circles}
          source={require('../assets/fifth-circle.png')}
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
              title={'START'}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default FifthModal;
