import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

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
  Details: {
    name: string;
    card: {
      name: string;
      cardId: number;
      linearGradientColors: string[];
    };
  };
}

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

// navigation and route prop is passed in to every screen component
function Details( { navigation, route }: DetailsProps) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>{route.params.card.cardId}</Text>
      <Button
        title="Home Page"
        onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Update Header" onPress={() => navigation.setOptions({title:'Updated'})} />
    </View> 
  )
}

export default Details;