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
    backgroundColor: '#E9EFF0',
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
  skipForNow: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  skipForNowText: {
    fontSize: 18,
    fontWeight: '700',
  },
  nextButton: {
    color: 'black',
    width: 120,
    bottom: 0,
    borderRadius: 40,
    borderWidth: 9,
  },
});

export default styles;
