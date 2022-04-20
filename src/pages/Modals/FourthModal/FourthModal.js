import React, {useState, useEffect} from 'react';
import {View, Text, Button, Keyboard, Image, Alert} from 'react-native';

import {CustomTextInput} from '../../../components';
import {storeItem} from '../../../helpers';

import styles from './FourthModal.styles';

const FourthModal = ({navigation}) => {
  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const storeNewItem = async () => {
    if (
      (videoName && videoName.length === 0) ||
      (videoLink && videoLink.length === 0) ||
      !videoName ||
      !videoLink
    ) {
      Alert.alert('Please enter valid input!');
      return false;
    } else {
      const newItems = [{name: videoName, param: videoLink}];
      storeItem(newItems, 'Video');
      return true;
    }
  };

  const goToNextStep = () => {
    storeNewItem().then(res => {
      res && navigation.navigate('FifthModal');
    });
  };

  const skipForNow = () => {
    navigation.navigate('Settings');
  };

  const goToBackStep = () => {
    navigation.navigate('ThirdModal');
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
      <Image source={require('../assets/video.png')} />
      <Text style={styles.title}>Insert your youtube video link</Text>
      <View style={styles.inputs}>
        <CustomTextInput
          onChange={e => setVideoName(e)}
          value={videoName}
          placeholder={'Enter your video name'}
        />
        <CustomTextInput
          onChange={e => setVideoLink(e)}
          value={videoLink}
          placeholder={'Enter your video link'}
        />
      </View>
      {!isKeyboardVisible ? (
        <Image
          style={styles.circles}
          source={require('../assets/fourth-circle.png')}
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

export default FourthModal;
