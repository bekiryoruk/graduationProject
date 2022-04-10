import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    margin: 'auto',
    fontWeight: '700',
    color: 'black',
  },
  inputContainer: {
    width: '100%',
  },
  savebutton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 300,
    fontWeight: 'bold',
    margin: 20,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  pickertext: {
    color: 'white',
  },
  text: {
    paddingBottom: 9,
    paddingTop: 11,
    paddingLeft: 40,
    marginTop: 20,
    paddingRight: 40,
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#333',
  },
});

export default styles;
