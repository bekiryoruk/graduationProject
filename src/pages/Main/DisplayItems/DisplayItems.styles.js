import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#EEEEEE',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 26,
    margin: 'auto',
    fontWeight: '600',
    color: 'black',
    paddingTop: 6,
  },
  scroll: {
    width: '100%',
  },
  wholeContent: {
    padding: 20,
  },
  itemCard: {
    marginBottom: 10,
  },
  itemCardTitle: {
    fontSize: 20,
    paddingBottom: 8,
  },
  itemCardTextContainer: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 7,
    marginTop: 7,
    borderRadius: 10,
  },
  itemCardText: {
    fontSize: 18,
    color: '#8B8B8B',
  },
  savebutton: {
    marginBottom: 50,
    display: 'flex',
    alignItems: 'flex-end',
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
