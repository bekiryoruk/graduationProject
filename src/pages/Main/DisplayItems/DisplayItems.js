import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {getItem} from '../../../helpers';

import styles from './DisplayItems.styles';

const DisplayItems = ({route, navigation}) => {
  const {componentName} = route.params;
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) {
      getItem(componentName).then(res => {
        setData(res);
      });
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>{componentName} settings</Text>
      <View>
        {data &&
          data.map(item => {
            return (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.param}</Text>
              </View>
            );
          })}
      </View>
      <TouchableOpacity
        style={styles.savebutton}
        onPress={() =>
          navigation.navigate('CreateItem', {componentName: componentName})
        }>
        <Text style={styles.buttonText}> Insert New </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DisplayItems;
