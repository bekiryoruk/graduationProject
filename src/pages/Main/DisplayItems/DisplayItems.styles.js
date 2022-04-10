import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#E5E5E5',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 26,
    margin: 'auto',
    fontWeight: '600',
    color: 'black',
  },
  scroll: {
    width: '100%',
  },
  itemCard: {
    padding: 20,
  },
  itemCardTitle: {
    fontSize: 20,
  },
  savebutton: {
    marginBottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
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
