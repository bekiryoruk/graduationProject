import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#C0C7DF',
  },
  inputs: {
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Mulish',
    padding: 15,
    textAlign: 'center',
    marginTop: 20,
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
    borderWidth: 13,
  },
});

export default styles;
