import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTitle from '../views/createTitle';
import CreateCard from '../views/createCard';
import Details from '../views/details';
import Notecard from '../views/notecard';
import ReviewSet from '../views/reviewSet';
import { StackParamList } from '../types/DataTypes';
import { useTheme } from '@rneui/themed';
import DrawerNavigator from './DrawerNavigator';
import { useTranslation } from 'react-i18next';

function RootNavigator() {
  // Initalize the Navigator. Pass in the StackParamList as a genertic in order
  // to provide type checking and intelliSense for props of the Navigator and Screen components
  const Stack = createNativeStackNavigator<StackParamList>()

  const tempNotecard = {
    name: 'New Card',
    cardId: 333,
    linearGradientColors: ['#FF9800', '#F44336']
  }

  const { theme, updateTheme } = useTheme();
  const {t, i18n} = useTranslation();

  /*Navigation Container - manages our navigation tree
  and contains the navigation state*/
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DrawerNavigator"
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
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown:false }} />
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
            }
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
          name="ReviewSet"
          component={ReviewSet}
          options={ ({ route }) => ({ 
            title: t('reviewNewNotecardSet'),
            headerTitleStyle: {
              fontSize: i18n.language == 'en' ? 21 : 17
            }
          }) } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;