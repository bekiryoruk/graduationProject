import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

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
      <Text style={styles.sectionTitle}>{componentName} settings</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.wholeContent}>
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
                    <View style={styles.itemCardTextContainer}>
                      <Text style={styles.itemCardText}>{item.name}</Text>
                    </View>
                    <View style={styles.itemCardTextContainer}>
                      <Text style={styles.itemCardText}>{item.param}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          <TouchableOpacity
            style={styles.savebutton}
            onPress={() =>
              navigation.navigate('CreateItem', {
                componentName: componentName,
                name: '',
                param: '',
              })
            }>
            <Text style={styles.buttonText}> INSERT NEW </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayItems;
