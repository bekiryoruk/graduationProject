import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#E9EFF0',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'Mulish',
    padding: 15,
    textAlign: 'center',
    marginTop: 30,
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
