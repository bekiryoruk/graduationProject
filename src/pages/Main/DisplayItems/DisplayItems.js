import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {getItem} from '../../../helpers';
import {useIsFocused} from '@react-navigation/native';

import styles from './DisplayItems.styles';

const DisplayItems = ({route, navigation}) => {
  const {componentName} = route.params;
  const [data, setData] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    setData(null);
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (!data) {
        getItem(componentName).then(res => {
          setData(res);
        });
      }
    }
  }, [data, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>{componentName} settings</Text>
      <ScrollView style={styles.scroll}>
        <View>
          {data &&
            data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('CreateItem', {
                      componentName: componentName,
                      name: item.name,
                      param: item.param,
                    })
                  }>
                  <View style={styles.itemCard}>
                    <Text style={styles.itemCardTitle}>
                      {componentName} {index + 1}
                    </Text>
                    <Text>{item.name}</Text>
                    <Text>{item.param}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
        <TouchableOpacity
          style={styles.savebutton}
          onPress={() =>
            navigation.navigate('CreateItem', {componentName: componentName})
          }>
          <Text style={styles.buttonText}> INSERT NEW </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayItems;