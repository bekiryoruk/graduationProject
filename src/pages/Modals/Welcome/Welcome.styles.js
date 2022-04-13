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
    backgroundColor: '#FFDDCF',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Mulish',
    padding: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    padding: 5,
    fontWeight: '300',
    textAlign: 'center',
    color: 'black',
  },
  circles: {
    marginTop: 20,
    marginBottom: 20,
  },
  nextButton: {
    color: 'black',
    width: 250,
    bottom: 0,
    borderRadius: 40,
    borderWidth: 11,
  },
});

export default styles;
