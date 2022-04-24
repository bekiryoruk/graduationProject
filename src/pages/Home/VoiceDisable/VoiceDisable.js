import React from 'react';
import {Text, View, TouchableOpacity, Platform, Linking} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './VoiceDisable.styles';
import {callPhone, sendSMS, getItem} from '../../../helpers';
import {BackPressHandler} from '../../../components';
const landmarkSize = 10; // NOTE: bunu değiştirirsen style dosyasından da değişiklik yap, * landmark *
export default class VoiceDisable extends React.Component {
  state = {
    canDetectFaces: false,
    buttonsHover: {
      callButton: true,
      smsButton: false,
      musicButton: false,
      videoButton: false,
    },
    faces: [],
    blinkDetected: false,
    phoneNumber: '',
    musicLink: '',
    videoLink: '',
  };

  UNSAFE_componentWillMount = async () => {
    if (Platform.OS == 'android') {
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
  };

  BackStuff = () => {
    // console.log('back button pressed');
  };

  setTrueSmsButton() {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: true,
        musicButton: false,
        videoButton: false,
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
      },
    });
  }

  callAnyone = async function () {
    callPhone(this.state.phoneNumber);
  };

  sendSms = async function () {
    sendSMS([this.state.phoneNumber], 'selam');
  };

  openSpotify = async function () {
    Linking.openURL(this.state.musicLink);
  };

  openYoutube = async function () {
    Linking.openURL(this.state.videoLink);
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
    } else {
      this.setTrueVideoButton();
    }

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
      } else {
        this.openYoutube();
      }
    }
    if (this.state.blinkDetected && bothEyes >= 0.9) {
      this.setState({blinkDetected: false});
    }
    this.setState({faces});
  };

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

    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type="front"
        zoom={0}
        ratio="16:9"
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
          }}></View>

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
