import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#ffddcf',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'Mulish',
    padding: 15,
    textAlign: 'center',
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 40,
    padding: 5,
    fontWeight: '300',
    textAlign: 'center',
    color: 'black',
  },
  circles: {
    marginTop: 40,
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
