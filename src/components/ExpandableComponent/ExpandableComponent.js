import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './ExpandableComponent.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <FontAwesome
          style={styles.icon}
          name={
            item.category_name === 'Contacts'
              ? 'address-book'
              : item.category_name === 'Videos'
              ? 'play'
              : 'music'
          }
          color={'#333'}
          size={20}
        />
        <Text style={styles.headerText}>{item.category_name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {item.subcategory.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={() =>
              alert('Name: ' + item.name + ' param: ' + item.param)
            }>
            <Text style={styles.text}>
              {key + 1}. {item.name}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ExpandableComponent;
