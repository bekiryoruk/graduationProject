import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

import {ExpandableComponent} from '../../components';
import CreateItem from './CreateItem';

import styles from './Main.styles';

const Main = () => {
  const [listDataSource, setListDataSource] = useState(CONTENT);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={styles.titleText}>Main Page</Text>
        </View>
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
          <CreateItem />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'contacts',
    subcategory: [
      {name: 'Bekir Yörük', val: '+905345242175'},
      {name: 'Ahmet Taşiyan', val: '+905437243485'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'youtube',
    subcategory: [
      {
        name: 'Hadise',
        val: 'https://www.youtube.com/watch?v=26xNHZzGJZI',
      },
      {
        name: 'Deep turkis',
        val: 'https://www.youtube.com/watch?v=Dbokrn6m-bc',
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'spotify',
    subcategory: [{val: 'Sub Cat 7'}, {val: 'Sub Cat 9'}],
  },
];
