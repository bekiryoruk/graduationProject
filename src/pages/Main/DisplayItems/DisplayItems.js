import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {getItem} from '../../../helpers';
import styles from './DisplayItems.styles';

const DisplayItems = ({route, navigation}) => {
  const {componentName} = route.params;
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      if (!data) {
        const returnData = await getItem(componentName);
        setData(returnData);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            style={styles.icon}
            name={'angle-left'}
            color={'#000000'}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>{componentName} settings</Text>
      </View>
      <ScrollView style={styles.scroll}>
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
              })
            }>
            <View style={styles.insertButtonContent}>
              <FontAwesome
                style={styles.insertButtonIcon}
                name={'plus'}
                color={'#000000'}
                size={24}
              />
              <Text style={styles.buttonText}> INSERT NEW </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayItems;
