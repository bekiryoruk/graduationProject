import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {CustomTextInput} from '../../../components';
import {getItem} from '../../../helpers';
import styles from './FifthModal.styles';
const FifthModal = ({navigation}) => {
  const [musicName, setMusicName] = useState('');
  const [musicLink, setMusicLink] = useState('');

  const goToNextStep = type => {
    navigation.navigate('Settings');
  };

  const goToBackStep = type => {
    navigation.navigate('FourthModal');
  };

  useEffect(() => {
    const userType = getItem('userType').then(data => {});
  }, []);

  return (
    <View style={styles.container}>
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
      <Image
        style={styles.circles}
        source={require('../assets/fifth-circle.png')}
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
            title={'START'}
          />
        </View>
      </View>
    </View>
  );
};

export default FifthModal;
