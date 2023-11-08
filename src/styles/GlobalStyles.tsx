import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFieldsStyle: {
    borderWidth: 0,
    color: '#000',
    width: '100%'
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
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  card: {
    minHeight: 300,
    width: 350,
    marginTop: 10,
    marginBottom: 10
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  cardTitle: {
    flex: 0.05,
    width: '100%'
  },
  cardBody: {
    flex: 0.9
  },
  cardIcon: {
    flex: 0.05
  },
  homePageWelcomeSection:{
    flex: 0.33,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePageNotecardSection:{
    flex: 0.66,
    width: '100%',
    marginBottom: 10
  }
});

export default GlobalStyles