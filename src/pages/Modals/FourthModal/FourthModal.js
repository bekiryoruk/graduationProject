import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {CustomTextInput} from '../../../components';
import {getItem} from '../../../helpers';
import styles from './FourthModal.styles';
const FourthModal = ({navigation}) => {
  const [videoName, setVideoName] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const goToNextStep = type => {
    navigation.navigate('FifthModal');
  };

  const goToBackStep = type => {
    navigation.navigate('ThirdModal');
  };

  useEffect(() => {
    const userType = getItem('userType').then(data => {});
  }, []);

  return (
    <View style={styles.container}>
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
      <Image
        style={styles.circles}
        source={require('../assets/fourth-circle.png')}
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

export default FourthModal;
