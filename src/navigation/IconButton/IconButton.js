import React from 'react';
import { View, Text, Image } from "react-native";


const IconButton = ({focused, src, text}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 5}}>
    <Image 
      source={src}
      resizeMode='contain'
      style={{
        width: 20,
        height: 20,
        tintColor: focused ? '#e32f45' : '#748c94',
      }}
    />
    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>{text}</Text>
  </View>
  );
};

export default IconButton;
