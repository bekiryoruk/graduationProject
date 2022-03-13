import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './Main.styles';

const Main = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.sectionTitle}>Main page</Text>
          <Button
            onPress={() => navigation.navigate('CreateContact', {})}
            title="Create"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

