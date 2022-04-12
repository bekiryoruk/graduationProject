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
    paddingTop: 6,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -Dimensions.get('window').width * 0.24}],
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
  insertButton: {
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  insertButtonContent: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
  },
  insertButtonIcon: {
    paddingLeft: 2,
    fontWeight: '300',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default styles;
