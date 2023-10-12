import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFieldsStyle: {
    borderWidth: 0,
    color: '#000'
  },
  button: {
    width: 150,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  card: {
    backgroundColor: '#fff',
    width: 350,
  }
});

export default GlobalStyles