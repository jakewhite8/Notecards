import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/home'
import Details from '../views/details'

function RootNavigator() {
  // Define a route and their params types
  type StackParamList = {
    Home: undefined;
    Details: {
      name: string;
      card: {
        name: string;
        cardId: number;
        linearGradientColors: string[];
      };
    };
  }

  // Initalize the Navigator. Pass in the StackParamList as a genertic in order
  // to provide type checking and intelliSense for props of the Navigator and Screen components
  const Stack = createNativeStackNavigator<StackParamList>()

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
          options={{ title: 'Home' }}/>
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;