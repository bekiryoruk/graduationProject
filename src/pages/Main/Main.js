import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import styles from './Main.styles';

const Main = () => {

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.sectionTitle}>Main page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
