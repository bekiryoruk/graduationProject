import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from './SecondModal.styles';
import {storeItem} from '../../../helpers/storage';

const SecondModal = ({navigation}) => {
  const viewRef = useRef();

  const [count, setCount] = useState(0);

  const goToNextStep = type => {
    navigation.navigate('ThirdModal');
  };

  const goToBackStep = type => {
    navigation.navigate('WelcomeModal');
  };

  const setUserInfo = type => {
    type === 'PhysicalDisable'
      ? setCount(1)
      : type === 'VoiceDisable'
      ? setCount(2)
      : setCount(3);
    storeItem(type, 'userType');
  };

  return (
    <View ref={viewRef} style={styles.container}>
      <Image source={require('../assets/disable.png')} />
      <Text style={styles.title}>Select your disabled type</Text>
      <View style={styles.optionList}>
        <TouchableOpacity
          style={count === 1 ? styles.clickedOptionButton : styles.optionButton}
          onPress={() => setUserInfo('PhysicalDisable')}>
          <Text
            style={count === 1 ? styles.clickedButtonText : styles.buttonText}>
            Physical Disability
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={count === 2 ? styles.clickedOptionButton : styles.optionButton}
          onPress={() => setUserInfo('VoiceDisable')}>
          <Text
            style={count === 2 ? styles.clickedButtonText : styles.buttonText}>
            Hard of Hearing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={count === 3 ? styles.clickedOptionButton : styles.optionButton}
          onPress={() => setUserInfo('VisionDisable')}>
          <Text
            style={count === 3 ? styles.clickedButtonText : styles.buttonText}>
            Vision Impairment
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.circles}
        source={require('../assets/second-circle.png')}
      />
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
    </View>
  );
};

export default SecondModal;
