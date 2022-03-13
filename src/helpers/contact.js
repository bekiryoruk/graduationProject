import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeContact(value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('contacts', jsonValue)
    } catch (e) {
      console.log(e);
    }
}


export async function getContact() {
    try {
      const jsonValue = await AsyncStorage.getItem('contacts')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}