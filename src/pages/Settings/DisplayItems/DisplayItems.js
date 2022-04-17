import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {getItem, storeItem} from '../../../helpers';
import styles from './DisplayItems.styles';

const DisplayItems = ({route, navigation}) => {
  const {componentName} = route.params;
  const [data, setData] = useState();
  const [disabledType, setDisabledType] = useState();
  const [rerender, setRerender] = useState({});

  const setUserInfo = async type => {
    setDisabledType(type);
    await storeItem(type, 'userType');
  };

  const deleteItem = async index => {
    data.splice(index, 1);
    storeItem(data, componentName).then(() => {
      setData(null); // to fetch data again
      setRerender({});
    });
  };

  useEffect(() => {
    (async () => {
      if (!data) {
        const returnData = await getItem(componentName);
        setData(returnData);
      }
      if (!disabledType) {
        const userDisabledType = await getItem('userType');
        setDisabledType(userDisabledType);
      }
    })();
  }, [rerender]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
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
                    <View style={styles.cardHeader}>
                      <Text style={styles.itemCardTitle}>
                        {componentName} {index + 1}
                      </Text>
                      <TouchableOpacity
                        style={styles.deleteContainer}
                        onPress={() => deleteItem(index)}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                    </View>
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
