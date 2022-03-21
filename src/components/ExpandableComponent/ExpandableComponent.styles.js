import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginTop: 5,
    marginLeft: 10,
  },
});

export default styles;
