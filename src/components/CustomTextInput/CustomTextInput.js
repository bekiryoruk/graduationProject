import React, {useState} from 'react';
import {TextInput} from 'react-native';
import styles from './CustomTextInput.styles';

const CustomTextInput = ({value, onChange, placeholder, keyboardType}) => {
  const [currentValue, setCurrentValue] = useState(`${value}`);

  return (
    <TextInput
      value={currentValue}
      onChangeText={v => setCurrentValue(v)}
      onEndEditing={() => onChange(currentValue)}
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType || 'default'}
    />
  );
};

export default CustomTextInput;
