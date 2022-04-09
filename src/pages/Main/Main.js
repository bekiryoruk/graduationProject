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
      category_name: 'Contacts',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'Videos',
      subcategory: [],
    },
    {
      isExpanded: false,
      category_name: 'Musics',
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
      getItem('Contacts').then(data => {
        if (data && data.length > 0) {
          console.log('Contacts: ', data);
          const newArray = listDataSource.map(item =>
            item.category_name === 'Contacts'
              ? {...item, subcategory: data}
              : item,
          );
          setListDataSource(newArray);
          console.log('listdatasource: ', listDataSource);
        }
      });
    }
    if (listDataSource[1].subcategory.length === 0) {
      getItem('Videos').then(data => {
        if (data && data.length > 0) {
          console.log('Videos: ', data);
          const newArray = listDataSource.map(item =>
            item.category_name === 'Videos'
              ? {...item, subcategory: data}
              : item,
          );
          setListDataSource(newArray);
          console.log('listdatasource: ', listDataSource);
        }
      });
    }
    if (listDataSource[2].subcategory.length === 0) {
      getItem('Musics').then(data => {
        if (data && data.length > 0) {
          console.log('Musics: ', data);
          const newArray = listDataSource.map(item =>
            item.category_name === 'Musics'
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

  useEffect(() => {
    getItem('userType').then(data => {
      if (!data) {
        navigation.navigate('WelcomeModal');
      }
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={styles.titleText}>
            Click for showing registered information.
          </Text>
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
