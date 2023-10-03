import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTitle from '../views/createTitle';
import CreateCard from '../views/createCard';
import Home from '../views/home';
import Details from '../views/details';
import AddButton from '../components/addButton';
import { StackParamList } from '../types/DataTypes'

function RootNavigator() {
  // Initalize the Navigator. Pass in the StackParamList as a genertic in order
  // to provide type checking and intelliSense for props of the Navigator and Screen components
  const Stack = createNativeStackNavigator<StackParamList>()

  const tempNotecard = {
    name: 'New Card',
    cardId: 333,
    linearGradientColors: ['#FF9800', '#F44336']
  }

    /*Navigation Container - manages our navigation tree
    and contains the navigation state*/
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={ ({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <AddButton 
                onClick={() => navigation.navigate('CreateTitle')}
              />
            )
          }) } />
        <Stack.Screen
          name="CreateTitle"
          component={CreateTitle}
          options={{
              title: "New Notecard",
            }}
        />
        <Stack.Screen
          name="CreateCard"
          component={CreateCard}
          options={{
              title: "New Notecard",
            }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={ ({ route }) => ({ 
            title: route.params.name,
          }) }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;