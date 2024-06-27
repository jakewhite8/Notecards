import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTitle from '../views/createTitle';
import CreateCard from '../views/createCard';
import Details from '../views/details';
import Login from '../views/login';
import Notecard from '../views/notecard';
import Register from '../views/register';
import ReviewSet from '../views/reviewSet';
import Loading from '../views/loading';
import { StackParamList } from '../types/DataTypes';
import { useTheme } from '@rneui/themed';
import DrawerNavigator from './DrawerNavigator';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import { useAppState } from '../context/GlobalState';
import AuthService from '../services/auth';
import { AxiosResponse } from 'axios';
import DeleteButton from '../components/deleteButton';

function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true)
  const { state, dispatch } = useAppState();
  const { theme, updateTheme } = useTheme();
  const {t, i18n} = useTranslation();

  async function getStoredValues() {
    // Retrieve User, Theme and Language information stored locally
    let result = await Promise.all([
      SecureStore.getItemAsync('user'),
      SecureStore.getItemAsync('theme'),
      SecureStore.getItemAsync('language'),
    ])

    const storedValues = {
      user: result[0],
      theme: result[1],
      language: result[2],
    }
    
    if (storedValues.user) {
      // Confirm validity of token
      const token = JSON.parse(storedValues.user).token
      await AuthService.validToken(token)
        .then(function(response: AxiosResponse) {
          // Token is still valid. Set User, Theme and Language in global state
          dispatch({type: 'SET_USER', payload: JSON.parse(storedValues.user)})
          if (storedValues.theme) {
            updateTheme({ mode: storedValues.theme })
          }
          if (storedValues.language) {
            i18n.changeLanguage(storedValues.language)
          }
          setIsLoading(false)
        })
        .catch(function(error){
          // Token is no longer valid. Reset User, Theme and Language values
          SecureStore.setItemAsync('user', '')
          SecureStore.setItemAsync('theme', '')
          SecureStore.setItemAsync('language', '')
          console.log(`Token error: ${error}`)
          setIsLoading(false)
        })
    }
    setIsLoading(false)
  }
  // Initalize the Navigator. Pass in the StackParamList as a genertic in order
  // to provide type checking and intelliSense for props of the Navigator and Screen components
  const Stack = createNativeStackNavigator<StackParamList>()

  const tempNotecard = {
    name: 'New Card',
    cardId: 333,
    linearGradientColors: ['#FF9800', '#F44336']
  }

  useEffect(() => {
    getStoredValues()
  }, []);

  if (isLoading) {
    return (
      <NavigationContainer>  
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{
                headerShown: false,
              }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  function screenBuilder(start: string) {
    let initialScreens
    if (start == 'login') {
      initialScreens = (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
                title: t('login'),
                headerBackVisible: false,
            }} />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown:false }} />
        </>
      )
    } else {
      initialScreens = ( 
        <>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown:false }} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
                title: t('login'),
                headerBackVisible: false,
            }} />
        </>
      ) 
    }

    return (
      <>
        {initialScreens}
        <>
          <Stack.Screen
            name="CreateTitle"
            component={CreateTitle}
            options={{
                title: t('newNotecard'),
              }} />
          <Stack.Screen
            name="CreateCard"
            component={CreateCard}
            options={{
                title: t('newNotecard'),
              }} />
          <Stack.Screen
            name="Details"
            component={Details}
            options={ ({ route }) => ({ 
              title: route.params.name,
              headerTitleStyle: {
                fontSize: i18n.language == 'en' ? 21 : 17
              },
              headerRight: () => (
                <DeleteButton />
              )
            }) } />
          <Stack.Screen
            name="Notecard"
            component={Notecard}
            options={ ({ route }) => ({ 
              title: route.params.name,
              headerTitleStyle: {
                fontSize: i18n.language == 'en' ? 21 : 17
              }
            }) } />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
                title: t('createAccount')
              }} />
          <Stack.Screen
            name="ReviewSet"
            component={ReviewSet}
            options={ ({ route }) => ({ 
              title: t('reviewNewNotecardSet'),
              headerTitleStyle: {
                fontSize: i18n.language == 'en' ? 21 : 17
              }
            }) } />
        </>
      </>
    )
  }

  /*Navigation Container - manages our navigation tree
  and contains the navigation state*/
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primaryBackground,
            },
            headerTintColor: theme.colors.primaryText,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: theme.colors.primaryText
            },
          }} >
        { state.user == null ? screenBuilder('login') : screenBuilder('home') }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;