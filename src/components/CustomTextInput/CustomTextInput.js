import React, {useState} from 'react';
import {TextInput} from 'react-native';
import styles from './CustomTextInput.styles';

const CustomTextInput = ({value, onChange, placeholder, keyboardType}) => {
  return (
    <TextInput
      value={value}
      onChangeText={v => onChange(v)}
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType || 'default'}
    />
  );
};

export default CustomTextInput;
