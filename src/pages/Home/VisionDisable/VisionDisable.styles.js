import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalStyle: {
    position: 'absolute',
    height: 'auto',
    minHeight: 36,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  modalText: {
    color: 'black',
    fontSize: 24,
  },
  modalLabelText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },
  modalInfoText: {
    fontSize: 20,
    backgroundColor: '#333',
    marginTop: 5,
  },
  modalCancelText: {
    color: 'red',
    fontWeight: '600',
  },
  modalSendText: {
    fontWeight: '600',
    color: 'blue',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    padding: 40,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '80%',
  },
  smallColumn: {
    width: 20,
    height: 30,
    backgroundColor: '#8E8E8E',
    borderRadius: 30,
  },
  midColumn: {
    width: 20,
    height: 60,
    backgroundColor: '#8E8E8E',
    borderRadius: 30,
  },
  bigColumn: {
    width: 20,
    height: 90,
    backgroundColor: '#8E8E8E',
    borderRadius: 30,
  },
  iconContent: {
    backgroundColor: '#333',
    borderColor: '#333',
    borderRadius: 30,
    padding: 20,
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
  picButton: {
    backgroundColor: 'white',
  },
});

export default styles;
