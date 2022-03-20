import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './ExpandableComponent.styles';

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
            onPress={() => alert('Name: ' + item.name + ' val: ' + item.val)}>
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
