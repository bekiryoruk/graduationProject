import React from 'react';
import { View, Text, Image } from "react-native";


const IconButton = ({focused, src, text}) => {
  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', paddingTop: 5}}>
      <Image
        source={src}
        resizeMode="contain"
        style={{
          width: src === 3 ? 80 : 20, //src 3 represents mic icon in voiceDisable page.
          height: src === 3 ? 80 : 20,
          tintColor: src === 3 ? '#fff' : focused ? '#e32f45' : '#748c94',
        }}
      />
      <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 10}}>
        {text}
      </Text>
    </View>
  );
};

export default IconButton;
