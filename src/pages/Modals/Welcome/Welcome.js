import React from 'react';
import {View, Text, Image, Button} from 'react-native';

import styles from './Welcome.styles';

const Welcome = ({navigation}) => {
  const goToNextStep = type => {
    navigation.navigate('SecondModal');
  };

  const skipForNow = type => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.skipForNow} onPress={() => skipForNow()}>
        <Text style={styles.skipForNowText} onPress={() => skipForNow()}>
          SKIP
        </Text>
      </View>
      <Image style={styles.image} source={require('../assets/welcome.png')} />
      <Text style={styles.title}>Welcome to the Touchless</Text>
      <Text style={styles.sectionTitle}>
        Quickly complete the onboarding steps to start using the Touchless.
      </Text>
      <Image
        style={styles.circles}
        source={require('../assets/first-circle.png')}
      />
      <View style={styles.nextButton}>
        <Button
          color={'black'}
          onPress={() => goToNextStep()}
          title={'START'}
        />
      </View>
    </View>
  );
};

export default Welcome;
