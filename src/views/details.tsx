import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';

const styles = GlobalStyles;

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