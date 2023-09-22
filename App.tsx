import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, createTheme, ThemeProvider } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'dark',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Define a route and their params types
type StackParamList = {
  Home: undefined;
  Details: {name: string};
}

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;
type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

// navigation and route prop is passed in to every screen component
function HomeScreen( { navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Details Page"
        onPress={() =>
          navigation.navigate('Details', {name: 'Custom Details header'})
        } />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

function DetailsScreen({ navigation }: DetailsProps) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Home Page"
        onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Update Header" onPress={() => navigation.setOptions({title:'Updated'})} />
    </View> 
  )
}

// Initalize the Navigator. Pass in the StackParamList as a genertic in order
// to provide type checking and intelliSense for props of the Navigator and Screen components
const Stack = createNativeStackNavigator<StackParamList>()

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        {/*Navigation Container - manages our navigation tree
        and contains the navigation state*/}
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
              component={HomeScreen}
              options={{ title: 'Home' }}/>
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={({ route }) => ({ title: route.params.name })} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider >
    </SafeAreaProvider>
  )
}

export default App;
