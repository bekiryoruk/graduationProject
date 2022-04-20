import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import Voice from '@react-native-community/voice';
import BackgroundService from 'react-native-background-actions';

import styles from './VisionDisable.styles';
import {callPhone, sendSMS, getItem} from '../../../helpers';
import {BackPressHandler} from '../../../components';
import IconButton from '../../../../src/navigation/IconButton';

export default class VoiceDisable extends React.Component {
  state = {
    voiceResult: '',
    phoneNumber: '',
    musicLink: '',
    videoLink: '',
  };

  sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

  veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(this.state.voiceResult);
        await this.sleep(delay);
      }
    });
  };

  options = {
    taskName: 'Example',
    taskTitle: 'Touchless',
    taskDesc: 'Voice Recording',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 2000,
    },
  };

  backgroundServiceStart = async () => {
    await BackgroundService.start(this.veryIntensiveTask, this.options);
  };

  // TODO: bu kısım uyarı veriyor bu kısıma dönücem
  UNSAFE_componentWillMount = async () => {
    if (Platform.OS === 'android') {
      BackPressHandler(this.BackStuff);
    }
    const returnContactData = await getItem('Contact');
    if (returnContactData !== null && returnContactData !== undefined) {
      this.setState({
        phoneNumber: returnContactData && returnContactData[0]?.param,
      });
    }

    const returnVideoData = await getItem('Video');
    if (returnVideoData !== null && returnVideoData !== undefined) {
      this.setState({
        videoLink: returnVideoData && returnVideoData[0]?.param,
      });
    }

    const returnMusicData = await getItem('Music');
    if (returnMusicData !== null && returnMusicData !== undefined) {
      this.setState({
        musicLink: returnMusicData && returnMusicData[0]?.param,
      });
    }
    Voice.onSpeechStart = this.onSpeechStartHandler;
    Voice.onSpeechEnd = this.onSpeechEndHandler;
    Voice.onSpeechResults = this.onSpeechResultsHandler;
    this.startRecording();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  };

  BackStuff = () => {
    // console.log('back button pressed');
  };

  onSpeechStartHandler = e => {
    console.log('start handler==>>>', e);
    this.backgroundServiceStart();
  };

  onSpeechEndHandler = e => {
    //  TODO: stop ihtiyacım olursa diye tutuyorum simdilik
  };

  onSpeechResultsHandler = e => {
    let text = e.value[0];
    this.setState({
      voiceResult: text,
    });
    console.log('speech result handler', e);
    console.log(text);
    if (text.includes('call')) {
      this.callAnyone();
    } else if (text.includes('music') || text.includes('spotify')) {
      this.openSpotify();
    } else if (text.includes('youtube') || text.includes('video')) {
      this.openYoutube();
    } else if (text.includes('sms') || text.includes('message')) {
      this.sendSms();
    } else if (text.includes('calendar') || text.includes('save')) {
      this.setEventToCalender();
    } else if (
      text.includes('turn') ||
      text.includes('back') ||
      text.includes('touchless')
    ) {
      // bu kısım geliştirilecek
      this.turnBackToApp();
    }
    this.startRecording();
  };

  startRecording = async () => {
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised', error);
    }
  };

  stopRecording = async () => {
    try {
      // await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };

  callAnyone = async function () {
    callPhone(this.state.phoneNumber);
  };

  sendSms = async function () {
    sendSMS([this.state.phoneNumber], 'selam');
    /* Whatsapp kısmını yoruma aldım ne yaparız burayı bilmıyom
    const mobile = '+905345242175';
    let url =
      'whatsapp://send?text=' + 'denem-whatsapp-message' + '&phone=' + mobile;
    Linking.openURL(url);*/
  };

  openSpotify = async function () {
    Linking.openURL(this.state.musicLink);
  };

  openYoutube = async function () {
    Linking.openURL(this.state.videoLink);
  };

  turnBackToApp = async function () {
    // TODO: bunu araştırıp app'e dönmesini sağlıycam
    Linking.openURL('Touchless');
  };

  setEventToCalender = async function () {
    RNCalendarEvents.findCalendars();
    RNCalendarEvents.saveEvent('Event Name', {
      calendarId: '003',
      startDate: '2022-03-15T13:42:00.000Z', // burada yazılan saatin 3 saat sonrasına etkinlik oluşturuyor.
      endDate: '2022-03-15T14:39:00.000Z',
      location: 'Izmir, Turkey',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Say the activity you want to do.</Text>
        <View style={styles.icon}>
          <View style={styles.smallColumn}></View>
          <View style={styles.midColumn}></View>
          <View style={styles.bigColumn}></View>
          <View style={styles.iconContent}>
            <IconButton src={require('./mic.png')} />
          </View>
          <View style={styles.bigColumn}></View>
          <View style={styles.midColumn}></View>
          <View style={styles.smallColumn}></View>
        </View>
        <View style={{bottom: 0}}>
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 100,
            }}>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.callAnyone.bind(this)}>
              <Text style={styles.flipText}> CALL </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.sendSms.bind(this)}>
              <Text style={styles.flipText}> SMS </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.openSpotify.bind(this)}>
              <Text style={styles.flipText}> MUSIC </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.openYoutube.bind(this)}>
              <Text style={styles.flipText}> VIDEO </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.flipButton,
                styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.setEventToCalender.bind(this)}>
              <Text style={styles.flipText}> CALENDAR </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
