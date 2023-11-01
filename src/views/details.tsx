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

  interface NotecardSet {
    title: string;
    notecards: Array<[string, string]>;
  }

  const startNotecard = (notecardSet: NotecardSet) => {
    let notecardPageTitle = `${notecardSet.title} Notecard`
    if (notecardSet.notecards.length > 1) {
      notecardPageTitle = notecardPageTitle + 's';
    }
    navigation.navigate('Notecard', {name: notecardPageTitle, cardId: route.params.card.cardId})
  }

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>{notecardSet.title}</Text>
      <Button
        title="Start"
        containerStyle={styles.button}
        onPress={() => startNotecard(notecardSet)} />
    </View> 
  )
}

export default Details;