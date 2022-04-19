import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    padding: 40,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '80%',
  },
  smallColumn: {
    width: 20,
    height: 30,
    backgroundColor: '#8E8E8E',
    borderRadius: 30,
  },
  midColumn: {
    width: 20,
    height: 60,
    backgroundColor: '#8E8E8E',
    borderRadius: 30,
  },
  bigColumn: {
    width: 20,
    height: 90,
    backgroundColor: '#8E8E8E',
    borderRadius: 30,
  },
  iconContent: {
    backgroundColor: '#333',
    borderColor: '#333',
    borderRadius: 30,
    padding: 20,
  },
  flipButton: {
    flex: 0.2,
    height: 40,
    bottom: 60,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'white',
  },
});

export default styles;
