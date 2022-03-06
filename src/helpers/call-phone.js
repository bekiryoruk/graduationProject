import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const callPhone = (number) => {
    RNImmediatePhoneCall.immediatePhoneCall(number);
};

export default callPhone;