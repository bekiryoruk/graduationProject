import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#F8F1EB',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'Mulish',
    padding: 15,
    textAlign: 'center',
    marginTop: 30,
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  optionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    height: 50,
    borderColor: 'white',
    marginBottom: 10,
  },
  clickedOptionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    width: '100%',
    borderRadius: 10,
    height: 50,
    borderColor: 'white',
    marginBottom: 10,
  },
  clickedButtonText: {
    color: 'white',
    fontSize: 21,
  },
  buttonText: {
    fontSize: 21,
    color: '#333',
    fontWeight: '600',
  },
  circles: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  nextButton: {
    color: 'black',
    width: 120,
    bottom: 0,
    borderRadius: 40,
    borderWidth: 11,
  },
});

export default styles;
