import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
  Linking,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {callPhone, sendSMS} from '../../helpers';
import RNCalendarEvents from 'react-native-calendar-events';
import Voice from '@react-native-community/voice';
import BackgroundService from 'react-native-background-actions';

const landmarkSize = 10;
export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'front', // Camera Front or Back
    whiteBalance: 'auto',
    ratio: '16:9',
    canDetectFaces: false,
    canDetectText: false,
    buttonsHover: {
      callButton: true,
      smsButton: false,
      musicButton: false,
      videoButton: false,
      calenderButton: false,
    },
    canDetectBarcode: false,
    faces: [],
    blinkDetected: false,
    blinkedimage: null,
    voiceResult: '',
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

  /*b = async () => {
    await BackgroundService.updateNotification({
      taskDesc: 'Voice Recording',
    });
  };

  c = async () => {
    await BackgroundService.stop();
  };*/
  // TODO: bu kısım uyarı veriyor bu kısıma dönücem
  UNSAFE_componentWillMount = () => {
    Voice.onSpeechStart = this.onSpeechStartHandler;
    Voice.onSpeechEnd = this.onSpeechEndHandler;
    Voice.onSpeechResults = this.onSpeechResultsHandler;
    this.startRecording();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
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

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  touchToFocus(event) {
    const {pageX, pageY} = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }
    this.setState({
      autoFocusPoint: {
        normalized: {x, y},
        drawRectPosition: {x: pageX, y: pageY},
      },
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function () {
    /* if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePicture ', data);
      this.setState({blinkedimage: data.path});
    }*/
  };

  /*manageButtonStates(type) {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: false,
        musicButton: false,
      },
    });
    if (type === 'call') {
      this.setState({ buttonsHover: { callButton: true } });
    } else if (type === 'sms') {
      this.setState({ buttonsHover: { smsButton: true }});
    } else {
      this.setState({ buttonsHover: {  musicButton: true }});
    }
  }*/

  setTrueSmsButton() {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: true,
        musicButton: false,
        videoButton: false,
        calenderButton: false,
      },
    });
  }

  setTrueCallButton() {
    this.setState({
      buttonsHover: {
        callButton: true,
        smsButton: false,
        musicButton: false,
        videoButton: false,
        calenderButton: false,
      },
    });
  }

  setTrueMusicButton() {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: false,
        musicButton: true,
        videoButton: false,
        calenderButton: false,
      },
    });
  }

  setTrueVideoButton() {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: false,
        musicButton: false,
        videoButton: true,
        calenderButton: false,
      },
    });
  }

  setTrueCalenderButton() {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: false,
        musicButton: false,
        videoButton: false,
        calenderButton: true,
      },
    });
  }

  callAnyone = async function () {
    callPhone('+905436083152');
  };

  sendSms = async function () {
    sendSMS(['+905436083152'], 'selam');
    /* Whatsapp kısmını yoruma aldım ne yaparız burayı bilmıyom
    const mobile = '+905345242175';
    let url =
      'whatsapp://send?text=' + 'denem-whatsapp-message' + '&phone=' + mobile;
    Linking.openURL(url);*/
  };

  openSpotify = async function () {
    Linking.openURL(
      'https://open.spotify.com/playlist/37i9dQZF1E4yMk2wN0k5C4?si=57ce9467c865431d',
    );
  };

  openYoutube = async function () {
    Linking.openURL('https://www.youtube.com/watch?v=E4Ytu27vRho');
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

  toggle = value => () => {
    this.setState(prevState => ({[value]: !prevState[value]}));
    console.log(value, this.state[`${value}`]);
  };

  facesDetected = ({faces}) => {
    const rightEye = faces[0].rightEyeOpenProbability;
    const leftEye = faces[0].leftEyeOpenProbability;
    const smileprob = faces[0].smilingProbability;
    const bothEyes = (rightEye + leftEye) / 2;
    if (faces[0].leftEyePosition.x < 200) {
      this.setTrueCallButton();
    } else if (
      faces[0].leftEyePosition.x > 200 &&
      faces[0].leftEyePosition.x < 300
    ) {
      this.setTrueSmsButton();
    } else if (
      faces[0].leftEyePosition.x > 300 &&
      faces[0].leftEyePosition.x < 390
    ) {
      this.setTrueMusicButton();
    } else if (
      faces[0].leftEyePosition.x > 390 &&
      faces[0].leftEyePosition.x < 430
    ) {
      this.setTrueCalenderButton();
    } else {
      this.setTrueVideoButton();
    }

    // console.log(
    //   JSON.stringify({
    //     rightEyeOpenProbability: rightEye,
    //     leftEyeOpenProbability: leftEye,
    //     smilingProbability: smileprob,
    //     blinkProb: bothEyes,
    //   }),
    // );
    if (bothEyes <= 0.3) {
      console.log(
        JSON.stringify({
          blinkDetected: 'blinkDetected',
          rightEyeOpenProbability: rightEye,
          leftEyeOpenProbability: leftEye,
        }),
      );
      this.setState({blinkDetected: true});
      if (this.state.buttonsHover.callButton) {
        this.callAnyone();
      } else if (this.state.buttonsHover.smsButton) {
        this.sendSms();
      } else if (this.state.buttonsHover.musicButton) {
        this.openSpotify();
      } else if (this.state.buttonsHover.calenderButton) {
        this.setEventToCalender();
      } else {
        this.openYoutube();
      }
    }
    if (this.state.blinkDetected && bothEyes >= 0.9) {
      this.takePicture(faces);
      this.setState({blinkDetected: false});
    }
    this.setState({faces});
  };

  renderFace = ({
    bounds,
    faceID,
    rollAngle,
    yawAngle,
    leftEyeOpenProbability,
    rightEyeOpenProbability,
    smilingProbability,
  }) => (
    <View
      key={faceID}
      transform={[
        {perspective: 600},
        {rotateZ: `${rollAngle.toFixed(0)}deg`},
        {rotateY: `${yawAngle.toFixed(0)}deg`},
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}>
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>
        eyeOpenProbability:
        {leftEyeOpenProbability + rightEyeOpenProbability / 2}
      </Text>
      <Text style={styles.faceText}>
        smilingProbability: {smilingProbability}
      </Text>
    </View>
  );

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
      </View>
    );
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none"></View>
  );

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderCamera() {
    const {canDetectFaces} = this.state;
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    // handleFaceDetected = faceArray => {
    //   console.log('handleFaceDetected', faceArray);
    // };
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        zoom={this.state.zoom}
        ratio={this.state.ratio}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onCameraReady={() => {
          console.log('onCameraReady');
          this.setState({canDetectFaces: true});
        }}
        onFacesDetected={this.state.canDetectFaces ? this.facesDetected : null}
        onFaceDetectionError={error => console.log('FDError', error)} // This is never triggered
      >
        <View
          style={{
            flex: 0.5,
            height: 72,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}> FLIP </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{bottom: 0}}>
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              style={[
                this.state.buttonsHover.callButton
                  ? styles.selectedButton
                  : styles.flipButton,
                this.state.buttonsHover.callButton
                  ? styles.selectedPicButton
                  : styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.callAnyone.bind(this)}>
              <Text style={styles.flipText}> CALL </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                this.state.buttonsHover.smsButton
                  ? styles.selectedButton
                  : styles.flipButton,
                this.state.buttonsHover.smsButton
                  ? styles.selectedPicButton
                  : styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.sendSms.bind(this)}>
              <Text style={styles.flipText}> SMS </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                this.state.buttonsHover.musicButton
                  ? styles.selectedButton
                  : styles.flipButton,
                this.state.buttonsHover.musicButton
                  ? styles.selectedPicButton
                  : styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.openSpotify.bind(this)}>
              <Text style={styles.flipText}> MUSIC </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                this.state.buttonsHover.videoButton
                  ? styles.selectedButton
                  : styles.flipButton,
                this.state.buttonsHover.videoButton
                  ? styles.selectedPicButton
                  : styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.openYoutube.bind(this)}>
              <Text style={styles.flipText}> VIDEO </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                this.state.buttonsHover.calenderButton
                  ? styles.selectedButton
                  : styles.flipButton,
                this.state.buttonsHover.calenderButton
                  ? styles.selectedPicButton
                  : styles.picButton,
                {flex: 0.24, alignSelf: 'flex-end'},
              ]}
              onPress={this.setEventToCalender.bind(this)}>
              <Text style={styles.flipText}> CALENDAR </Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.renderFaces()}
        {canDetectFaces && this.renderLandmarks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.2,
    height: 40,
    bottom: 60,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    flex: 0.2,
    height: 40,
    bottom: 60,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: '#333',
    color: 'white',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'white',
  },
  selectedPicButton: {
    backgroundColor: '#aaa',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
