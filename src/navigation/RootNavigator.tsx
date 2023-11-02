import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTitle from '../views/createTitle';
import CreateCard from '../views/createCard';
import Details from '../views/details';
import Home from '../views/home';
import Notecard from '../views/notecard'
import ReviewSet from '../views/reviewSet';
import Settings from '../views/settings';
import AddButton from '../components/addButton';
import { StackParamList } from '../types/DataTypes'
import { useTheme } from '@rneui/themed';

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

    /*Navigation Container - manages our navigation tree
    and contains the navigation state*/
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primaryBackground,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.colors.primaryText
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
        <Stack.Screen
          name="Notecard"
          component={Notecard}
          options={ ({ route }) => ({ 
            title: route.params.name,
          }) }
        />
        <Stack.Screen
          name="ReviewSet"
          component={ReviewSet}
          options={ ({ route }) => ({ 
            title: "Review New Notecard Set",
          }) }
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "New Notecard",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;