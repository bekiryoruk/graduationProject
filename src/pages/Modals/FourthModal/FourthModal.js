import React, {useState, useEffect} from 'react';
import {View, Text, Button, Keyboard, Image} from 'react-native';
import {CustomTextInput} from '../../../components';
import {getItem} from '../../../helpers';
import styles from './FourthModal.styles';
const FourthModal = ({navigation}) => {
  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const goToNextStep = type => {
    navigation.navigate('FifthModal');
  };

  const skipForNow = type => {
    navigation.navigate('Settings');
  };

  const goToBackStep = type => {
    navigation.navigate('ThirdModal');
  };

  useEffect(() => {
    const userType = getItem('userType').then(data => {});
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
