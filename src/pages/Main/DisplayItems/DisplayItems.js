import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {storeItem} from '../../../helpers/storage';

import {getItem} from '../../../helpers';
import styles from './DisplayItems.styles';

const DisplayItems = ({route, navigation}) => {
  const {componentName} = route.params;
  const [data, setData] = useState();
  const [disabledType, setDisabledType] = useState();

  const setUserInfo = type => {
    type === 'PhysicalDisable'
      ? setDisabledType('PhysicalDisable')
      : type === 'VoiceDisable'
      ? setDisabledType('VoiceDisable')
      : setDisabledType('VisionDisable');
    storeItem(type, 'userType');
  };

  useEffect(() => {
    (async () => {
      if (!data) {
        const returnData = await getItem(componentName);
        setData(returnData);
      }
      if (!disabledType) {
        const userDisabledType = await getItem('userType');
        console.log(userDisabledType);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome
            style={styles.icon}
            name={'angle-left'}
            color={'#000000'}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>
          {componentName !== 'Disabled'
            ? componentName + ' settings'
            : componentName + ' type'}{' '}
        </Text>
      </View>
      <ScrollView style={styles.scroll}>
        {componentName !== 'Disabled' ? (
          <View style={styles.wholeContent}>
            {data &&
              data.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.itemCardTitle}>
                      {componentName} {index + 1}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CreateItem', {
                          componentName: componentName,
                          name: item.name,
                          param: item.param,
                          index: index,
                        })
                      }>
                      <View style={styles.itemCard}>
                        <View style={styles.itemCardTextContainer}>
                          <Text style={styles.itemCardText}>{item.name}</Text>
                        </View>
                        <View style={styles.itemCardTextContainer}>
                          <Text style={styles.itemCardText}>{item.param}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            <TouchableOpacity
              style={styles.insertButton}
              onPress={() =>
                navigation.navigate('CreateItem', {
                  componentName: componentName,
                  name: '',
                  param: '',
                  index: -1,
                })
              }>
              <View style={styles.insertButtonContent}>
                <FontAwesome
                  style={styles.insertButtonIcon}
                  name={'plus'}
                  color={'#000000'}
                  size={16}
                />
                <Text style={styles.buttonText}> INSERT NEW </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.optionList}>
            <TouchableOpacity
              style={
                disabledType === 'PhysicalDisable'
                  ? styles.clickedOptionButton
                  : styles.optionButton
              }
              onPress={() => setUserInfo('PhysicalDisable')}>
              <Text
                style={
                  disabledType === 'PhysicalDisable'
                    ? styles.clickedButtonText
                    : styles.buttonText
                }>
                Physical Disability
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                disabledType === 'VoiceDisable'
                  ? styles.clickedOptionButton
                  : styles.optionButton
              }
              onPress={() => setUserInfo('VoiceDisable')}>
              <Text
                style={
                  disabledType === 'VoiceDisable'
                    ? styles.clickedButtonText
                    : styles.buttonText
                }>
                Hard of Hearing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                disabledType === 'VisionDisable'
                  ? styles.clickedOptionButton
                  : styles.optionButton
              }
              onPress={() => setUserInfo('VisionDisable')}>
              <Text
                style={
                  disabledType === 'VisionDisable'
                    ? styles.clickedButtonText
                    : styles.buttonText
                }>
                Vision Impairment
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayItems;
