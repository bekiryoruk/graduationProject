import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
  Button,
} from 'react-native';

import {ExpandableComponent} from '../../components';
import {getItem} from '../../helpers';
import CreateItem from './CreateItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Main.styles';

const Main = ({navigation}) => {
  const [reload, setReload] = useState(0);
  const [listDataSource, setListDataSource] = useState([
    {
      isExpanded: false,
      category_name: 'contacts',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'youtube',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'spotify',
      subcategory: [],
    },
  ]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    setListDataSource(array);
  };

  useEffect(() => {
    if (listDataSource[0].subcategory.length === 0) {
      getItem('contacts').then(data => {
        if (data && data.length > 0) {
          console.log('contacts: ', data);
          const newArray = listDataSource.map(item =>
            item.category_name === 'contacts'
              ? {...item, subcategory: data}
              : item,
          );
          setListDataSource(newArray);
          console.log('listdatasource: ', listDataSource);
        }
      });
    }
    if (listDataSource[1].subcategory.length === 0) {
      getItem('youtube').then(data => {
        if (data && data.length > 0) {
          console.log('youtube: ', data);
          const newArray = listDataSource.map(item =>
            item.category_name === 'youtube'
              ? {...item, subcategory: data}
              : item,
          );
          setListDataSource(newArray);
          console.log('listdatasource: ', listDataSource);
        }
      });
    }
    if (listDataSource[2].subcategory.length === 0) {
      getItem('spotify').then(data => {
        if (data && data.length > 0) {
          console.log('spotify: ', data);
          const newArray = listDataSource.map(item =>
            item.category_name === 'spotify'
              ? {...item, subcategory: data}
              : item,
          );
          setListDataSource(newArray);
          console.log('listdatasource: ', listDataSource);
        }
      });
    }
  }, [listDataSource]);

  useEffect(() => {
    console.log('reload: ', String(reload));
  }, [reload]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={styles.titleText}>Main Page</Text>
        </View>
        <Button
          onPress={() => navigation.navigate('WelcomeModal')}
          title="Open Modal"
        />
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
          <CreateItem callBack={setReload} reload={reload} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Main;

