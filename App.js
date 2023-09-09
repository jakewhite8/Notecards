import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, createTheme, ThemeProvider } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Details Page"
        onPress={() => navigation.navigate('Details')} />
      <StatusBar style="auto" />
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <StatusBar style="auto" />
    </View> 
  )
}

const Stack = createNativeStackNavigator()

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        {/*Navigation Container - manages our navigation tree
        and contains the navigation state*/}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider >
    </SafeAreaProvider>
  )
}

export default App;
