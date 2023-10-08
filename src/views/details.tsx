import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';

const styles = GlobalStyles;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

// navigation and route prop is passed in to every screen component
function Details( { navigation, route }: DetailsProps) {
  const { state, dispatch } = useAppState();

  const notecardSet = state.currentNotecardSet

  const startNotecard = () => {
    navigation.navigate('Notecard', {cardId: route.params.card.cardId})
  }

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>{notecardSet.title}</Text>
      <Button
        title="Start"
        containerStyle={styles.button}
        onPress={startNotecard} />
    </View> 
  )
}

export default Details;