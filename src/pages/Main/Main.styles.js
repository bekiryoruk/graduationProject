import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#EEEEEE'},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Lato',
    paddingLeft: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    marginTop: 5,
    marginLeft: 20,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.14)',
    alignItems: 'center',
  },
  itemBlocks: {
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default styles;
