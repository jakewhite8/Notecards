import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';


// Define a route and their params types
type StackParamList = {
  Home: undefined;
  Details: {name: string};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

// navigation and route prop is passed in to every screen component
function Home( { navigation }: HomeProps) {
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

export default Home;