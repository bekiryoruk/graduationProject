import {StyleSheet} from 'react-native';

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
  landmark: {
    width: 10, // change this
    height: 10, // change this
    position: 'absolute',
    backgroundColor: 'red',
  },
  actionButtons: {
    bottom: 0,
    height: 56,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

export default styles;
