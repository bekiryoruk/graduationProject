import React from 'react';
import {View, Text, Image, Button} from 'react-native';

import styles from './SecondModal.styles';

const SecondModal = ({navigation}) => {
  const goToNextStep = type => {
    navigation.navigate('ThirdModal');
  };

  const goToBackStep = type => {
    navigation.navigate('WelcomeModal');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/disable.png')} />
      <Text style={styles.title}>Select your disabled type</Text>
      <Text style={styles.sectionTitle}>
        Quickly complete the onboarding steps to start using the Touchless.
      </Text>
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
