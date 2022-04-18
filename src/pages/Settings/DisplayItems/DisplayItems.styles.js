import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#EEEEEE',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  icon: {},
  scroll: {
    width: '100%',
  },
  itemCard: {
    marginBottom: 10,
  },
  itemCardTitle: {
    fontSize: 20,
  },
  itemCardTextContainer: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    marginBottom: 7,
    marginTop: 7,
    borderRadius: 10,
  },
  itemCardText: {
    fontSize: 16,
    color: '#8B8B8B',
  },
  insertButton: {
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  insertButtonContent: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
  },
  insertButtonIcon: {
    paddingLeft: 2,
    fontWeight: '300',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteContainerText: {
    color: 'red',
    fontWeight: '700',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  optionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 44,
    borderColor: 'white',
    marginBottom: 10,
  },
  clickedOptionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    width: '100%',
    height: 44,
    borderRadius: 10,
    borderColor: 'white',
    marginBottom: 10,
  },
  clickedButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
