import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
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
  cardCreateBody: {
    flex: 0.95,
    width: '100%'
  },
  cardIcon: {
    flex: 0.05
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17,
    paddingRight: 17
  },
  drawerSwitchText: {
    fontWeight: 'bold',
  },
  drawerSwitch: {
    flex: 0.5
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
  },
  inputFieldsContainer: {
    width: '90%',
    height: '100%',
  },
  inputFieldsStyle: {
    borderWidth: 0,
    width: '100%',
    height: '100%',
  },
  primaryButtonChildrenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonChildrenText: {
    fontWeight: 'bold',
    fontSize: 17
  }
});

export default GlobalStyles