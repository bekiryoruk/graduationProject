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
    buttonsHover: 'callButton',
    faces: [],
    phoneNumbers: null,
    musicLinks: null,
    videoLinks: null,
    itemCount: 1,
    listItemIndex: 0,
    actionSelected: false,
    positionY: 0,
    canRollEye: true,
  };

  UNSAFE_componentWillMount = async () => {
    if (Platform.OS == 'android') {
      BackPressHandler(this.BackStuff);
    }
    const returnContactData = await getItem('Contact');
    if (returnContactData !== null && returnContactData !== undefined) {
      this.setState({
        phoneNumbers: returnContactData && returnContactData,
      });
    }

    const returnVideoData = await getItem('Video');
    if (returnVideoData !== null && returnVideoData !== undefined) {
      this.setState({
        videoLinks: returnVideoData && returnVideoData,
      });
    }

    const returnMusicData = await getItem('Music');
    if (returnMusicData !== null && returnMusicData !== undefined) {
      this.setState({
        musicLinks: returnMusicData && returnMusicData,
      });
    }
  };

  BackStuff = () => {
    // console.log('back button pressed');
  };

  callAnyone = async function (index) {
    callPhone(this.state.phoneNumbers[index].param);
  };

  sendSms = async function (index) {
    sendSMS([this.state.phoneNumbers[index].param], 'selam');
  };

  closeTab = () => {
    this.setState({
      buttonsHover: 'callButton',
      actionSelected: false,
      itemCount: 1,
      listItemIndex: 0,
      canDetectFaces: false,
    });
    setTimeout(() => {
      this.setState({canDetectFaces: true});
    }, 1000);
  };

  // TODO: show a toast message to user
  openSpotify = async function (index) {
    Linking.openURL(this.state.musicLinks[index].param).catch(err => {
      console.log(
        'Error: Could not open URL: ',
        this.state.musicLinks[index].param,
      );
    });
  };

  // TODO: show a toast message to user
  openYoutube = async function (index) {
    Linking.openURL(this.state.videoLinks[index].param).catch(err => {
      console.log(
        'Error: Could not open URL: ',
        this.state.videoLinks[index].param,
      );
    });
  };

  takeAction = index => {
    console.log('action button triggered');
    if (index === 0) {
      this.closeTab();
    } else {
      const functionIndex = index - 1;
      if (
        this.state.buttonsHover === 'callButton' &&
        this.state.phoneNumbers &&
        this.state.phoneNumbers[functionIndex]
      ) {
        this.callAnyone(functionIndex);
      } else if (
        this.state.buttonsHover === 'smsButton' &&
        this.state.phoneNumbers &&
        this.state.phoneNumbers[functionIndex]
      ) {
        this.sendSms(functionIndex);
      } else if (
        this.state.buttonsHover === 'musicButton' &&
        this.state.musicLinks &&
        this.state.musicLinks[functionIndex]
      ) {
        this.openSpotify(functionIndex);
      } else if (
        this.state.videoLinks &&
        this.state.videoLinks[functionIndex]
      ) {
        this.openYoutube(functionIndex);
      }
      this.closeTab();
    }
  };

  facesDetected = ({faces}) => {
    const rightEye = faces[0].rightEyeOpenProbability;
    const leftEye = faces[0].leftEyeOpenProbability;
    const bothEyes = (rightEye + leftEye) / 2;
    let buttonType = '';
    let countOfItem = 0;
    if (!this.state.actionSelected) {
      if (faces[0].leftEyePosition.x < 200) {
        buttonType = 'callButton';
        countOfItem = this.state.phoneNumbers && this.state.phoneNumbers.length;
      } else if (
        faces[0].leftEyePosition.x > 200 &&
        faces[0].leftEyePosition.x < 300
      ) {
        buttonType = 'smsButton';
        countOfItem = this.state.phoneNumbers && this.state.phoneNumbers.length;
      } else if (
        faces[0].leftEyePosition.x > 300 &&
        faces[0].leftEyePosition.x < 390
      ) {
        buttonType = 'musicButton';
        countOfItem = this.state.musicLinks && this.state.musicLinks.length;
      } else {
        buttonType = 'videoButton';
        countOfItem = this.state.videoLinks && this.state.videoLinks.length;
      }

      this.setState({
        buttonsHover: buttonType,
      });

      if (bothEyes <= 0.2) {
        this.setState({
          actionSelected: true,
          itemCount: countOfItem + 1 || 1,
          canDetectFaces: false,
        });
        setTimeout(() => {
          this.setState({canDetectFaces: true});
        }, 500);
      }
    } else {
      const realDiff = faces[0].leftEyePosition.y - this.state.positionY;

      if (
        this.state.canRollEye &&
        ((realDiff <= 1.2 && realDiff >= 0.6) ||
          (realDiff >= -1.2 && realDiff <= -0.6))
      ) {
        const count = this.state.itemCount;
        const oldIndex = this.state.listItemIndex;
        const difference = Math.floor((realDiff * 10) / count);

        if (this.state.itemCount > 0) {
          const res =
            (oldIndex + difference) % count > 0 ? oldIndex + 1 : oldIndex - 1;
          console.log(res);
          let realRes = res;
          if (res < 0) {
            realRes = count - 1;
          } else if (res > count - 1) {
            realRes = 0;
          }
          this.setState({
            listItemIndex: realRes,
            canRollEye: false,
          });
          setTimeout(() => {
            this.setState({canRollEye: true});
          }, 1000);
        }
      }

      this.setState({
        positionY: faces[0].leftEyePosition.y,
      });

      if (bothEyes <= 0.2) {
        this.takeAction(this.state.listItemIndex);
        this.setState({canRollEye: true});
      }
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

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderItemList() {
    const itemList =
      this.state.buttonsHover === 'callButton' ||
      this.state.buttonsHover === 'smsButton'
        ? this.state.phoneNumbers
        : this.state.buttonsHover === 'musicButton'
        ? this.state.musicLinks
        : this.state.videoLinks;

    return (
      <View style={styles.itemList}>
        <TouchableOpacity
          style={[
            styles.button,
            this.state.listItemIndex === 0
              ? styles.itemButtonOn
              : styles.itemButtonOff,
            {
              alignItems: 'center',
            },
          ]}
          onPress={this.closeTab.bind(this)}>
          <Text style={{color: 'red', fontSize: 14}}> CLOSE THIS TAB </Text>
        </TouchableOpacity>
        {itemList &&
          itemList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  this.state.listItemIndex === index + 1
                    ? styles.itemButtonOn
                    : styles.itemButtonOff,
                ]}
                onPress={() => console.log(item)}>
                <Text
                  style={{
                    color:
                      this.state.listItemIndex === index + 1
                        ? 'white'
                        : 'black',
                    fontSize: 14,
                  }}>
                  {item.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }

  renderActionButtons() {
    return (
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            this.state.buttonsHover === 'callButton'
              ? styles.selectedButton
              : styles.flipButton,
            styles.button,
          ]}
          onPress={this.callAnyone.bind(this)}>
          <Text style={styles.flipText}> CALL </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            this.state.buttonsHover === 'smsButton'
              ? styles.selectedButton
              : styles.flipButton,
            styles.button,
          ]}
          onPress={this.sendSms.bind(this)}>
          <Text style={styles.flipText}> SMS </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            this.state.buttonsHover === 'musicButton'
              ? styles.selectedButton
              : styles.flipButton,
            styles.button,
          ]}
          onPress={this.openSpotify.bind(this)}>
          <Text style={styles.flipText}> MUSIC </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            this.state.buttonsHover === 'videoButton'
              ? styles.selectedButton
              : styles.flipButton,
            styles.button,
          ]}
          onPress={this.openYoutube.bind(this)}>
          <Text style={styles.flipText}> VIDEO </Text>
        </TouchableOpacity>
      </View>
    );
  }

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

        {!this.state.actionSelected && this.renderActionButtons()}
        {this.state.actionSelected && this.renderItemList()}
        {canDetectFaces && this.renderLandmarks()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}
