import SmsAndroid from 'react-native-get-sms-android';

const sendSMS = (phoneNumbersArray, message) => {

    const phoneNumbers = {
        "addressList": phoneNumbersArray
    }

    SmsAndroid.autoSend(
        JSON.stringify(phoneNumbers),
        message,
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (success) => {
          console.log('SMS sent successfully');
        },
      );
}

export default sendSMS;