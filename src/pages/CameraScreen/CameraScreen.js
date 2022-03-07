import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {callPhone, sendSMS} from '../../helpers';
import styles from './CameraScreen.styles';


const landmarkSize = 10;

export default class CameraScreen extends React.Component {
  state = {
    zoom: 0,
    type: 'front',
    ratio: '16:9',
    canDetectFaces: false,
    buttonsHover: {
      callButton: true,
      smsButton: false,
    },
    faces: [],
    blinkDetected: false,
  };

  setTrueSmsButton() {
    this.setState({
      buttonsHover: {
        callButton: false,
        smsButton: true,
      },
    });
  }
  setTrueCallButton() {
    this.setState({
      buttonsHover: {
        callButton: true,
        smsButton: false,
      },
    });
  }

  // USER FUNCTIONS

  // calls someone
  callAnyone = async function () {
    callPhone('+905436083152');
  };

  // sends sms to some numbers
  sendSms = async function () {
    sendSMS(['+905436083152'], "selam")
  };

  toggle = value => () => {
    this.setState(prevState => ({[value]: !prevState[value]}));
  };

  facesDetected = ({faces}) => {
    const rightEye = faces[0].rightEyeOpenProbability;
    const leftEye = faces[0].leftEyeOpenProbability;
    const bothEyes = (rightEye + leftEye) / 2;
    if (faces[0].leftEyePosition.x < 330) {
      this.setTrueCallButton();
    } else {
      this.setTrueSmsButton();
    }

    if (bothEyes <= 0.3) {
      this.setState({blinkDetected: true});
      if (this.state.buttonsHover.callButton) {
        this.callAnyone();
      } else {
        this.sendSms();
      }
    }
    if (this.state.blinkDetected && bothEyes >= 0.9) {
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
              width: landmarkSize,
              height: landmarkSize,
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
        style={styles.camera}
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
          this.setState({canDetectFaces: true});
        }}
        onFacesDetected={this.state.canDetectFaces ? this.facesDetected : null}
        onFaceDetectionError={error => console.log('FDError', error)} // This is never triggered
      >
        <View style={{bottom: 0}}>
          <View
            style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                this.state.buttonsHover.callButton
                  ? styles.selectedButton
                  : styles.flipButton,
                this.state.buttonsHover.callButton
                  ? styles.selectedPicButton
                  : styles.picButton,
                {flex: 0.3, alignSelf: 'flex-end'},
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
                {flex: 0.3, alignSelf: 'flex-end'},
              ]}
              onPress={this.sendSms.bind(this)}>
              <Text style={styles.flipText}> SMS </Text>
            </TouchableOpacity>
          </View>
        </View>
        {canDetectFaces && this.renderLandmarks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}
