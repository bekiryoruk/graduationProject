import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {CustomTextInput} from '../../../components';
import {getItem} from '../../../helpers';
import styles from './ThirdModal.styles';
const ThirdModal = ({navigation}) => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const goToNextStep = type => {
    navigation.navigate('FourthModal');
  };

  const goToBackStep = type => {
    navigation.navigate('SecondModal');
  };

  useEffect(() => {
    const userType = getItem('userType').then(data => {
      console.log(data);
    });
  }, []);

  /*return (
  <Button onPress={() => navigation.navigate('Home')} title="Start" />
  );*/
  return (
    <View style={styles.container}>
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
          placeholder={'Enter your contact name'}
        />
      </View>
      <Image
        style={styles.circles}
        source={require('../assets/third-circle.png')}
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

export default ThirdModal;
