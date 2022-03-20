import React from 'react';
import { ActionButton } from '../../components';
import { Alert } from "react-native";

const Calibration = () => {
  const funct = () => Alert.alert('Simple Button pressed');
  return (
    <ActionButton
      title={"Adana"}
      onClick={funct}
    />
  );
};

export default Calibration;
