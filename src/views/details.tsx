import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Button, useTheme } from '@rneui/themed';
import { StackParamList } from '../types/DataTypes'
import GlobalStyles from '../styles/GlobalStyles';
import { useAppState } from '../context/GlobalState';
import PrimaryButton from '../components/primaryButton'

const styles = GlobalStyles;

// Used to type check the Screen components.
// This allows us to type check route names and params used by
// the navigate and push functions, etc.
type DetailsProps = NativeStackScreenProps<StackParamList, 'Details'>;

// navigation and route prop is passed in to every screen component
function Details( { navigation, route }: DetailsProps) {
  const { theme } = useTheme();
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
    <View style={[styles.container, {backgroundColor: theme.colors.secondaryBackground}]}>
      <PrimaryButton
        title="Start"
        onPressFunction={() => startNotecard(notecardSet)} >
      </PrimaryButton>
    </View> 
  )
}

export default Details;