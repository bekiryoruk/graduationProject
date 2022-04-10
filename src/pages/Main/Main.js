import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Main.styles';
import {getItem} from '../../helpers';

const Main = ({navigation}) => {
  useEffect(() => {
    getItem('userType').then(data => {
      if (!data) {
        navigation.navigate('WelcomeModal');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10}}></View>
        <ScrollView>
          <Text style={styles.titleText}>Settings</Text>
          <View style={styles.itemBlocks}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateItem', {componentName: 'Contact'})
              }>
              <View style={styles.item}>
                <FontAwesome
                  style={styles.icon}
                  name={'address-book'}
                  color={'#000000'}
                  size={30}
                />
                <Text style={styles.headerText}>{'Contacts'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateItem', {componentName: 'Video'})
              }>
              <View style={styles.item}>
                <FontAwesome
                  style={styles.icon}
                  name={'play'}
                  color={'#000000'}
                  size={30}
                />
                <Text style={styles.headerText}>{'Videos'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateItem', {componentName: 'Music'})
              }>
              <View style={styles.item}>
                <FontAwesome
                  style={styles.icon}
                  name={'music'}
                  color={'#000000'}
                  size={30}
                />
                <Text style={styles.headerText}>{'Musics'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Main;
